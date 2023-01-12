import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { db } from '$lib/database';

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

        await db.note.delete({
            where: {
                id: Number(String(data.get('id')))
            }
        });

        throw redirect(302, '/');
    }
};