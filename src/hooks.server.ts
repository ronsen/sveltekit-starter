import { redirect, type Handle } from "@sveltejs/kit";
import { db } from "$lib/server/database";

export const handle = (async ({ event, resolve }) => {
	let theme: string = 'light';

	const session = event.cookies.get('session');
	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('theme');
	const path = event.url.pathname;

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	if (session) {
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
	} else {
		if (
			path == '/' ||
			/^\/\d/.test(path) ||
			path.startsWith('/search') ||
			path.startsWith('/tag')
		) redirect(303, '/login');
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('data-theme=""', `data-theme="${theme}"`)
	});
}) satisfies Handle;