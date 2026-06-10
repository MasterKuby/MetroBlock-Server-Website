// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    if (theme === 'system') {
        const systemTheme = getSystemTheme();
        htmlElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem('theme', 'system');
    } else {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'system') {
        const systemTheme = getSystemTheme();
        setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);

window.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme') || 'system';
    setTheme(storedTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'system') {
        setTheme('system');
    }
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const modalSearchInput = document.getElementById('modalSearchInput');
const searchModal = document.getElementById('searchModal');
const closeModal = document.getElementById('closeModal');
const searchResults = document.getElementById('searchResults');
const searchContainer = document.getElementById('searchContainer');
const searchShortcut = document.getElementById('searchShortcut');

const wikiPages = [
  {
    title: 'Getting Started',
    url: 'pages/getting-started.html',
    description: 'Installation guides and basic setup instructions'
  },
  {
    title: 'Features & Mods',
    url: 'pages/features.html',
    description: 'Explore all the features and customizations'
  },
  {
    title: 'Notable Figures',
    url: 'pages/notable-figures.html',
    description: 'Meet the community members and developers'
  },
  {
    title: 'Server Information',
    url: 'pages/server-info.html',
    description: 'Server IP, rules, and guidelines'
  },
  {
    title: 'Tutorials & Guides',
    url: 'pages/tutorials.html',
    description: 'Step-by-step tutorials for all skill levels'
  },
  {
    title: 'FAQ & Support',
    url: 'pages/faq.html',
    description: 'Frequently asked questions and support'
  },
  {
    title: 'Server History',
    url: 'pages/server-history.html',
    description: 'Explore the evolution of MetroBlock from its humble beginnings to the current Infinite version'
  },
  {
    title: 'Downloads',
    url: 'pages/downloads.html',
    description: 'Download the official MetroBlock server files for all versions'
  }];

function openSearchModal() {
    searchModal.classList.add('active');
    modalSearchInput.focus();
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    modalSearchInput.value = '';
    searchResults.innerHTML = '<div class="search-hint">Type to search wiki pages...</div>';
}

function performSearch(query) {
    if (!query.trim()) {
        searchResults.innerHTML = '<div class="search-hint">Type to search wiki pages...</div>';
        return;
    }

    const filteredPages = wikiPages.filter(page =>
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredPages.length === 0) {
        searchResults.innerHTML = '<div class="search-hint">No results found</div>';
        return;
    }

    searchResults.innerHTML = filteredPages.map(page => `    
    <a href="${page.url}" class="search-result-item">    
        <h4>${page.title}</h4>    
        <p>${page.description}</p>    
    </a>    
    `).join('');
}

searchInput.addEventListener('click', openSearchModal);
searchContainer.addEventListener('click', openSearchModal);
searchShortcut.addEventListener('click', openSearchModal);
modalSearchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});

closeModal.addEventListener('click', closeSearchModal);

searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        closeSearchModal();
    }
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }

    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearchModal();
    }
});

console.log('MetroBlock Wiki loaded successfully!');