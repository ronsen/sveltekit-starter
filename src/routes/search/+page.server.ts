import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
    const q = String(url.searchParams.get('q')).trim();

    const prisma = new PrismaClient();
    const notes = prisma.note.findMany({
        where: {
            OR: [
                { title: { contains: q }},
                { content: { contains: q }}
            ]
        },
        orderBy: [{ id: 'desc'}]
    });

    return { q, notes };
}) satisfies PageServerLoad;
