import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import slugify from 'slugify';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const prisma = new PrismaClient();
        await prisma.note.create({
            data: {
                title: String(data.get('title')).trim(),
                slug: slugify(String(data.get('title')).trim().toLowerCase()),
                content: String(data.get('content')).trim()
            }
        });

        throw redirect(302, '/');
    }
};