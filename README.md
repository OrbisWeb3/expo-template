# Template to use Orbis on mobile with Expo and React Native

To start using download this repository and install the required packages with `yarn install`. To get it to work we had to force some specific versions of Ceramic packages which can be viewed in the `resolutions` object in `package.json` as well as modified the `babel.config.js` and `metro.config.js`while also using the polyfills provided by the Orbis SDK.

## Connecting

The connection to the Orbis account is managed with a QR code scanning from app.orbis.club (but this can be replicated on any website) which simply passes the `ceramic-session` object from localStorage to the mobile app. It's then being read by the `isConnected` function to automatically connect the user.

## Tailwind RN

This project is using `tailwind-rn` for the styles. The documentation can be access [here](https://github.com/vadimdemedes/tailwind-rn).
