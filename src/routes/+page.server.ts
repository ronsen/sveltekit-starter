import type { PageServerLoad } from './$types';
import { db } from '$lib/database';

export const load = (async ({ url }) => {
    const page = Number(url.searchParams.get('page') ?? '1');

    const notes = await db.note.findMany({
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc'}]
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = notes.length < 10 ? 0 : page + 1;

    return { notes, prevPage, nextPage };
}) satisfies PageServerLoad;