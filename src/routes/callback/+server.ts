// src/routes/redirect/+server.ts
import { msalClient } from '$lib/msalConfig';
import { tokenRequest, APP_STATES } from '$lib/authRequests';
import { redirect, type RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const GET: RequestHandler = async ({ url, cookies }) => {
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  if (state === APP_STATES.LOGIN) {
    tokenRequest.code = code!;
    try {
      const response = await msalClient.acquireTokenByCode(tokenRequest);
      if (response.account) {
        cookies.set('user', JSON.stringify(response.account), { path: '/'});
      }
      if (response.idToken) {
        cookies.set('idToken', response.idToken, { path: '/'});
      } if (response.accessToken) {
        cookies.set('accessToken', response.accessToken, { path: '/'});
      }
      if (response.account) {
        cookies.set('session', JSON.stringify(response.account), { path: '/'});
      }
    } catch (error) {
      console.error('Fehler bei der Anmeldung:', error);
      return new Response('Authentifizierungsfehler', { status: 500 });
    }
    throw redirect(302, '/');
    
  } else if (state === APP_STATES.PASSWORD_RESET) {
    if (error && errorDescription?.includes('AADB2C90091')) {
      // Benutzer hat die Operation abgebrochen
      throw redirect(302, '/');
    } else {
      // Passwort erfolgreich zurückgesetzt
      throw redirect(302, '/');
    }
  } else if (state === APP_STATES.EDIT_PROFILE) {
    // TODO: Funktioniert noch nicht
    tokenRequest.code = code!;
    try {
      const response = await msalClient.acquireTokenByCode(tokenRequest);
      const user = response.account?.idTokenClaims;
      const headers = new Headers();
      headers.append(
        'Set-Cookie',
        cookie.serialize('session', JSON.stringify(user), {
          path: '/'
        })
      );
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/',
          ...Object.fromEntries(headers.entries())
        }
      });    } catch (error) {
      console.error('Fehler beim Bearbeiten des Profils:', error);
      return new Response('Fehler beim Bearbeiten des Profils', { status: 500 });
    }
  } else {
    return new Response('Unbekannter Status', { status: 500 });
  }
};
