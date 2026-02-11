/**
 * Quazaar Sync / Cloudflare Tunnel Error Page Randomizer
 * Works with GitHub Pages, Cloudflare Pages, or custom web servers.
 */
(function () {
  const TOTAL_TEMPLATES = 8;
  const basePath = (function() {
    // Detect if running inside tunnel/synker or root
    const current = window.location.pathname;
    if (current.includes('/tunnel/synker')) {
      return '';
    }
    return 'tunnel/synker/';
  })();

  const templates = Array.from(
    { length: TOTAL_TEMPLATES },
    (_, i) => `${basePath}not_running_${i}.html`
  );

  function getRandomTemplate() {
    const idx = Math.floor(Math.random() * templates.length);
    return {
      index: idx,
      path: templates[idx]
    };
  }

  function redirectRandom() {
    const selected = getRandomTemplate();
    window.location.replace(selected.path);
  }

  // Export to global scope
  window.QuazaarRandomizer = {
    templates,
    getRandomTemplate,
    redirectRandom
  };
})();
