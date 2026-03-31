/**
 * COOKIES.JS — Bandeau de consentement RGPD
 * Gère l'affichage du bandeau et le chargement conditionnel d'AdSense.
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'cookie_consent';
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var refuseBtn = document.getElementById('cookie-refuse');

  if (!banner) return;

  var consent = localStorage.getItem(CONSENT_KEY);

  if (consent === 'accepted') {
    loadAdSense();
    return;
  }

  if (consent === 'refused') {
    return;
  }

  // No choice yet — show banner
  banner.hidden = false;

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    banner.hidden = true;
    loadAdSense();
  });

  refuseBtn.addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'refused');
    banner.hidden = true;
  });

  /**
   * Charge le script Google AdSense.
   * Remplacez ca-pub-XXXXXXX par votre vrai ID éditeur AdSense.
   */
  function loadAdSense() {
    // Décommenter et remplacer par votre ID AdSense :
    // var script = document.createElement('script');
    // script.async = true;
    // script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX';
    // script.crossOrigin = 'anonymous';
    // document.head.appendChild(script);
  }
})();
