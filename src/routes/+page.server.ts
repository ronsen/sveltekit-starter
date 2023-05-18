import { redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export const load = (async ({ locals, url }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const page = Number(url.searchParams.get('page') ?? '1');

    const posts = await db.post.findMany({
        where: { author: { id: locals.user.id } },
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc' }]
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = posts.length < 10 ? 0 : page + 1;

    return { posts, prevPage, nextPage };
});

export const actions: Actions = {
    default: async ({ url, cookies }) => {
        const theme = url.searchParams.get('theme');

        if (theme) {
            cookies.set('theme', theme, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365
            });
        }
    }
};