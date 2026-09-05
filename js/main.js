/**
 * Zakaria Rajib — Light, High-Performance Website & Journal Controller
 * Zero external dependencies. Fully accessible and WebMCP agent-ready.
 */
(function () {
  'use strict';

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

  // --- Journal & Category Controller ---
  const container = document.getElementById('journal-entries');
  const updatedLabel = document.getElementById('journal-updated');
  const tabs = document.querySelectorAll('.journal-tab');
  let newsData = null;
  let activeCat = 'all';

  const CATEGORY_LABELS = {
    'fashion-textile': 'Fashion & Textile',
    'business': 'Business',
  };

  /**
   * Format ISO date string into readable short format
   * @param {string} iso
   * @returns {string}
   */
  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /**
   * Render news entries according to active category filter
   */
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

    const items = targetCats
      .flatMap((cat) => (newsData.categories[cat] || []).map((item) => ({ ...item, cat })))
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    if (items.length === 0) {
      container.innerHTML = '<p class="journal-fallback">No headlines available for this category right now.</p>';
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

  /**
   * Set active category and update tab UI
   * @param {string} category
   */
  function setActiveCategory(category) {
    activeCat = category;
    tabs.forEach((tab) => {
      const isActive = tab.dataset.cat === category;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    render();
  }

  // Bind tab click and keyboard navigation
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
    } else if (action === 'toggle-theme') {
      toggleTheme();
    } else if (action === 'set-theme' && params && params.theme) {
      setTheme(params.theme);
    }
  });

  // Expose global controller for automated agent discovery
  window.ZakariaSite = {
    filterJournal: setActiveCategory,
    getActiveCategory: () => activeCat,
    getNewsData: () => newsData,
    toggleTheme: toggleTheme,
    setTheme: setTheme,
  };
})();
