import { AUTHORITY_DOMAIN, AZURE_TENANT_ID, CLIENT_ID,SIGN_UP_SIGN_IN_POLICY_AUTHORITY } from '$env/static/private';

import jwt, { type JwtHeader, type SigningKeyCallback, type VerifyErrors, type VerifyOptions } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Configure the JWKS client
const client = jwksClient({
  jwksUri: `${SIGN_UP_SIGN_IN_POLICY_AUTHORITY}/discovery/v2.0/keys`
});

export const getSigningKey = (header: JwtHeader, callback: SigningKeyCallback): void => {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        callback(err);
      } else {
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
      }
    });
  };

export const validateToken = (token: string): Promise<jwt.JwtPayload> => {
    return new Promise((resolve, reject) => {
      const options: VerifyOptions = {
        audience: CLIENT_ID,
        issuer: `${AUTHORITY_DOMAIN}/${AZURE_TENANT_ID}/v2.0/`,
        algorithms: ['RS256']
      };
  
      jwt.verify(token, getSigningKey, options, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as jwt.JwtPayload);
        }
      });
    });
  };