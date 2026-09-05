/**
 * Zakaria Rajib — Light, High-Performance Website & Journal Controller
 * Zero external dependencies. Fully accessible and WebMCP agent-ready.
 */
(function () {
  'use strict';

  // --- Toast Notification Helper ---
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Splash Screen Controller ---
  const splash = document.getElementById('splash');
  if (splash) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function safeSessionGet(key) {
      try { return sessionStorage.getItem(key); } catch (e) { return null; }
    }
    function safeSessionSet(key, value) {
      try { sessionStorage.setItem(key, value); } catch (e) {}
    }

    if (safeSessionGet('zk-splash-shown')) {
      splash.remove();
    } else {
      document.body.style.overflow = 'hidden';

      const dismissSplash = () => {
        splash.classList.add('hide');
        document.body.style.overflow = '';
        safeSessionSet('zk-splash-shown', '1');
        setTimeout(() => splash.remove(), 650);
      };

      if (reducedMotion) {
        dismissSplash();
      } else {
        setTimeout(() => {
          splash.classList.add('reveal');
          setTimeout(dismissSplash, 700);
        }, 550);

        splash.addEventListener('click', dismissSplash, { once: true });
      }
    }
  }

  // --- Dark Mode Theme Controller ---
  const toggleBtn = document.getElementById('theme-toggle');
  const footerMark = document.getElementById('footer-mark');
  const htmlEl = document.documentElement;

  function safeLocalSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function updateFooterMark() {
    if (!footerMark) return;
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    footerMark.src = isDark ? 'assets/footer-mark-dark.png' : 'assets/footer-mark.png';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
      safeLocalSet('zk-theme', 'dark');
    } else {
      htmlEl.removeAttribute('data-theme');
      safeLocalSet('zk-theme', 'light');
    }
    updateFooterMark();
  }

  function toggleTheme() {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  }

  updateFooterMark();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  // --- Sticky Glass Header & Scroll Spy ---
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('nav a');
  const trackedSections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (siteHeader) {
      siteHeader.classList.toggle('is-sticky', scrollY > 70);
    }
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('nav-active', href === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    trackedSections.forEach((sec) => observer.observe(sec));
  }

  // --- Digital Card & QR Code Modal Controller ---
  const qrModal = document.getElementById('qr-modal');
  const qrOpenBtns = [
    document.getElementById('qr-modal-btn'),
    document.getElementById('contact-qr-btn')
  ].filter(Boolean);
  const modalCloseBtn = document.getElementById('modal-close');
  const copyLinkBtn = document.getElementById('copy-link-btn');

  function openQRModal() {
    if (!qrModal) return;
    qrModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQRModal() {
    if (!qrModal) return;
    qrModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  qrOpenBtns.forEach((btn) => btn.addEventListener('click', openQRModal));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQRModal);

  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) closeQRModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qrModal && qrModal.classList.contains('active')) {
      closeQRModal();
    }
  });

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      const shareUrl = window.location.origin && window.location.origin !== 'null'
        ? window.location.href.split('#')[0]
        : 'https://zakaria.com.bd';
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl)
          .then(() => showToast('Portfolio link copied to clipboard!'))
          .catch(() => showToast('Link: ' + shareUrl));
      } else {
        showToast('Link: ' + shareUrl);
      }
    });
  }

  // --- Smart Quotation Builder ---
  const quoteProduct = document.getElementById('quote-product');
  const quoteType = document.getElementById('quote-type');
  const quoteNotes = document.getElementById('quote-notes');
  const quoteWhatsAppBtn = document.getElementById('quote-whatsapp-btn');
  const quoteEmailBtn = document.getElementById('quote-email-btn');

  function buildQuotePayload() {
    const product = quoteProduct ? quoteProduct.value : 'Clothing';
    const type = quoteType ? quoteType.value : 'Wholesale Bulk';
    const notes = quoteNotes && quoteNotes.value.trim() ? quoteNotes.value.trim() : '';
    return { product, type, notes };
  }

  function sendQuoteWhatsApp() {
    const { product, type, notes } = buildQuotePayload();
    let text = `Hello Zakaria,\nI would like to request a quotation for ${product}.\nOrder Requirement: ${type}.`;
    if (notes) text += `\nSpecification / Quantity: ${notes}`;
    const url = `https://wa.me/8801309077997?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function sendQuoteEmail() {
    const { product, type, notes } = buildQuotePayload();
    const subject = `Sourcing & Quotation Inquiry: ${product} (${type})`;
    let body = `Dear Zakaria Rajib,\n\nI am reaching out regarding sourcing ${product}.\n\nOrder Requirement: ${type}\n`;
    if (notes) body += `Specification / Volume: ${notes}\n\n`;
    body += `Please provide bulk terms and quotation at your earliest convenience.\n\nBest regards,`;
    const mailto = `mailto:business@zakaria.com.bd?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  if (quoteWhatsAppBtn) quoteWhatsAppBtn.addEventListener('click', sendQuoteWhatsApp);
  if (quoteEmailBtn) quoteEmailBtn.addEventListener('click', sendQuoteEmail);

  // --- Journal, Search & Category Controller ---
  const container = document.getElementById('journal-entries');
  const updatedLabel = document.getElementById('journal-updated');
  const tabs = document.querySelectorAll('.journal-tab');
  const searchInput = document.getElementById('journal-search');
  let newsData = null;
  let activeCat = 'all';
  let searchQuery = '';

  const CATEGORY_LABELS = {
    'fashion-textile': 'Fashion & Textile',
    'business': 'Business',
  };

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function render() {
    if (!container) return;

    if (!newsData || !newsData.categories) {
      container.innerHTML = '<p class="journal-fallback">No headlines available right now.</p>';
      return;
    }

    const availableCats = Object.keys(newsData.categories);
    const targetCats = activeCat === 'all'
      ? availableCats
      : [activeCat];

    let items = targetCats
      .flatMap((cat) => (newsData.categories[cat] || []).map((item) => ({ ...item, cat })))
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter((item) => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.snippet && item.snippet.toLowerCase().includes(q)) ||
        (item.source && item.source.toLowerCase().includes(q))
      );
    }

    if (items.length === 0) {
      container.innerHTML = searchQuery
        ? `<p class="journal-fallback">No headlines found matching "${searchQuery}".</p>`
        : '<p class="journal-fallback">No headlines available for this category right now.</p>';
      return;
    }

    container.innerHTML = items.map((item) => `
      <article class="journal-item" data-category="${item.cat}">
        <div class="journal-item-top">
          <span class="journal-tag">${CATEGORY_LABELS[item.cat] || item.cat}</span>
          <time class="journal-date" datetime="${item.pubDate}">${formatDate(item.pubDate)}</time>
        </div>
        <h3 class="journal-title">
          <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
        </h3>
        ${item.snippet ? `<p class="journal-snippet">${item.snippet}</p>` : ''}
        ${item.source ? `<p class="journal-source">Source: ${item.source}</p>` : ''}
      </article>
    `).join('');
  }

  function setActiveCategory(category) {
    activeCat = category;
    tabs.forEach((tab) => {
      const isActive = tab.dataset.cat === category;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    render();
  }

  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');

    tab.addEventListener('click', () => {
      setActiveCategory(tab.dataset.cat || 'all');
    });

    tab.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        tabs[targetIndex].focus();
        tabs[targetIndex].click();
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  // Fetch news data
  fetch('news.json', { cache: 'no-store' })
    .then((res) => {
      if (!res.ok) throw new Error('news.json unavailable');
      return res.json();
    })
    .then((data) => {
      newsData = data;
      if (updatedLabel && data.updatedAt) {
        updatedLabel.textContent = `Last updated ${formatDate(data.updatedAt)}.`;
      }
      render();
    })
    .catch(() => {
      if (container) {
        container.innerHTML = '<p class="journal-fallback">The daily journal loads once this site is hosted with the automated news job running (see README.md). Opening index.html directly won\'t show live headlines.</p>';
      }
    });

  /**
   * WebMCP / Agent Action Dispatcher
   * Allows AI agents to interact with the interface programmatically via WebMCP standards.
   */
  document.addEventListener('mcp-action', (event) => {
    const { action, params } = event.detail || {};
    if (action === 'filter-journal' && params && params.category) {
      setActiveCategory(params.category);
    } else if (action === 'search-journal' && params && params.query) {
      if (searchInput) {
        searchInput.value = params.query;
      }
      searchQuery = params.query.trim();
      render();
    } else if (action === 'toggle-theme') {
      toggleTheme();
    } else if (action === 'set-theme' && params && params.theme) {
      setTheme(params.theme);
    } else if (action === 'open-qr-modal') {
      openQRModal();
    } else if (action === 'save-contact') {
      const saveBtn = document.getElementById('save-contact-btn');
      if (saveBtn) saveBtn.click();
    } else if (action === 'whatsapp') {
      const waBtn = document.getElementById('whatsapp-btn');
      if (waBtn) waBtn.click();
    } else if (action === 'quote-whatsapp') {
      sendQuoteWhatsApp();
    } else if (action === 'quote-email') {
      sendQuoteEmail();
    }
  });

  // Expose global controller for automated agent discovery & testing
  const trustDateEl = document.getElementById('trust-date');
  if (trustDateEl) {
    const now = new Date();
    trustDateEl.textContent = 'Last Updated: ' + now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  window.ZakariaSite = {
    filterJournal: setActiveCategory,
    getActiveCategory: () => activeCat,
    getNewsData: () => newsData,
    toggleTheme: toggleTheme,
    setTheme: setTheme,
    openQRModal: openQRModal,
    closeQRModal: closeQRModal,
    showToast: showToast,
    buildQuotePayload: buildQuotePayload,
  };
})();
