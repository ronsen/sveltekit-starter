import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import slugify from 'slugify';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const title = String(data.get('title')).trim();
        const slug = slugify(title.toLowerCase());
        const content = String(data.get('content')).trim();

        const prisma = new PrismaClient();
        await prisma.note.create({
            data: { title, slug, content }
        });

        await prisma.$disconnect();

        throw redirect(302, '/');
    }
};