// src/lib/authRequests.ts
import type { AuthorizationUrlRequest, AuthorizationCodeRequest } from '@azure/msal-node';
import { msalConfig } from '$lib/auth/msalConfig';
import { CLIENT_ID } from '$env/static/private';

export const APP_STATES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  PASSWORD_RESET: 'password_reset',
  EDIT_PROFILE: 'update_profile'
};

export const authCodeRequest: AuthorizationUrlRequest = {
  redirectUri: msalConfig.auth.redirectUri,
  scopes: ['openid', 'profile'],
  state: ''
};

export const tokenRequest: AuthorizationCodeRequest = {
  redirectUri: msalConfig.auth.redirectUri,
  scopes: ['openid', 'profile', CLIENT_ID],
  code: ''
};
