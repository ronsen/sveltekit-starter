import type { PageServerLoad } from "./$types";
import { db } from '$lib/database';
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const note = await db.note.findFirst({
        where: {
            AND: [
                { author: { id: locals.user.id } },
                { id: Number(params.id) },
            ]
        },
    });

    if (!note) {
        throw redirect(302, '/');
    }

    const newNote = {
        ...note,
        contentToHtml: note?.content?.replace(/(?:\r\n|\r|\n)/g, "<br>")
    };

    return { note: newNote };
}) satisfies PageServerLoad;
