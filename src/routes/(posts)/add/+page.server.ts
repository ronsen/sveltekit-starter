import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/database';
import slugify from 'slugify';

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const { title, content, tagcsv } = Object.fromEntries(await request.formData()) as Record<string, string>;

        if (title.length == 0) {
            return fail(400, {
                error: true,
                message: '<strong>Title</strong> can not be blank.'
            });
        }
        
        const post = await db.post.create({
            data: {
                title: title.trim(),
                slug: slugify(title.trim().toLowerCase()),
                content: content.trim(),
                authorId: locals.user.id
            }
        });

        throw redirect(302, `/${post.id}/${post.slug}`);
    }
};