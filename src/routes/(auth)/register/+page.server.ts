import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/database';
import bcrypt from 'bcrypt';

export const actions: Actions = {
    default: async ({ request }) => {
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

        if (user) {
            return fail(400, {
                error: true,
                message: '<strong>Username</strong> already exists.'
            });
        }

        await db.user.create({
            data: {
                username,
                password: await bcrypt.hash(password, 10),
                token: crypto.randomUUID()
            }
        })

        throw redirect(303, '/login');
    }
};