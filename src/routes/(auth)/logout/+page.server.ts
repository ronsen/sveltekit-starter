import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ cookies }) => {
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0)
        });

        throw redirect(302, '/');
    }
};