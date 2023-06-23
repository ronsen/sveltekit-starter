import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/server/database";

export const handle = (async ({ event, resolve }) => {
    let theme: string | null = null;
    
    const newTheme = event.url.searchParams.get('theme');
    const cookieTheme = event.cookies.get('theme');

    if (newTheme) {
        theme = newTheme;
    } else if (cookieTheme) {
        theme = cookieTheme;
    }

    const session = event.cookies.get('session');

    if (!session) {
        if (theme) {
            return await resolve(event, {
                transformPageChunk: ({ html }) =>
                    html.replace('data-theme=""', `data-theme="${theme}"`)
            });
        }
        
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
}) satisfies Handle;