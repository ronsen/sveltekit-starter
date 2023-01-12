import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/database';
import slugify from 'slugify';

export const load = (async ({ locals, params }) => {
    const note = await db.note.findFirst({
        where: {
            AND: [
                { author: { id: locals.user.id } },
                { id: Number(params.id) },
            ]
        },
    });

    if (!note) {
        throw redirect(302, '/');
    }
    
    return { note };
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

        const note = await db.note.update({
            where: {
                id: Number(String(data.get('id')))
            },
            data: { title, slug, content }
        });

        throw redirect(302, `/${note.id}/${note.slug}`);
    }
};