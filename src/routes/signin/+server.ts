// src/routes/signin/+server.ts
import { getAuthCodeUrl } from '$lib/getAuthCode';
import { APP_STATES } from '$lib/authRequests';
import { redirect } from '@sveltejs/kit';
import {SIGN_UP_SIGN_IN_POLICY_AUTHORITY } from '$env/static/private';


export const GET = async () => {
  const authCodeUrl = await getAuthCodeUrl(
    SIGN_UP_SIGN_IN_POLICY_AUTHORITY,
    ['openid', 'profile'],
    APP_STATES.LOGIN
  );
  throw redirect(302, authCodeUrl);
};
