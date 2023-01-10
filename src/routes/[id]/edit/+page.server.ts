import { PrismaClient } from "@prisma/client";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from '@sveltejs/kit';
import slugify from 'slugify';

export const load = (async ({ params }) => {
    const prisma = new PrismaClient();
    const note = await prisma.note.findUnique({
        where: {
            id: parseInt(params.id)
        },
    });
    return { note };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const prisma = new PrismaClient();
        const note = await prisma.note.update({
            where: {
                id: parseInt(String(data.get('id')))
            },
            data: {
                title: String(data.get('title')).trim(),
                slug: slugify(String(data.get('title')).trim().toLowerCase()),
                content: String(data.get('content')).trim()
            }
        });

        throw redirect(302, '/' + note.id);
    }
};