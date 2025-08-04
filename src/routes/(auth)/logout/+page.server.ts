import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('session', { path: '/' });
		redirect(302, '/');
	}
} satisfies Actions;
