// src/hooks.server.ts
import { validateToken } from '$lib/auth/validateToken';
import { json, type Handle } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');

  if (event.url.pathname.startsWith('/events') ||
    event.url.pathname.startsWith('/services'
    )) {
    if (cookies.idToken) {
      try {
        event.locals.jwtPayload = await validateToken(cookies.idToken);
      } catch (e) {
        console.error('Fehler beim Validieren des Tokens:', e);
        event.locals.jwtPayload = null;
        return json({ error: 'Invalid Token', reason: e }, { status: 401 });
      }
    } else {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }
  }


  if (cookies.user) {
    try {
      event.locals.user = JSON.parse(cookies.user);
    } catch (e) {
      console.error('Fehler beim Parsen des Sitzungscookies:', e);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  const response = await resolve(event);
  return response;
};
