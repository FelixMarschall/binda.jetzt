import {
    CLIENT_ID,
    CLOUD_INSTANCE,
    TENANT_ID,
    CLIENT_SECRET,
  } from "$env/static/private";
  
  export const msalConfig = {
    auth: {
      clientId: CLIENT_ID,
      // authority: CLOUD_INSTANCE + TENANT_ID,
      authority: "https://bindajetzt.b2clogin.com/bindajetzt.onmicrosoft.com/B2C_1_test_flow",
      clientSecret: CLIENT_SECRET,
      knownAuthorities: ["bindajetzt.b2clogin.com"],
    },
  };