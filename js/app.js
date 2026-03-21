import {
  academyTracks,
  defaultProposals,
  growthSignals,
  marketplaceItems,
  mediaPipeline,
  metrics,
  signalNodes,
  verticals
} from "./data.js";

function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

const state = {
  wallet: {
    address: "",
    balance: "0.0000 ETH",
    chain: "Browser mode"
  },
  proposals: load("exnesfly-proposals", defaultProposals),
  pledges: load("exnesfly-pledges", [
    { name: "Genesis Member", amount: 1000, stream: "AI Products" },
    { name: "Community Pool", amount: 750, stream: "Education" }
  ])
};

const elements = {
  walletButton: document.querySelector("#walletButton"),
  walletAddress: document.querySelector("#walletAddress"),
  walletBalance: document.querySelector("#walletBalance"),
  walletChain: document.querySelector("#walletChain"),
  walletStatus: document.querySelector("#walletStatus"),
  chainChip: document.querySelector("#chainChip"),
  treasurySignal: document.querySelector("#treasurySignal"),
  treasuryForm: document.querySelector("#treasuryForm"),
  treasuryLedger: document.querySelector("#treasuryLedger"),
  proposalList: document.querySelector("#proposalList"),
  heroMetrics: document.querySelector("#heroMetrics"),
  signalGrid: document.querySelector("#signalGrid"),
  growthBars: document.querySelector("#growthBars"),
  verticalGrid: document.querySelector("#verticalGrid"),
  academyTracks: document.querySelector("#academyTracks"),
  mediaPipeline: document.querySelector("#mediaPipeline"),
  marketGrid: document.querySelector("#marketGrid"),
  marketSearch: document.querySelector("#marketSearch"),
  marketFilter: document.querySelector("#marketFilter"),
  toast: document.querySelector("#toast")
};

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2800);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function shortAddress(address) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function chainName(chainId) {
  const names = {
    "0x1": "Ethereum Mainnet",
    "0xaa36a7": "Sepolia",
    "0x89": "Polygon",
    "0xa4b1": "Arbitrum One",
    "0x38": "BNB Smart Chain"
  };
  return names[chainId] || chainId;
}

function renderMetrics() {
  elements.heroMetrics.innerHTML = metrics
    .map((item) => `<article><span>${item.label}</span><strong>${item.value}</strong></article>`)
    .join("");
}

function renderSignals() {
  elements.signalGrid.innerHTML = signalNodes
    .map((item) => `<article><div><span>${item.name}</span><strong>${item.value}</strong></div><span>${item.tone}</span></article>`)
    .join("");
}

function renderGrowthBars() {
  elements.growthBars.innerHTML = growthSignals
    .map((item) => `<div class="bar"><span>${item.label}</span><div class="track-progress"><span style="width:${item.value}%"></span></div></div>`)
    .join("");
}

function renderVerticals() {
  elements.verticalGrid.innerHTML = verticals
    .map((item) => `
      <article class="vertical-card">
        <p class="card-kicker">${item.tags[0]}</p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="vertical-meta">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </article>
    `)
    .join("");
}

function renderAcademy() {
  elements.academyTracks.innerHTML = academyTracks
    .map((track) => `
      <article class="track-item">
        <span>${track.title}</span>
        <strong>${track.progress}% complete</strong>
        <p>${track.detail}</p>
        <div class="track-progress"><span style="width:${track.progress}%"></span></div>
      </article>
    `)
    .join("");

  elements.mediaPipeline.innerHTML = mediaPipeline
    .map((item) => `
      <article class="media-item">
        <span>Content stream</span>
        <strong>${item.title}</strong>
        <p>${item.detail}</p>
      </article>
    `)
    .join("");
}

function renderTreasury() {
  const total = state.pledges.reduce((sum, item) => sum + Number(item.amount), 0);
  elements.treasurySignal.textContent = formatCurrency(total);
  elements.treasuryLedger.innerHTML = state.pledges
    .slice()
    .reverse()
    .map((item) => `
      <article class="ledger-entry">
        <span>${item.stream}</span>
        <strong>${formatCurrency(item.amount)}</strong>
        <p>${item.name}</p>
      </article>
    `)
    .join("");
}

function renderProposals() {
  elements.proposalList.innerHTML = state.proposals
    .map((proposal) => {
      const total = proposal.yes + proposal.no;
      const approval = total === 0 ? 0 : Math.round((proposal.yes / total) * 100);
      return `
        <article class="proposal">
          <div>
            <span class="proposal-meta">Proposal</span>
            <h3>${proposal.title}</h3>
            <p>${proposal.summary}</p>
          </div>
          <div class="vote-meter"><span style="width:${approval}%"></span></div>
          <div class="proposal-meta">${approval}% approval • ${total} votes</div>
          <div class="proposal-actions">
            <button class="button button-primary" data-vote="yes" data-id="${proposal.id}" type="button">Vote Yes</button>
            <button class="button button-ghost" data-vote="no" data-id="${proposal.id}" type="button">Vote No</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMarketplace(items) {
  if (items.length === 0) {
    elements.marketGrid.innerHTML = `
      <article class="market-card market-empty">
        <span class="card-kicker">No matches</span>
        <h3>No offers found for this search</h3>
        <p>Try a different keyword or switch the marketplace category filter.</p>
      </article>
    `;
    return;
  }

  elements.marketGrid.innerHTML = items
    .map((item) => `
      <article class="market-card">
        <span class="card-kicker">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
        <div class="market-meta">
          <span>Ready now</span>
          <span>Global delivery</span>
        </div>
        <strong class="price">${formatCurrency(item.price)}</strong>
      </article>
    `)
    .join("");
}

function filterMarketplace() {
  const query = elements.marketSearch.value.trim().toLowerCase();
  const category = elements.marketFilter.value;
  const filtered = marketplaceItems.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(query) ||
      item.detail.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    const matchesCategory = category === "all" || item.category === category;
    return matchesQuery && matchesCategory;
  });
  renderMarketplace(filtered);
}

function updateWalletUI() {
  elements.walletAddress.textContent = shortAddress(state.wallet.address);
  elements.walletBalance.textContent = state.wallet.balance;
  elements.walletChain.textContent = state.wallet.chain;
  elements.walletStatus.textContent = state.wallet.address ? "Connected" : "Guest mode";
  elements.chainChip.textContent = state.wallet.address ? state.wallet.chain : "No chain";
  elements.walletButton.textContent = state.wallet.address ? "Wallet Connected" : "Connect Wallet";
}

async function connectWallet() {
  if (!window.ethereum) {
    showToast("No browser wallet found. Install MetaMask or another EVM wallet.");
    return;
  }

  try {
    const [address] = await window.ethereum.request({ method: "eth_requestAccounts" });
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const balanceHex = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });
    const balance = Number.parseInt(balanceHex, 16) / 1e18;

    state.wallet = {
      address,
      balance: `${balance.toFixed(4)} ETH`,
      chain: chainName(chainId)
    };

    updateWalletUI();
    showToast("Wallet connected successfully.");
  } catch (error) {
    showToast(error?.message || "Wallet connection failed.");
  }
}

async function hydrateWallet() {
  if (!window.ethereum) return;

  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (!accounts.length) return;

    const address = accounts[0];
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const balanceHex = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });
    const balance = Number.parseInt(balanceHex, 16) / 1e18;

    state.wallet = {
      address,
      balance: `${balance.toFixed(4)} ETH`,
      chain: chainName(chainId)
    };
    updateWalletUI();
  } catch {
    updateWalletUI();
  }
}

function handleTreasurySubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("supporterName") || "Anonymous Member").trim() || "Anonymous Member";
  const amount = Number(form.get("supportAmount"));
  const stream = String(form.get("supportStream"));

  if (!amount || amount < 25) {
    showToast("Treasury pledge must be at least $25.");
    return;
  }

  state.pledges.push({ name, amount, stream });
  save("exnesfly-pledges", state.pledges);
  renderTreasury();
  event.currentTarget.reset();
  document.querySelector("#supportAmount").value = "250";
  showToast("Treasury pledge recorded.");
}

function handleProposalVote(event) {
  const button = event.target.closest("[data-vote]");
  if (!button) return;

  const { id, vote } = button.dataset;
  state.proposals = state.proposals.map((proposal) => {
    if (proposal.id !== id) return proposal;
    return {
      ...proposal,
      yes: proposal.yes + (vote === "yes" ? 1 : 0),
      no: proposal.no + (vote === "no" ? 1 : 0)
    };
  });

  save("exnesfly-proposals", state.proposals);
  renderProposals();
  showToast(`Your ${vote.toUpperCase()} vote has been recorded.`);
}

function bindEvents() {
  elements.walletButton.addEventListener("click", connectWallet);
  elements.treasuryForm.addEventListener("submit", handleTreasurySubmit);
  elements.proposalList.addEventListener("click", handleProposalVote);
  elements.marketSearch.addEventListener("input", filterMarketplace);
  elements.marketFilter.addEventListener("change", filterMarketplace);

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) {
        state.wallet = {
          address: "",
          balance: "0.0000 ETH",
          chain: "Browser mode"
        };
        updateWalletUI();
        return;
      }

      state.wallet.address = accounts[0];
      updateWalletUI();
    });

    window.ethereum.on("chainChanged", (chainId) => {
      state.wallet.chain = chainName(chainId);
      updateWalletUI();
    });
  }
}

function init() {
  renderMetrics();
  renderSignals();
  renderGrowthBars();
  renderVerticals();
  renderAcademy();
  renderTreasury();
  renderProposals();
  renderMarketplace(marketplaceItems);
  updateWalletUI();
  bindEvents();
  hydrateWallet();
}

init();
