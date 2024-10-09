// src/routes/profile/+server.ts
import { getAuthCodeUrl } from '$lib/auth/getAuthCode';
import { APP_STATES } from '$lib/auth/authRequests';
import { EDIT_PROFILE_POLICY_AUTHORITY} from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const GET = async () => {
  let authCodeUrl: string;
  try {
    authCodeUrl = await getAuthCodeUrl(
      EDIT_PROFILE_POLICY_AUTHORITY,
      [],
      APP_STATES.EDIT_PROFILE
    );
  } catch (error) {
    console.error('Fehler beim Generieren der Auth-Code-URL:', error);
    return new Response('Fehler beim Generieren der Auth-Code-URL', { status: 500 });
  }
  console.log('Redirecting to:', authCodeUrl);
  throw redirect(302, authCodeUrl);
};
