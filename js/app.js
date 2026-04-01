/**
 * APP.JS — Sélection Belge Mondial 2026
 * Logique principale de l'application
 */

(function () {
  'use strict';

  // ─── STATE ──────────────────────────────────────────────
  const state = {
    currentStep: 0, // 0=home, 1-4=selection, 5=reserves, 6=recap
    selections: {
      Gardien: [],
      Défenseur: [],
      Milieu: [],
      Attaquant: []
    },
    reserves: {
      Défenseur: null,
      Milieu: null,
      Attaquant: null
    },
    isViewingShared: false
  };

  const TOTAL_STEPS = 7; // home + 4 positions + reserves + recap

  const RESERVES_CONFIG = [
    { key: 'Défenseur', label: 'Défenseur de secours' },
    { key: 'Milieu',    label: 'Milieu de secours' },
    { key: 'Attaquant', label: 'Attaquant de secours' }
  ];

  // ─── DOM REFS ───────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const progressFill = $('.progress-bar-fill');
  const progressSteps = $$('.progress-step');
  const stepLabel = $('.header-step-label');
  const stepsContainer = $('#steps-container');

  // ─── URL DECODING (shared link) ─────────────────────────
  // Maps for compact URL format
  const SHORT_TO_PREFIX = { g: 'gk', d: 'def', m: 'mil', a: 'att' };
  const SHORT_TO_KEY = { g: 'Gardien', d: 'Défenseur', m: 'Milieu', a: 'Attaquant' };

  function numToId(prefix, num) {
    return prefix + '_' + String(num).padStart(2, '0');
  }

  function checkSharedURL() {
    const params = new URLSearchParams(window.location.search);

    // Detect format: compact (g,d,m,a) or legacy (gardiens,defenseurs,...)
    const isCompact = params.has('g') || params.has('d') || params.has('m') || params.has('a');
    const isLegacy = STEPS_CONFIG.some(s => params.has(s.param));

    if (!isCompact && !isLegacy) return false;

    let valid = true;

    if (isCompact) {
      ['g', 'd', 'm', 'a'].forEach(short => {
        const key = SHORT_TO_KEY[short];
        const prefix = SHORT_TO_PREFIX[short];
        const cfg = STEPS_CONFIG.find(c => c.key === key);
        const raw = params.get(short);
        if (!raw) { valid = false; return; }
        const ids = raw.split(',').filter(Boolean).map(n => numToId(prefix, n));
        const validIds = ids.filter(id => PLAYERS.some(p => p.id === id && p.position === key));
        if (validIds.length !== cfg.required) { valid = false; return; }
        state.selections[key] = validIds;
      });

      if (!valid) return false;

      const subsRaw = params.get('s');
      if (subsRaw) {
        subsRaw.split(',').filter(Boolean).forEach(token => {
          // Token format: d4, m8, a2 (position letter + number)
          const posLetter = token.charAt(0);
          const num = token.substring(1);
          const prefix = SHORT_TO_PREFIX[posLetter];
          const key = SHORT_TO_KEY[posLetter];
          if (prefix && key) {
            const id = numToId(prefix, num);
            const player = PLAYERS.find(p => p.id === id);
            if (player && state.reserves.hasOwnProperty(key)) {
              state.reserves[key] = id;
            }
          }
        });
      }
    } else {
      // Legacy format
      STEPS_CONFIG.forEach(cfg => {
        const raw = params.get(cfg.param);
        if (!raw) { valid = false; return; }
        const ids = raw.split(',').filter(Boolean);
        const validIds = ids.filter(id => PLAYERS.some(p => p.id === id && p.position === cfg.key));
        if (validIds.length !== cfg.required) { valid = false; return; }
        state.selections[cfg.key] = validIds;
      });

      if (!valid) return false;

      const subsRaw = params.get('subs');
      if (subsRaw) {
        subsRaw.split(',').filter(Boolean).forEach(id => {
          const player = PLAYERS.find(p => p.id === id);
          if (player && state.reserves.hasOwnProperty(player.position)) {
            state.reserves[player.position] = id;
          }
        });
      }
    }

    state.isViewingShared = true;
    return true;
  }

  // ─── PROGRESS BAR ──────────────────────────────────────
  function updateProgress() {
    const pct = (state.currentStep / (TOTAL_STEPS - 1)) * 100;
    progressFill.style.width = pct + '%';

    const stepNames = ['Accueil', 'Gardiens', 'Défenseurs', 'Milieux', 'Attaquants', 'Réservistes', 'Ma sélection'];
    stepLabel.textContent = stepNames[state.currentStep] || '';

    progressSteps.forEach((el, i) => {
      el.classList.remove('active', 'completed');
      if (i === state.currentStep) el.classList.add('active');
      else if (i < state.currentStep) el.classList.add('completed');
    });
  }

  // ─── NAVIGATE ──────────────────────────────────────────
  function goToStep(step) {
    const currentSection = $('.step-section.active') || $('.home-section.active') || $('.recap-section.active');

    if (currentSection) {
      currentSection.classList.add('exiting');
      currentSection.classList.remove('active');

      setTimeout(() => {
        currentSection.classList.remove('exiting');
        currentSection.style.display = 'none';
        showStep(step);
      }, 250);
    } else {
      showStep(step);
    }
  }

  function showStep(step) {
    state.currentStep = step;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Preload images for the next step in background
    preloadNextStep();

    if (step === 0) {
      const home = $('#home-section');
      home.style.display = '';
      home.classList.add('active');
      return;
    }

    if (step === 5) {
      renderReservesStep();
      return;
    }

    if (step === 6) {
      renderRecap();
      return;
    }

    renderSelectionStep(step - 1);
  }

  // ─── HELPER: create a player card ──────────────────────
  function createPlayerCard(player, isSelected, isDisabled, animIndex) {
    const card = document.createElement('div');
    card.className = `player-card${isSelected ? ' selected' : ''}${isDisabled ? ' disabled' : ''}`;
    card.setAttribute('role', 'option');
    card.setAttribute('aria-selected', isSelected);
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${player.name}, ${player.club}${isSelected ? ', sélectionné' : ''}`);
    card.style.animationDelay = `${animIndex * 0.04}s`;
    card.dataset.playerId = player.id;

    const initials = player.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    card.innerHTML = `
      <div class="card-check" aria-hidden="true">
        <svg viewBox="0 0 16 16"><polyline points="3 8 7 12 13 4"/></svg>
      </div>
      <div class="player-avatar">
        <div class="player-initials" aria-hidden="true">${initials}</div>
      </div>
      <p class="player-name">${player.name}</p>
      <p class="player-club">${player.club}</p>
    `;

    // Load photo — onload before src
    const img = new Image();
    img.alt = `${player.name}, ${player.position} belge - ${player.club}`;
    img.onload = function () {
      const avatarEl = card.querySelector('.player-avatar');
      if (!avatarEl) return;
      const initialsEl = avatarEl.querySelector('.player-initials');
      if (initialsEl) initialsEl.remove();
      avatarEl.appendChild(img);
    };
    img.src = player.photo;

    return card;
  }

  // ─── RENDER SELECTION STEP ─────────────────────────────
  function renderSelectionStep(configIndex) {
    const cfg = STEPS_CONFIG[configIndex];
    const players = PLAYERS.filter(p => p.position === cfg.key);
    const selected = state.selections[cfg.key];

    stepsContainer.innerHTML = '';

    const section = document.createElement('div');
    section.className = 'step-section active';
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', `Sélection des ${cfg.label}`);

    section.innerHTML = `
      <div class="step-header">
        <p class="step-position-label">Étape ${configIndex + 1} sur 5</p>
        <h2 class="step-title">Choisis tes ${cfg.label}</h2>
        <div class="step-counter" aria-live="polite">
          <span class="count-current">${selected.length}</span>
          <span class="count-sep">/</span>
          <span class="count-total">${cfg.required}</span>
          <span class="step-counter-full ${selected.length === cfg.required ? 'complete' : ''}">${cfg.label.toLowerCase()} sélectionnés</span>
        </div>
      </div>
      <div class="step-content">
        <div class="cards-grid" role="listbox" aria-label="Liste des ${cfg.label}"></div>
      </div>
      <div class="ad-slot ad-rectangle"></div>
      <nav class="step-nav" aria-label="Navigation étapes">
        <button class="btn btn-secondary btn-prev" aria-label="Étape précédente">
          <span class="arrow">&larr;</span>
          <span>Précédent</span>
        </button>
        <button class="btn btn-primary btn-next" ${selected.length < cfg.required ? 'disabled' : ''} aria-label="Étape suivante">
          <span>Suivant</span>
          <span class="arrow">&rarr;</span>
        </button>
      </nav>
    `;

    const grid = section.querySelector('.cards-grid');
    const isFull = selected.length >= cfg.required;

    players.forEach((player, i) => {
      const isSelected = selected.includes(player.id);
      const isDisabled = isFull && !isSelected;
      const card = createPlayerCard(player, isSelected, isDisabled, i);

      card.addEventListener('click', () => handleCardClick(card, player, cfg, configIndex));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(card, player, cfg, configIndex);
        }
      });

      grid.appendChild(card);
    });

    // Nav buttons
    section.querySelector('.btn-prev').addEventListener('click', () => {
      goToStep(state.currentStep - 1);
    });
    section.querySelector('.btn-next').addEventListener('click', () => {
      if (selected.length === cfg.required) {
        goToStep(state.currentStep + 1);
      }
    });

    stepsContainer.appendChild(section);
  }

  function handleCardClick(card, player, cfg, configIndex) {
    const selected = state.selections[cfg.key];
    const isSelected = selected.includes(player.id);

    if (isSelected) {
      state.selections[cfg.key] = selected.filter(id => id !== player.id);
    } else if (selected.length < cfg.required) {
      state.selections[cfg.key].push(player.id);
      card.classList.add('just-selected');
      setTimeout(() => card.classList.remove('just-selected'), 500);
    } else {
      return;
    }

    renderSelectionStep(configIndex);
  }

  // ─── RENDER RESERVES STEP ─────────────────────────────
  function renderReservesStep() {
    stepsContainer.innerHTML = '';

    const section = document.createElement('div');
    section.className = 'step-section active';
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', 'Sélection des réservistes');

    const totalSelected = Object.values(state.reserves).filter(Boolean).length;

    section.innerHTML = `
      <div class="step-header">
        <p class="step-position-label">Étape 5 sur 5</p>
        <h2 class="step-title">Réservistes</h2>
        <div class="step-counter" aria-live="polite">
          <span class="count-current">${totalSelected}</span>
          <span class="count-sep">/</span>
          <span class="count-total">3</span>
          <span class="step-counter-full ${totalSelected === 3 ? 'complete' : ''}">remplaçants sélectionnés</span>
        </div>
        <p class="step-subtitle" style="color:var(--gris); font-size:0.85rem; margin-top:0.5rem;">En cas de blessure, 1 remplaçant par ligne</p>
      </div>
      <div class="step-content" id="reserves-content"></div>
      <div class="ad-slot ad-rectangle"></div>
      <nav class="step-nav" aria-label="Navigation étapes">
        <button class="btn btn-secondary btn-prev" aria-label="Étape précédente">
          <span class="arrow">&larr;</span>
          <span>Précédent</span>
        </button>
        <button class="btn btn-primary btn-next" ${totalSelected < 3 ? 'disabled' : ''} aria-label="Voir ma sélection">
          <span>Voir ma sélection</span>
          <span class="arrow">&rarr;</span>
        </button>
      </nav>
    `;

    const content = section.querySelector('#reserves-content');
    let animCounter = 0;

    RESERVES_CONFIG.forEach(rcfg => {
      const selectedMain = state.selections[rcfg.key];
      const currentReserve = state.reserves[rcfg.key];
      const available = PLAYERS.filter(p => p.position === rcfg.key && !selectedMain.includes(p.id));

      const group = document.createElement('div');
      group.className = 'reserves-group';

      const header = document.createElement('div');
      header.className = 'reserves-group-header';
      header.innerHTML = `
        <span class="reserves-group-label">${rcfg.label}</span>
        <span class="reserves-group-status ${currentReserve ? 'done' : ''}">${currentReserve ? '1/1' : '0/1'}</span>
      `;
      group.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'cards-grid';
      grid.setAttribute('role', 'listbox');

      available.forEach(player => {
        const isSelected = currentReserve === player.id;
        const isDisabled = currentReserve && !isSelected;
        const card = createPlayerCard(player, isSelected, isDisabled, animCounter++);

        card.addEventListener('click', () => {
          if (isDisabled) return;
          if (isSelected) {
            state.reserves[rcfg.key] = null;
          } else if (!currentReserve) {
            state.reserves[rcfg.key] = player.id;
          }
          renderReservesStep();
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });

        grid.appendChild(card);
      });

      group.appendChild(grid);
      content.appendChild(group);
    });

    // Nav
    section.querySelector('.btn-prev').addEventListener('click', () => {
      goToStep(state.currentStep - 1);
    });
    section.querySelector('.btn-next').addEventListener('click', () => {
      if (totalSelected === 3) {
        goToStep(state.currentStep + 1);
      }
    });

    stepsContainer.appendChild(section);
  }

  // ─── RENDER RECAP ──────────────────────────────────────
  function renderRecap() {
    stepsContainer.innerHTML = '';

    const section = document.createElement('div');
    section.className = 'recap-section active';
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', 'Récapitulatif de la sélection');

    let html = `
      <div class="recap-header">
        ${state.isViewingShared ? '<div class="viewing-badge">&#128065; Sélection partagée</div>' : ''}
        <p class="recap-overline">Coupe du Monde 2026</p>
        <h2 class="recap-title">Ma sélection<br><span style="color:var(--jaune)">belge</span></h2>
        <p class="recap-subtitle">26 joueurs pour porter les couleurs des Diables Rouges</p>
      </div>
    `;

    // Render each position group
    STEPS_CONFIG.forEach(cfg => {
      const selectedIds = state.selections[cfg.key];
      const players = selectedIds.map(id => PLAYERS.find(p => p.id === id)).filter(Boolean);

      html += `
        <div class="recap-group">
          <div class="recap-group-header">
            <span class="recap-group-line"></span>
            <span class="recap-group-label">${cfg.label}</span>
            <span class="recap-group-count">${players.length}</span>
            <span class="recap-group-line"></span>
          </div>
          <div class="recap-grid">
      `;

      players.forEach(player => {
        const initials = player.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        html += `
          <div class="recap-card">
            <div class="player-avatar">
              <div class="player-initials">${initials}</div>
            </div>
            <p class="player-name">${player.name}</p>
            <p class="player-club">${player.club}</p>
          </div>
        `;
      });

      html += `</div></div>`;
    });

    // Reserves section
    const reservePlayers = Object.entries(state.reserves)
      .map(([, id]) => PLAYERS.find(p => p.id === id))
      .filter(Boolean);

    if (reservePlayers.length > 0) {
      html += `
        <div class="recap-group recap-group--reserves">
          <div class="recap-group-header">
            <span class="recap-group-line"></span>
            <span class="recap-group-label reserves-label">Réservistes</span>
            <span class="recap-group-count">${reservePlayers.length}</span>
            <span class="recap-group-line"></span>
          </div>
          <p class="reserves-note">En cas de blessure</p>
          <div class="recap-grid">
      `;

      reservePlayers.forEach(player => {
        const initials = player.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        const posLabel = player.position === 'Défenseur' ? 'DÉF' : player.position === 'Milieu' ? 'MIL' : 'ATT';
        html += `
          <div class="recap-card recap-card--reserve">
            <div class="player-avatar">
              <div class="player-initials">${initials}</div>
            </div>
            <p class="player-name">${player.name}</p>
            <p class="player-club">${player.club}</p>
            <span class="reserve-pos-badge">${posLabel}</span>
          </div>
        `;
      });

      html += `</div></div>`;
    }

    // Share section
    const shareURL = buildShareURL();
    const shareText = encodeURIComponent('Voici ma sélection belge pour le Mondial 2026 🇧🇪⚽ #DiablesRouges #WorldCup2026');

    html += `
      <div class="share-section">
        <h3 class="share-title">Partage ta sélection</h3>
        <div class="share-buttons">
          <button class="share-btn preview" id="preview-btn" aria-label="Aperçu capture d'écran">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            <span>Aperçu</span>
          </button>
          <button class="share-btn twitter" onclick="window.open('https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareURL)}', '_blank')" aria-label="Partager sur Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>Twitter / X</span>
          </button>
          <button class="share-btn facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}', '_blank')" aria-label="Partager sur Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Facebook</span>
          </button>
          <button class="share-btn whatsapp" onclick="window.open('https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareURL)}', '_blank')" aria-label="Partager sur WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp</span>
          </button>
          <button class="share-btn copy" id="copy-link-btn" aria-label="Copier le lien">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            <span class="default-text">Copier le lien</span>
            <span class="copied-text">Copié !</span>
          </button>
        </div>
      </div>

      <div class="recap-actions">
        <button class="btn btn-secondary" id="restart-btn">
          <span>Recommencer</span>
        </button>
      </div>

      <div class="ad-slot ad-leaderboard" style="margin-bottom: var(--spacing-lg);"></div>
    `;

    section.innerHTML = html;
    stepsContainer.appendChild(section);

    // Load photos in recap cards — onload before src
    section.querySelectorAll('.recap-card').forEach(card => {
      const name = card.querySelector('.player-name').textContent;
      const player = PLAYERS.find(p => p.name === name);
      if (player) {
        const img = new Image();
        img.alt = player.name;
        img.onload = function () {
          const avatarEl = card.querySelector('.player-avatar');
          if (!avatarEl) return;
          const initialsEl = avatarEl.querySelector('.player-initials');
          if (initialsEl) initialsEl.remove();
          avatarEl.appendChild(img);
        };
        img.src = player.photo;
      }
    });

    // Copy link handler
    const copyBtn = section.querySelector('#copy-link-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shareURL).then(() => {
          copyBtn.classList.add('copied');
          setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        }).catch(() => {
          const input = document.createElement('input');
          input.value = shareURL;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          copyBtn.classList.add('copied');
          setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        });
      });
    }

    // Preview handler
    const previewBtn = section.querySelector('#preview-btn');
    if (previewBtn) {
      previewBtn.addEventListener('click', openPreviewOverlay);
    }

    // Restart handler
    const restartBtn = section.querySelector('#restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        state.selections = { Gardien: [], Défenseur: [], Milieu: [], Attaquant: [] };
        state.reserves = { Défenseur: null, Milieu: null, Attaquant: null };
        state.isViewingShared = false;
        window.history.replaceState({}, '', window.location.pathname);
        goToStep(0);
      });
    }
  }

  // ─── PREVIEW OVERLAY (screenshot-friendly) ────────────
  function openPreviewOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'preview-overlay';
    overlay.id = 'preview-overlay';

    let html = `
      <div class="preview-card">
        <button class="preview-close" id="preview-close" aria-label="Fermer l'aperçu">&times;</button>
        <div class="preview-header">
          <div class="preview-flag"><span class="pf-black"></span><span class="pf-yellow"></span><span class="pf-red"></span></div>
          <p class="preview-overline">Coupe du Monde 2026</p>
          <h2 class="preview-title">Ma sélection <span class="preview-highlight">belge</span></h2>
        </div>
    `;

    STEPS_CONFIG.forEach(cfg => {
      const players = state.selections[cfg.key].map(id => PLAYERS.find(p => p.id === id)).filter(Boolean);
      html += `
        <div class="preview-group">
          <div class="preview-group-label">${cfg.label} <span class="preview-group-count">${players.length}</span></div>
          <div class="preview-players">
      `;
      players.forEach(p => {
        const initials = p.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        html += `<div class="preview-player">
          <div class="preview-avatar"><span class="preview-initials">${initials}</span></div>
          <span class="preview-name">${p.name}</span>
        </div>`;
      });
      html += `</div></div>`;
    });

    // Reserves
    const reservePlayers = Object.entries(state.reserves)
      .map(([, id]) => PLAYERS.find(p => p.id === id))
      .filter(Boolean);

    if (reservePlayers.length > 0) {
      html += `<div class="preview-group preview-group--reserves">
        <div class="preview-group-label">Réservistes <span class="preview-group-count">${reservePlayers.length}</span></div>
        <div class="preview-players">`;
      reservePlayers.forEach(p => {
        const initials = p.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        html += `<div class="preview-player">
          <div class="preview-avatar preview-avatar--reserve"><span class="preview-initials">${initials}</span></div>
          <span class="preview-name">${p.name}</span>
        </div>`;
      });
      html += `</div></div>`;
    }

    html += `
        <div class="preview-footer">
          <span>maselectiondiables26.com</span>
        </div>
      </div>
    `;

    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    // Force reflow then animate in
    requestAnimationFrame(() => overlay.classList.add('visible'));

    // Load photos
    overlay.querySelectorAll('.preview-player').forEach(el => {
      const name = el.querySelector('.preview-name').textContent;
      const player = PLAYERS.find(p => p.name === name);
      if (player && player.photo) {
        const img = new Image();
        img.alt = player.name;
        img.onload = function () {
          const avatarEl = el.querySelector('.preview-avatar');
          const initEl = avatarEl.querySelector('.preview-initials');
          if (initEl) initEl.remove();
          img.className = 'preview-img';
          avatarEl.appendChild(img);
        };
        img.src = player.photo;
      }
    });

    // Close handlers
    const close = () => {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 300);
    };
    overlay.querySelector('#preview-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
  }

  // ─── BUILD SHARE URL (compact) ─────────────────────────
  function stripPrefix(id) {
    return id.replace(/^[a-z]+_0?/, '');
  }

  function buildShareURL() {
    const params = new URLSearchParams();
    // Use short param names and strip ID prefixes: gk_01 → 1
    const shortParams = { Gardien: 'g', Défenseur: 'd', Milieu: 'm', Attaquant: 'a' };
    STEPS_CONFIG.forEach(cfg => {
      const nums = state.selections[cfg.key].map(stripPrefix);
      params.set(shortParams[cfg.key], nums.join(','));
    });
    // Reserves — prefix with position letter: d4,m8,a2
    const KEY_TO_SHORT = { Défenseur: 'd', Milieu: 'm', Attaquant: 'a' };
    const subs = Object.entries(state.reserves)
      .filter(([, id]) => id)
      .map(([key, id]) => KEY_TO_SHORT[key] + stripPrefix(id));
    if (subs.length) {
      params.set('s', subs.join(','));
    }
    return window.location.origin + window.location.pathname + '?' + params.toString();
  }

  // ─── PRELOAD IMAGES ────────────────────────────────────
  const preloadedSteps = new Set();

  function preloadStepImages(stepIndex) {
    // stepIndex: 0=home, 1-4=positions, 5=reserves
    if (preloadedSteps.has(stepIndex)) return;
    preloadedSteps.add(stepIndex);

    let players = [];
    if (stepIndex >= 1 && stepIndex <= 4) {
      const cfg = STEPS_CONFIG[stepIndex - 1];
      players = PLAYERS.filter(p => p.position === cfg.key);
    } else if (stepIndex === 5) {
      // Reserves: preload all non-GK players
      players = PLAYERS.filter(p => p.position !== 'Gardien');
    }

    players.forEach(p => {
      if (p.photo) {
        const img = new Image();
        img.src = p.photo;
      }
    });
  }

  function preloadNextStep() {
    const next = state.currentStep + 1;
    if (next <= 5) {
      preloadStepImages(next);
    }
  }

  // ─── INIT ──────────────────────────────────────────────
  function init() {
    if (checkSharedURL()) {
      state.currentStep = 6;
      updateProgress();
      renderRecap();

      const home = $('#home-section');
      if (home) {
        home.style.display = 'none';
        home.classList.remove('active');
      }
      return;
    }

    state.currentStep = 0;
    updateProgress();

    // Preload goalkeeper images while user is on home screen
    preloadNextStep();

    const startBtn = $('#start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => goToStep(1));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
