import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '3e123950-32b5-466b-870a-1bfcd38d4773',
    authority: 'https://habimorib2c.b2clogin.com/habimorib2c.onmicrosoft.com/B2C_1_signin',
    knownAuthorities: ['habimorib2c.b2clogin.com'],
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
};

export const loginRequest = {
  scopes: ['openid', 'offline_access'],
};