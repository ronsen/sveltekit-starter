import type { PageServerLoad, Actions } from "./$types";
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/database';
import slugify from 'slugify';

export const load = (async ({ params }) => {
    const note = await db.note.findUnique({
        where: {
            id: Number(params.id)
        },
    });
    return { note };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const title = String(data.get('title')).trim();
        const slug = slugify(title.toLowerCase());
        const content = String(data.get('content')).trim();

        const note = await db.note.update({
            where: {
                id: Number(String(data.get('id')))
            },
            data: { title, slug, content }
        });

        throw redirect(302, `/${note.id}/${note.slug}`);
    }
};