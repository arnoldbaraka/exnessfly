# ExnesFly

ExnesFly is a futuristic static-first entertainment platform for vibes, music, fashion, gifting, awards, and Gollvariety commerce.

The platform is designed to run for free on GitHub Pages while still being structured for future Firebase-powered growth.

## Product Direction

ExnesFly is being shaped into a consumer entertainment universe where:

1. `Vibes engine`: curated social energy, posts, reactions, culture moments, and safe addictive loops.
2. `Music engine`: artist profiles, release drops, promo campaigns, fan squads, and music management concepts.
3. `Gollvariety engine`: desired goods from cars to earrings, phones, fashion, gifts, merch, and curated dropshipping flows.
4. `Awards engine`: fashionister awards, creator recognition, voting, badges, spotlight, and sponsored rewards.
5. `Identity engine`: Google sign-in, email sign-in, member profiles, DOB capture, and future Firestore-ready profiles.

The immediate goal is to launch a beautiful static MVP, validate the vibe, and then graduate into real Firebase persistence when users start interacting.

## What This Version Includes

- futuristic entertainment-first landing experience
- static Vibes Feed demo with local browser storage
- member identity section with Google sign-in and email/password auth
- full name and DOB fields prepared for future profile persistence
- Gollvariety marketplace filters and product cards
- creator spotlight and awards proposal voting
- music, fashion, gifting, commerce, and awards platform positioning
- browser wallet connectivity with the `window.ethereum` API
- crypto treasury rail display for optional future-native support
- GitHub Pages-friendly static architecture

## Current Static Architecture

This version intentionally avoids a backend so it can be hosted for free.

- Static hosting: GitHub Pages
- Frontend: plain HTML, CSS, and JavaScript modules
- Auth: Firebase Web Auth
- Static persistence: `localStorage` for demo vibes, pledges, votes, and profile metadata
- Future persistence: Firestore can be added without redesigning the UI

## File Structure

- `index.html` contains the app shell and entertainment platform sections
- `css/styles.css` holds the full visual system and responsive layout
- `js/data.js` stores platform data, marketplace items, pricing, roadmap, proposals, and Firebase config
- `js/app.js` powers rendering, filtering, wallet interaction, local static interactions, and Firebase auth
- `404.html` provides static-host-friendly redirect behavior

## Firebase Auth Notes

Firebase Web Auth is used for:

- Google login
- email/password signup
- email/password login
- logout and returning member state

Before production use, enable these providers in the Firebase console and add all deployment domains to Firebase authorized domains:

- `localhost`
- `arnoldbaraka.github.io`
- `exnesfly.org`
- `www.exnesfly.org` if used

## GitHub Pages Deployment

1. Push the repo to GitHub.
2. Go to repository `Settings`.
3. Open `Pages`.
4. Set source to `main` branch and `/root` folder.
5. Save.

Expected GitHub Pages URL:

```text
https://arnoldbaraka.github.io/exnessfly
```

Custom domain target:

```text
https://exnesfly.org
```

## Local Preview

Because the project is static-first, preview it with:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Roadmap

### Phase 1 — Static identity and entertainment shell

- entertainment rebrand
- Vibes section
- Gollvariety market
- awards and creator spotlight
- Firebase auth connection

### Phase 2 — Static interaction layer

- localStorage demo posting
- local likes/reactions
- profile metadata capture
- creator cards
- refined marketplace filtering

### Phase 3 — Firebase realtime layer

- Firestore-backed vibes feed
- real likes and comments
- creator profile documents
- product request documents
- award voting documents

### Phase 4 — Platform monetization

- sponsor placements
- creator subscriptions
- product request workflows
- merch campaigns
- award sponsorship packages

## Vision

ExnesFly should feel like a future African-born entertainment universe with global taste: social enough to be addictive, curated enough to be healthy, commercial enough to be sustainable, and flexible enough to evolve from a static MVP into a real platform.
