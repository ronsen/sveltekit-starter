import { redirect, type Handle } from "@sveltejs/kit";
import { db } from "$lib/database";

const PROTECTED_ROUTES = [
	'/add',
	'/edit',
	'/delete'
];

function isProtectedRoute(path: string) {
	return PROTECTED_ROUTES.some(
		(route) => path === route || path.endsWith(route)
	);
}

async function getUser(session: string | undefined) {
	if (!session) {
		return null;
	}

	return db.user.findUnique({
		where: {
			token: session
		},
		select: {
			id: true,
			username: true
		}
	});
}

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;

	const session = cookies.get('session');
	const user = await getUser(session);

	if (user) {
		event.locals.user = {
			id: user.id,
			name: user.username
		};
	} else {
		event.locals.user = null;

		if (session) {
			cookies.delete('session', { path: '/' });
		}
	}

	if (!event.locals.user && isProtectedRoute(event.url.pathname)) {
		redirect(303, '/login');
	}

	return resolve(event);
}) satisfies Handle;
