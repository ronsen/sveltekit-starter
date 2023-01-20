import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/database';
import bcrypt from 'bcrypt';

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const username = String(data.get('username')).trim();
        const password = String(data.get('password'));

        if (!username || !password) {
            return fail(400, {
                error: true,
                message: '<strong>Username</strong> and/or <strong>password</strong> can not be blank.'
            });
        }

        const user = await db.user.findUnique({
            where: { username }
        });

        if (!user) {
            return fail(400, {
                error: true,
                message: 'User not exists.'
            });
        } else {
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return fail(400, {
                    error: true,
                    message: 'You have entered invalid credentials.'
                });
            }
        }
        
        const authenticatedUser = await db.user.update({
            where: { username: user?.username},
            data: { token: crypto.randomUUID()}
        });

        if (authenticatedUser) {
            cookies.set('session', String(authenticatedUser.token), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30
            });
        }

        throw redirect(302, '/');
    }
};