import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/database';
import slugify from 'slugify';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const title = String(data.get('title')).trim();
        const slug = slugify(title.toLowerCase());
        const content = String(data.get('content')).trim();

        await db.note.create({
            data: { title, slug, content }
        });

        throw redirect(302, '/');
    }
};