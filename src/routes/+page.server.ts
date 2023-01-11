import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
    const p = url.searchParams.get('page') ?? '1';
    const page = parseInt(p);

    const prisma = new PrismaClient();
    const notes = await prisma.note.findMany({
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc'}]
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = notes.length < 10 ? 0 : page + 1;

    return { notes, prevPage, nextPage };
}) satisfies PageServerLoad;