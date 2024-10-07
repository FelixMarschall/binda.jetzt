// src/routes/profile/+server.ts
import { getAuthCodeUrl } from '$lib/getAuthCode';
import { APP_STATES } from '$lib/authRequests';
import { EDIT_PROFILE_POLICY_AUTHORITY} from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const GET = async () => {
  let authCodeUrl: string;
  try {
    console.log('Aufruf von /profile');
    authCodeUrl = await getAuthCodeUrl(
      EDIT_PROFILE_POLICY_AUTHORITY,
      [],
      APP_STATES.EDIT_PROFILE
    );
    console.log('AuthCodeUrl:', authCodeUrl);
  } catch (error) {
    console.error('Fehler in /profile:', error);
    return new Response('Fehler beim Generieren der Auth-Code-URL', { status: 500 });
  }
  console.log('Redirecting to:', authCodeUrl);
  throw redirect(302, authCodeUrl);
};
