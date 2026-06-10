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

const isSubpage = window.location.pathname.includes('/pages/');

function resolvePageUrl(path) {
    return isSubpage ? `../${path}` : path;
}

const wikiPages = [
    {
        title: 'Home',
        url: resolvePageUrl('index.html'),
        description: 'MetroBlock Wiki homepage and main navigation hub'
    },
    {
        title: 'Downloads',
        url: resolvePageUrl('pages/downloads.html'),
        description: 'Download the official MetroBlock server files for all versions'
    },
    {
        title: 'Downloads - Infinite',
        url: resolvePageUrl('pages/downloads.html#infinite-section'),
        description: 'Current MetroBlock: Infinite release and beta downloads'
    },
    {
        title: 'Downloads - MetroBlock 5',
        url: resolvePageUrl('pages/downloads.html#mb5-section'),
        description: 'MetroBlock 5 server download archive'
    },
    {
        title: 'Downloads - MetroBlock 4',
        url: resolvePageUrl('pages/downloads.html#mb4-section'),
        description: 'MetroBlock 4 server download archive'
    },
    {
        title: 'Downloads - MetroBlock 3',
        url: resolvePageUrl('pages/downloads.html#mb3-section'),
        description: 'MetroBlock 3 server download archive'
    },
    {
        title: 'Downloads - MetroBlock 2',
        url: resolvePageUrl('pages/downloads.html#mb2-section'),
        description: 'MetroBlock 2 server download archive'
    },
    {
        title: 'Downloads - MetroBlock 1',
        url: resolvePageUrl('pages/downloads.html#mb1-section'),
        description: 'MetroBlock 1 initial release download archive'
    },
    {
        title: 'Notable Figures',
        url: resolvePageUrl('pages/notable-figures.html'),
        description: 'Meet the community members and developers behind MetroBlock'
    },
    {
        title: 'Notable Figures - Olat Giggs',
        url: resolvePageUrl('pages/notable-figures.html'),
        description: 'Profile, stories, and quotes about Olat Giggs'
    },
    {
        title: 'Server History',
        url: resolvePageUrl('pages/server-history.html'),
        description: 'Explore the evolution of MetroBlock from its beginnings to Infinite'
    },
    {
        title: 'Server History - MetroBlock 1',
        url: resolvePageUrl('pages/server-history.html#mb1'),
        description: 'The original 2022 MetroBlock server launch'
    },
    {
        title: 'Server History - MetroBlock 2',
        url: resolvePageUrl('pages/server-history.html#mb2'),
        description: 'Major overhaul with custom plugins and dimension features'
    },
    {
        title: 'Server History - MetroBlock 3',
        url: resolvePageUrl('pages/server-history.html#mb3'),
        description: 'Faction system, towns, and dynamic economy era'
    },
    {
        title: 'Server History - MetroBlock 4',
        url: resolvePageUrl('pages/server-history.html#mb4'),
        description: 'Performance-focused migration from Forge to Fabric'
    },
    {
        title: 'Server History - MetroBlock 5',
        url: resolvePageUrl('pages/server-history.html#mb5'),
        description: 'Introduction of Grovis and narrative-driven gameplay'
    },
    {
        title: 'Server History - Infinite',
        url: resolvePageUrl('pages/server-history.html#infinite'),
        description: 'Current MetroBlock: Infinite era built on Minecraft 1.20.1'
    }
];

function openSearchModal() {
    if (!searchModal || !modalSearchInput) {
        return;
    }

    searchModal.classList.add('active');
    modalSearchInput.focus();
}

function closeSearchModal() {
    if (!searchModal || !searchResults) {
        return;
    }

    searchModal.classList.remove('active');
    if (searchInput) {
        searchInput.value = '';
    }
    if (modalSearchInput) {
        modalSearchInput.value = '';
    }
    searchResults.innerHTML = '<div class="search-hint">Type to search wiki pages...</div>';
}

function performSearch(query) {
    if (!searchResults) {
        return;
    }

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

if (searchInput) {
    searchInput.addEventListener('click', openSearchModal);
}
if (searchContainer) {
    searchContainer.addEventListener('click', openSearchModal);
}
if (searchShortcut) {
    searchShortcut.addEventListener('click', openSearchModal);
}
if (modalSearchInput) {
    modalSearchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
}

if (closeModal) {
    closeModal.addEventListener('click', closeSearchModal);
}

if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }

    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
        closeSearchModal();
    }
});

console.log('MetroBlock Wiki loaded successfully!');
