import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/database';
import bcrypt from 'bcrypt';

export const actions = {
    default: async ({ locals, request }) => {
        const { password } = Object.fromEntries(await request.formData()) as {
            password: string
        };

        if (!password) {
            return fail(400, {
                error: true,
                message: '<strong>Password</strong> can not be blank.'
            });
        }

        await db.user.update({
            where: {
                id: locals.user.id
            },
            data: {
                password: await bcrypt.hash(password, 10),
            }
        })

        redirect(302, '/');
    }
} satisfies Actions;