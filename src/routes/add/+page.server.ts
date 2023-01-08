import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const prisma = new PrismaClient();
        await prisma.note.create({
            data: {
                title: String(data.get('title')).trim(),
                content: String(data.get('content')).trim()
            }
        });

        throw redirect(302, '/');
    }
};