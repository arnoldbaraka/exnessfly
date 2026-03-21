# ExnesFly

ExnesFly is being shaped into a premium multi-vertical platform for:

- AI-powered digital services
- founder growth systems
- academy and membership
- media and brand authority
- marketplace-scale digital offers
- wallet-native community infrastructure

## Product Direction

The business model behind this build is deliberate:

1. `Cash engine`: premium done-for-you services
2. `Trust engine`: content, education, and private membership
3. `Scale engine`: digital products and marketplace offers
4. `Treasury engine`: web3 access, contribution flows, and governance

This keeps ExnesFly grounded in real revenue first while still leaving room for a larger web3-powered ecosystem later.

## What This Version Includes

- a stronger business-model narrative in the UI
- pricing tiers and founder vision sections
- marketplace, academy, roadmap, and treasury experiences
- browser wallet connectivity with the `window.ethereum` API
- Firebase authentication using the ExnesFly Firebase project config already present in repo history
- Google sign-in support
- email/password account creation and login support

## File Structure

- `index.html` contains the app shell and product sections
- `css/styles.css` holds the full design system and responsive layout
- `js/data.js` stores the business, pricing, roadmap, and product data
- `js/app.js` powers rendering, filtering, wallet interaction, and Firebase auth
- `404.html` provides static-host-friendly redirect behavior

## Firebase Auth Notes

The site now uses Firebase Web Auth for:

- Google login
- email/password signup
- email/password login
- logout and returning member state

For production use, make sure the correct auth providers are enabled in the Firebase console and that the deployment domain is added to Firebase authorized domains.

## Local Preview

Because the project is static-first, you can preview it with a simple local server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.
