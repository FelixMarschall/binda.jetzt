// src/routes/signout/+server.ts
import { env } from '$env/dynamic/private';
import { redirect, type RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

import {
    BASE_URL,
    LOGOUT_ENDPOINT
} from '$env/static/private';


export const GET: RequestHandler = async ({ cookies }) => {
    cookies.set('session', '', { path: '/', maxAge: 0 });
    cookies.set('user', '', { path: '/', maxAge: 0 });
    cookies.set('idToken', '', { path: '/', maxAge: 0 });
    cookies.set('accessToken', '', { path: '/', maxAge: 0 });

    throw redirect(302, `${LOGOUT_ENDPOINT}?post_logout_redirect_uri=${BASE_URL}`);
};