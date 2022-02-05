import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '3e123950-32b5-466b-870a-1bfcd38d4773',
    authority: 'https://habimori.b2clogin.com/habimori.onmicrosoft.com/signin',
    knownAuthorities: ['habimori.b2clogin.com'],
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
};

export const loginRequest = {
  scopes: ['openid', 'offline_access'],
};