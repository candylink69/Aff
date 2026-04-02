// ========== INSTAGRAM EXTERNAL BROWSER SYSTEM ==========
function isInstagram() {
  return /Instagram|FBAN|FBAV/i.test(navigator.userAgent);
}

function openExternal(url) {
  if (isInstagram()) {
    const clean = url.replace(/^https?:\/\//, '');
    window.location.href =
      "intent://" + clean + "#Intent;scheme=https;end";
  } else {
    window.location.href = url;
  }
}

// ========== HELPER: ATTACH OPENEXTERNAL TO ALL .external-link BUTTONS/ANCHORS ==========
function attachExternalLinks() {
  const elements = document.querySelectorAll('[data-external], .external-link, .buy-btn, .big-btn');
  elements.forEach(el => {
    // avoid duplicate listeners
    if (el.dataset.listenerAttached === 'true') return;
    let url = '';
    if (el.tagName === 'A' && el.href) {
      url = el.href;
    } else if (el.dataset.url) {
      url = el.dataset.url;
    } else if (el.getAttribute('data-link')) {
      url = el.getAttribute('data-link');
    }
    if (url) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openExternal(url);
      });
      el.dataset.listenerAttached = 'true';
    }
  });
}

// ========== AUTO ATTACH ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
  attachExternalLinks();
  
  // also observe dynamic content (for list.html products loaded later)
  const observer = new MutationObserver(() => {
    attachExternalLinks();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
