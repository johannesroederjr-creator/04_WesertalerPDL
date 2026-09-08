/* Wesertaler PDL – Cookie-Einwilligung (DSGVO, ohne Tracking) */
(function () {
  'use strict';

  var STORAGE_KEY = 'wesertaler_pdl_cookie_consent';
  var POLICY_PATH = 'cookie-richtlinie.html';
  var initialized = false;
  var bannerEl = null;
  var modalEl = null;

  function getConsent() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      var parsed = JSON.parse(data);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function hasConsent() {
    var consent = getConsent();
    return !!(consent && consent.essential === true);
  }

  function saveConsent(consent) {
    try {
      consent.timestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      return true;
    } catch (e) {
      return false;
    }
  }

  function createBanner() {
    if (bannerEl) return bannerEl;

    bannerEl = document.createElement('div');
    bannerEl.className = 'cookie-banner';
    bannerEl.id = 'cookie-banner';
    bannerEl.setAttribute('role', 'dialog');
    bannerEl.setAttribute('aria-label', 'Cookie-Einstellungen');
    bannerEl.setAttribute('aria-live', 'polite');
    bannerEl.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p class="cookie-banner-text">' +
          'Wir verwenden Cookies und vergleichbare Technologien, um Ihre Einstellungen zu speichern. ' +
          'Mit Ihrer Zustimmung können externe Inhalte (z.&nbsp;B. Icons, Bilder von Drittanbietern) geladen werden. ' +
          'Es findet kein Marketing-Tracking statt. ' +
          '<a href="' + POLICY_PATH + '">Mehr erfahren</a>' +
        '</p>' +
        '<div class="cookie-banner-actions">' +
          '<button class="cookie-btn cookie-btn-accept" type="button" data-cookie-action="accept-all">Alle akzeptieren</button>' +
          '<button class="cookie-btn cookie-btn-essential" type="button" data-cookie-action="essential-only">Nur notwendige</button>' +
          '<button class="cookie-btn cookie-btn-settings" type="button" data-cookie-action="open-settings">Einstellungen</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(bannerEl);
    return bannerEl;
  }

  function createModal() {
    if (modalEl) return modalEl;

    modalEl = document.createElement('div');
    modalEl.className = 'cookie-modal-overlay';
    modalEl.id = 'cookie-modal-overlay';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'Cookie-Einstellungen verwalten');
    modalEl.innerHTML =
      '<div class="cookie-modal">' +
        '<h3>Cookie-Einstellungen</h3>' +
        '<p>Wählen Sie aus, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.</p>' +
        '<div class="cookie-category">' +
          '<div class="cookie-category-header">' +
            '<span class="cookie-category-name">Notwendige Cookies</span>' +
            '<label class="cookie-toggle">' +
              '<input type="checkbox" checked disabled>' +
              '<span class="cookie-toggle-slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="cookie-category-desc">Speichern Ihre Cookie-Einstellungen im Browser (localStorage). Keine Tracking-Daten.</p>' +
        '</div>' +
        '<div class="cookie-category">' +
          '<div class="cookie-category-header">' +
            '<span class="cookie-category-name">Funktionale Cookies / externe Inhalte</span>' +
            '<label class="cookie-toggle">' +
              '<input type="checkbox" id="cookie-toggle-functional">' +
              '<span class="cookie-toggle-slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="cookie-category-desc">Ermöglichen das Laden externer Dienste wie Font Awesome (Icons) und Bilder von Drittanbietern. Dabei kann Ihre IP-Adresse an die Anbieter übermittelt werden.</p>' +
        '</div>' +
        '<div class="cookie-category">' +
          '<div class="cookie-category-header">' +
            '<span class="cookie-category-name">Analyse- und Marketing-Cookies</span>' +
            '<label class="cookie-toggle">' +
              '<input type="checkbox" disabled>' +
              '<span class="cookie-toggle-slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="cookie-category-desc">Werden auf dieser Website nicht eingesetzt.</p>' +
        '</div>' +
        '<div class="cookie-modal-actions">' +
          '<button class="cookie-btn cookie-btn-essential" type="button" data-cookie-action="modal-cancel">Abbrechen</button>' +
          '<button class="cookie-btn cookie-btn-accept" type="button" data-cookie-action="modal-save">Auswahl speichern</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modalEl);
    return modalEl;
  }

  function showBanner() {
    if (!document.body) return;
    createBanner();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bannerEl.classList.add('visible');
      });
    });
  }

  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove('visible');
  }

  function showModal() {
    if (!document.body) return;
    createModal();
    var consent = getConsent();
    var toggle = document.getElementById('cookie-toggle-functional');
    if (toggle) toggle.checked = !!(consent && consent.functional);
    modalEl.classList.add('visible');
  }

  function hideModal() {
    if (modalEl) modalEl.classList.remove('visible');
  }

  function applyConsent(consent) {
    saveConsent(consent);
    hideBanner();
    hideModal();
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: consent }));
  }

  function handleAction(action) {
    switch (action) {
      case 'accept-all':
        applyConsent({ essential: true, functional: true });
        break;
      case 'essential-only':
        applyConsent({ essential: true, functional: false });
        break;
      case 'open-settings':
        showModal();
        break;
      case 'modal-cancel':
        hideModal();
        break;
      case 'modal-save': {
        var toggle = document.getElementById('cookie-toggle-functional');
        applyConsent({ essential: true, functional: toggle ? toggle.checked : false });
        break;
      }
      default:
        break;
    }
  }

  function bindEvents() {
    document.addEventListener('click', function (e) {
      var actionEl = e.target.closest('[data-cookie-action]');
      if (actionEl) {
        e.preventDefault();
        handleAction(actionEl.getAttribute('data-cookie-action'));
        return;
      }

      var settingsEl = e.target.closest('[data-cookie-settings]');
      if (settingsEl) {
        e.preventDefault();
        showModal();
        return;
      }

      if (modalEl && e.target === modalEl) {
        hideModal();
      }
    });
  }

  window.CookieConsent = {
    getConsent: getConsent,
    showBanner: showBanner,
    showSettings: showModal,
    resetConsent: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* silent */ }
      showBanner();
    },
    hasFunctional: function () {
      var c = getConsent();
      return !!(c && c.functional === true);
    },
    acceptFunctional: function () {
      applyConsent({ essential: true, functional: true });
    }
  };

  function init() {
    if (initialized || !document.body) return;
    initialized = true;
    bindEvents();
    if (!hasConsent()) {
      setTimeout(showBanner, 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
