import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, cookies }) => {
	const theme = cookies.get('theme') ?? 'light';

	return {
		user: locals.user,
		theme
	};
}) satisfies LayoutServerLoad;
