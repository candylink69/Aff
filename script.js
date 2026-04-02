// ===========================================
// GLOBAL AFFILIATE WEBSITE - script.js
// Instagram browser handling + categories + listing
// ===========================================

// ---------- INSTAGRAM EXTERNAL LINK HANDLER (EXACT REQUIREMENT) ----------
function isInstagram() {
  return /Instagram|FBAN|FBAV/i.test(navigator.userAgent);
}

function openExternal(url) {
  if (isInstagram()) {
    const clean = url.replace(/^https?:\/\//, '');
    window.location.href = "intent://" + clean + "#Intent;scheme=https;end";
  } else {
    window.location.href = url;
  }
}

// ---------- UTILITY FUNCTIONS ----------
// Fetch categories.json and render on index.html
async function loadCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return; // not on index page

  try {
    const response = await fetch('categories.json');
    if (!response.ok) throw new Error('Network error');
    const categories = await response.json();
    
    // clear placeholder / existing content
    grid.innerHTML = '';
    
    if (!categories || categories.length === 0) {
      grid.innerHTML = '<div class="empty-state" style="grid-column: span 2;">No categories available</div>';
      return;
    }
    
    categories.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'category-card';
      // Use custom emoji + name
      const emoji = cat.emoji || '🎬';
      card.innerHTML = `${emoji} ${cat.name}`;
      card.setAttribute('data-id', cat.id);
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = `list.html?category=${encodeURIComponent(cat.id)}`;
      });
      grid.appendChild(card);
    });
  } catch (error) {
    console.warn('Could not load categories.json, using fallback categories');
    // fallback categories (hardcoded) if json missing
    const fallback = [
      { id: 'action', name: 'Action', emoji: '⚡' },
      { id: 'romance', name: 'Romance', emoji: '💖' },
      { id: 'thriller', name: 'Thriller', emoji: '🔪' },
      { id: 'comedy', name: 'Comedy', emoji: '😂' },
      { id: 'drama', name: 'Drama', emoji: '🎭' },
      { id: 'scifi', name: 'Sci-Fi', emoji: '🛸' }
    ];
    fallback.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `${cat.emoji} ${cat.name}`;
      card.setAttribute('data-id', cat.id);
      card.addEventListener('click', () => {
        window.location.href = `list.html?category=${encodeURIComponent(cat.id)}`;
      });
      grid.appendChild(card);
    });
  }
}

// ---------- LIST PAGE LOGIC (list.html) ----------
async function loadListPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('category');
  
  const categoryTitleEl = document.getElementById('categoryTitle');
  const categoryDescEl = document.getElementById('categoryDesc');
  const itemsContainer = document.getElementById('itemsContainer');
  
  if (!itemsContainer) return; // not on list page
  
  if (!categoryId) {
    // Invalid category, show error
    itemsContainer.innerHTML = '<div class="empty-state">⚠️ No category selected. Go back and try again.</div>';
    if (categoryTitleEl) categoryTitleEl.textContent = 'Invalid Selection';
    return;
  }
  
  // Show loading state
  itemsContainer.innerHTML = '<div class="loading-spinner">✨ Loading content...</div>';
  
  try {
    // First fetch categories.json to get category name & mapping? But data.js will provide items.
    // According to architecture: data.js provides itemsByCategory and categoriesMeta.
    // We'll load data.js dynamically if not already loaded.
    if (typeof window.itemsByCategory === 'undefined') {
      await loadDataJS();
    }
    
    // Now access global data from data.js (itemsByCategory, categoriesList)
    const items = window.itemsByCategory ? window.itemsByCategory[categoryId] : null;
    const categoryMeta = window.categoriesList ? window.categoriesList.find(c => c.id === categoryId) : null;
    
    if (categoryTitleEl) {
      categoryTitleEl.textContent = categoryMeta ? categoryMeta.name : categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    if (categoryDescEl) {
      categoryDescEl.textContent = categoryMeta ? categoryMeta.description : `Explore best ${categoryId} collection`;
    }
    
    if (!items || items.length === 0) {
      itemsContainer.innerHTML = '<div class="empty-state">📭 No items found in this category. Check back soon!</div>';
      return;
    }
    
    // Render item cards
    itemsContainer.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      
      const infoDiv = document.createElement('div');
      infoDiv.style.flex = '1';
      
      const titleDiv = document.createElement('div');
      titleDiv.className = 'item-title';
      titleDiv.textContent = item.title;
      
      const descDiv = document.createElement('div');
      descDiv.className = 'item-desc';
      descDiv.textContent = item.description || 'Click to watch now ➔';
      
      const arrowSpan = document.createElement('div');
      arrowSpan.className = 'arrow-icon';
      arrowSpan.textContent = '›';
      arrowSpan.style.fontSize = '1.8rem';
      arrowSpan.style.fontWeight = '300';
      
      infoDiv.appendChild(titleDiv);
      infoDiv.appendChild(descDiv);
      card.appendChild(infoDiv);
      card.appendChild(arrowSpan);
      
      // On click: open external link using openExternal
      card.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.link) {
          openExternal(item.link);
        } else {
          console.warn('No link for item');
        }
      });
      
      itemsContainer.appendChild(card);
    });
    
  } catch (err) {
    console.error('Failed to load list items:', err);
    itemsContainer.innerHTML = '<div class="empty-state">⚠️ Unable to load content. Please try again later.</div>';
  }
}

// Helper to dynamically load data.js (ensures categories & items)
function loadDataJS() {
  return new Promise((resolve, reject) => {
    if (typeof window.itemsByCategory !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'data.js';
    script.onload = () => {
      // wait a tick for global assignment
      setTimeout(() => {
        if (typeof window.itemsByCategory !== 'undefined') {
          resolve();
        } else {
          reject(new Error('data.js loaded but no itemsByCategory found'));
        }
      }, 10);
    };
    script.onerror = () => reject(new Error('Failed to load data.js'));
    document.head.appendChild(script);
  });
}

// ---------- GLOBAL BUTTON HANDLERS FOR INDEX (apply openExternal) ----------
function attachHeroButtons() {
  const movieBtn = document.getElementById('movieBtn');
  const storyBtn = document.getElementById('storyBtn');
  
  if (movieBtn) {
    // remove existing listeners to avoid dupes, but simple replace
    const newMovieBtn = movieBtn.cloneNode(true);
    movieBtn.parentNode.replaceChild(newMovieBtn, movieBtn);
    newMovieBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openExternal('https://candylink69.vercel.app');
    });
  }
  
  if (storyBtn) {
    const newStoryBtn = storyBtn.cloneNode(true);
    storyBtn.parentNode.replaceChild(newStoryBtn, storyBtn);
    newStoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openExternal('https://antarvasana69.vercel.app');
    });
  }
}

// ---------- RE-ATTACH CATEGORY CLICKS (if DOM changes, but ensure index dynamic) ----------
function attachCategoryClicks() {
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    // remove old listeners to avoid duplication, but we can just override with new listener
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    const catId = newCard.getAttribute('data-id');
    newCard.addEventListener('click', () => {
      if (catId) {
        window.location.href = `list.html?category=${encodeURIComponent(catId)}`;
      } else {
        // fallback: extract from text content (remove emoji)
        let rawText = newCard.innerText.trim();
        let cleanId = rawText.replace(/[^a-zA-Z0-9 ]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
        window.location.href = `list.html?category=${encodeURIComponent(cleanId)}`;
      }
    });
  });
}

// ---------- INITIALIZE BASED ON PAGE ----------
document.addEventListener('DOMContentLoaded', async () => {
  // Attach premium button handlers (Instagram safe)
  attachHeroButtons();
  
  // Detect if we are on index.html (has categoriesGrid) or list.html (has itemsContainer)
  const isIndexPage = document.getElementById('categoriesGrid') !== null;
  const isListPage = document.getElementById('itemsContainer') !== null;
  
  if (isIndexPage) {
    // Load categories from JSON file and render
    await loadCategories();
    // After loading categories, ensure click events are bound (loadCategories already binds)
    // but reattach for safety
    attachCategoryClicks();
  }
  
  if (isListPage) {
    await loadListPage();
  }
  
  // For any page, ensure any dynamically added element with external link uses openExternal
  // Also attach generic listener for any future .external-link class (not required but good)
  document.body.addEventListener('click', (e) => {
    let target = e.target.closest('[data-external]');
    if (target && target.getAttribute('data-external')) {
      e.preventDefault();
      openExternal(target.getAttribute('data-external'));
    }
  });
});

// Expose openExternal globally (so inline onclick could use)
window.openExternal = openExternal;
window.isInstagram = isInstagram;
