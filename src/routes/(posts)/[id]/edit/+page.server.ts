import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database';
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
    default: async ({ request, params }) => {
        const { title, content } = Object.fromEntries(await request.formData()) as Record<string, string>;

        if (title.length == 0) {
            return fail(400, {
                error: true,
                message: 'Field <strong>Title</strong> cannot be blank.'
            });
        }

        const post = await db.post.update({
            where: {
                id: Number(params.id)
            },
            data: {
                title: title.trim(),
                slug: slugify(title.toLowerCase()),
                content: content.trim()
            }
        });

        throw redirect(302, `/${post.id}/${post.slug}`);
    }
};