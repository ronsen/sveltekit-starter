import type { PageServerLoad } from './$types';
import { db } from '$lib/database';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, url }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const page = Number(url.searchParams.get('page') ?? '1');

    const notes = await db.note.findMany({
        where: {
            authorId: locals.user.id
        },
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc'}]
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = notes.length < 10 ? 0 : page + 1;

    return { notes, prevPage, nextPage };
}) satisfies PageServerLoad;