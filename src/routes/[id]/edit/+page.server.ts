import { PrismaClient } from "@prisma/client";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from '@sveltejs/kit';

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
                id: parseInt(data.get('id'))
            },
            data: {
                title: data.get('title').trim(),
                content: data.get('content').trim()
            }
        });

        throw redirect(302, '/' + note.id);
    }
};