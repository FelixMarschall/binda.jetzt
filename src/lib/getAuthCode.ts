
// src/lib/getAuthCode.ts
import { msalClient } from './msalConfig';
import { authCodeRequest, tokenRequest } from '$lib/authRequests';

export const getAuthCodeUrl = async (authority: string, scopes: string[], state: string) => {
  authCodeRequest.authority = authority;
  authCodeRequest.scopes = scopes;
  authCodeRequest.state = state;

  tokenRequest.authority = authority;

  try {
    const authCodeUrl = await msalClient.getAuthCodeUrl(authCodeRequest);
    return authCodeUrl;
  } catch (error) {
    console.error('Error getting auth code URL:', error);
    throw error;
  }
};
