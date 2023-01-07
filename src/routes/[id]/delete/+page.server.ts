import { PrismaClient } from "@prisma/client";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

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
        await prisma.note.delete({
            where: {
                id: parseInt(data.get('id'))
            }
        });

        throw redirect(302, '/');
    }
};