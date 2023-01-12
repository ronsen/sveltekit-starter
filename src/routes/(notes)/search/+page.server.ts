import { PrismaClient } from "@prisma/client";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const q = String(url.searchParams.get('q')).trim();
    const page = Number(url.searchParams.get('page') ?? '1');

    const prisma = new PrismaClient();
    const notes = await prisma.note.findMany({
        where: {
            OR: [
                { authorId: locals.user.id },
                { title: { contains: q }},
                { content: { contains: q }}
            ]
        },
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc'}]
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = notes.length < 10 ? 0 : page + 1;

    return { q, notes, prevPage, nextPage };
}) satisfies PageServerLoad;
