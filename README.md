# ExnesFly

ExnesFly is a multi-vertical technology and commerce company delivering digital solutions, intelligent systems, education, media, finance, and global product fulfillment.

This version of the project is now a GitHub Pages-friendly static super app rather than a single promo page. It presents ExnesFly as a unified ecosystem with:

- a flagship command-center landing experience
- dedicated product lanes for digital solutions, AI systems, finance, education, media, and commerce
- a wallet-aware web3 layer with browser wallet connection
- treasury contribution tracking with local persistence
- DAO-style proposal voting with local persistence
- academy, media, and marketplace modules for the broader business vision

## Tech Approach

The app intentionally stays static-first so it can deploy easily on GitHub Pages and custom domains:

- `index.html` contains the app shell
- `css/styles.css` holds the full visual system and responsive layout
- `js/data.js` stores structured product data
- `js/app.js` powers rendering, filtering, persistence, and wallet interaction
- `404.html` supports redirect behavior for GitHub Pages/custom-domain fallback

## Web3 Notes

The current build supports injected EVM wallets such as MetaMask through the browser `window.ethereum` API. It reads:

- connected address
- current chain
- ETH balance

The treasury and governance systems are currently client-side simulations designed to make the product feel real on a static host. A future version can connect these surfaces to smart contracts, token gating, and on-chain treasury execution.

## Local Preview

Because the project is fully static, you can preview it with any simple local server, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.
