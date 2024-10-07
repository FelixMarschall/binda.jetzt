// src/lib/msalConfig.ts
import { ConfidentialClientApplication, LogLevel } from '@azure/msal-node';

import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, AUTHORITY_DOMAIN, SIGN_UP_SIGN_IN_POLICY_AUTHORITY } from '$env/static/private';

export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: SIGN_UP_SIGN_IN_POLICY_AUTHORITY,
    clientSecret: CLIENT_SECRET,
    knownAuthorities: [AUTHORITY_DOMAIN],
    redirectUri: REDIRECT_URI,
    validateAuthority: false
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel: LogLevel, message: string) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Warning
    }
  }
};

export const msalClient = new ConfidentialClientApplication(msalConfig);
