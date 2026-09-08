/* Wesertaler PDL – Cookie-Einwilligung (DSGVO, ohne Tracking) */
(function () {
  'use strict';

  var STORAGE_KEY = 'wesertaler_pdl_cookie_consent';
  var POLICY_PATH = 'cookie-richtlinie.html';

  function getConsent() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    try {
      consent.timestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) { /* silent */ }
  }

  function policyUrl() {
    return POLICY_PATH;
  }

  function createBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p class="cookie-banner-text">' +
          'Wir verwenden Cookies und vergleichbare Technologien, um Ihre Einstellungen zu speichern. ' +
          'Mit Ihrer Zustimmung können externe Inhalte (z.&nbsp;B. Icons, Bilder von Drittanbietern) geladen werden. ' +
          'Es findet kein Marketing-Tracking statt. ' +
          '<a href="' + policyUrl() + '">Mehr erfahren</a>' +
        '</p>' +
        '<div class="cookie-banner-actions">' +
          '<button class="cookie-btn cookie-btn-accept" type="button" id="cookie-accept-all">Alle akzeptieren</button>' +
          '<button class="cookie-btn cookie-btn-essential" type="button" id="cookie-essential-only">Nur notwendige</button>' +
          '<button class="cookie-btn cookie-btn-settings" type="button" id="cookie-open-settings">Einstellungen</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    return banner;
  }

  function createModal() {
    var overlay = document.createElement('div');
    overlay.className = 'cookie-modal-overlay';
    overlay.id = 'cookie-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Cookie-Einstellungen verwalten');
    overlay.innerHTML =
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
              '<input type="checkbox" id="cookie-toggle-analytics" disabled>' +
              '<span class="cookie-toggle-slider"></span>' +
            '</label>' +
          </div>' +
          '<p class="cookie-category-desc">Werden auf dieser Website nicht eingesetzt.</p>' +
        '</div>' +
        '<div class="cookie-modal-actions">' +
          '<button class="cookie-btn cookie-btn-essential" type="button" id="cookie-modal-cancel">Abbrechen</button>' +
          '<button class="cookie-btn cookie-btn-accept" type="button" id="cookie-modal-save">Auswahl speichern</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hideModal();
    });

    return overlay;
  }

  var bannerEl, modalEl;

  function showBanner() {
    if (!bannerEl) bannerEl = createBanner();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bannerEl.classList.add('visible');
      });
    });
    bindBannerEvents();
  }

  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove('visible');
  }

  function showModal() {
    if (!modalEl) modalEl = createModal();
    bindModalEvents();
    var consent = getConsent();
    var toggle = document.getElementById('cookie-toggle-functional');
    if (toggle) {
      toggle.checked = consent ? !!consent.functional : false;
    }
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

  function bindBannerEvents() {
    var acceptBtn = document.getElementById('cookie-accept-all');
    var essentialBtn = document.getElementById('cookie-essential-only');
    var settingsBtn = document.getElementById('cookie-open-settings');

    if (acceptBtn) {
      acceptBtn.onclick = function () {
        applyConsent({ essential: true, functional: true });
      };
    }
    if (essentialBtn) {
      essentialBtn.onclick = function () {
        applyConsent({ essential: true, functional: false });
      };
    }
    if (settingsBtn) {
      settingsBtn.onclick = function () {
        showModal();
      };
    }
  }

  function bindModalEvents() {
    var saveBtn = document.getElementById('cookie-modal-save');
    var cancelBtn = document.getElementById('cookie-modal-cancel');

    if (saveBtn) {
      saveBtn.onclick = function () {
        var toggle = document.getElementById('cookie-toggle-functional');
        applyConsent({ essential: true, functional: toggle ? toggle.checked : false });
      };
    }
    if (cancelBtn) {
      cancelBtn.onclick = function () {
        hideModal();
      };
    }
  }

  function bindSettingsTriggers() {
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        showModal();
      });
    });
  }

  window.CookieConsent = {
    getConsent: getConsent,
    showBanner: showBanner,
    showSettings: showModal,
    hasFunctional: function () {
      var c = getConsent();
      return !!(c && c.functional === true);
    },
    acceptFunctional: function () {
      var c = getConsent() || { essential: true, functional: false };
      c.essential = true;
      c.functional = true;
      applyConsent(c);
    }
  };

  function init() {
    bindSettingsTriggers();
    if (!getConsent()) {
      setTimeout(showBanner, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
