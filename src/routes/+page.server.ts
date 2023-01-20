import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, url }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const page = Number(url.searchParams.get('page') ?? '1');

    const posts = await db.post.findMany({
        where: { author: { id: locals.user.id } },
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc'}]
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = posts.length < 10 ? 0 : page + 1;

    return { posts, prevPage, nextPage };
}) satisfies PageServerLoad;