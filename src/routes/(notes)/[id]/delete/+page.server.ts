import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { db } from '$lib/database';

export const load = (async ({ locals, params }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }
    
    const note = await db.note.findFirst({
        where: {
            AND: [
                { authorId: locals.user.id },
                { id: Number(params.id) },
            ]
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