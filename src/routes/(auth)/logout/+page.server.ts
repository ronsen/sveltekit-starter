import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies }) => {
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});

		redirect(302, '/');
	}
} satisfies Actions;