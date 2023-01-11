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

        const title = String(data.get('title')).trim();
        const slug = slugify(title.toLowerCase());
        const content = String(data.get('content')).trim();

        const prisma = new PrismaClient();
        const note = await prisma.note.update({
            where: {
                id: parseInt(String(data.get('id')))
            },
            data: { title, slug, content }
        });

        await prisma.$disconnect();

        throw redirect(302, '/' + note.id);
    }
};