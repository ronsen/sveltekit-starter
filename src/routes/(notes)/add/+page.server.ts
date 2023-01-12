import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/database';
import slugify from 'slugify';

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const data = await request.formData();

        const title = String(data.get('title')).trim();
        const slug = slugify(title.toLowerCase());
        const content = String(data.get('content')).trim();

        if (title.length == 0) {
            return fail(400, {
                error: true,
                message: '<strong>Title</strong> can not be blank.'
            });
        }

        const note = await db.note.create({
            data: { title, slug, content, authorId: locals.user.id }
        });

        throw redirect(302, `/${note.id}/${note.slug}`);
    }
};