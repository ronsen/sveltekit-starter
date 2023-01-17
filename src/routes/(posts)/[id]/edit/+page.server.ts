import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/database';
import slugify from 'slugify';

export const load = (async ({ locals, params }) => {
    const post = await db.post.findFirst({
        where: {
            AND: [
                { author: { id: locals.user.id } },
                { id: Number(params.id) },
            ]
        },
    });

    if (!post) {
        throw redirect(302, '/');
    }
    
    return { post };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const title = String(data.get('title')).trim();
        const slug = slugify(title.toLowerCase());
        const content = String(data.get('content')).trim();

        if (title.length == 0) {
            return fail(400, {
                error: true,
                message: 'Field <strong>Title</strong> cannot be blank.'
            });
        }

        const post = await db.post.update({
            where: {
                id: Number(String(data.get('id')))
            },
            data: { title, slug, content }
        });

        throw redirect(302, `/${post.id}/${post.slug}`);
    }
};