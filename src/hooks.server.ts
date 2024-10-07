// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');

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
