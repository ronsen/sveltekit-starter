import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/server/database";

export const handle: Handle = async ({ event, resolve }) => {
    const theme = event.cookies.get('theme');
    const session = event.cookies.get('session');

    if (!session) {
        return await resolve(event);
    }

    const user = await db.user.findUnique({
        where: { token: session },
        select: { id: true, username: true }
    });

    if (user) {
        event.locals.user = {
            id: user.id,
            name: user.username
        }
    }

    if (theme) {
        return await resolve(event, {
            transformPageChunk: ({ html }) =>
                html.replace('data-theme=""', `data-theme="${theme}"`)
        });
    }

    return await resolve(event);
};