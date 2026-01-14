/* ========================================
   BERNAS - Berita Nasional
   JavaScript Application
======================================== */

// Mock Data Generator
const categories = ['Politik', 'Ekonomi', 'Olahraga', 'Teknologi', 'Hiburan', 'Nasional'];

// Lorem Ipsum Word Bank for Random Generation
const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
    'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
    'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
    'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
    'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi',
    'nesciunt', 'neque', 'porro', 'quisquam', 'numquam', 'eius', 'modi', 'tempora',
    'incidunt', 'magnam', 'quaerat', 'minima', 'nostrum', 'exercitationem', 'ullam',
    'corporis', 'suscipit', 'laboriosam', 'aliquid', 'commodi', 'consequatur'
];

// Generate random Lorem Ipsum text
function generateLoremIpsum(wordCount) {
    let words = [];
    for (let i = 0; i < wordCount; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ');
}

// Generate random title (5-10 words)
function generateTitle() {
    const wordCount = Math.floor(Math.random() * 6) + 5; // 5-10 words
    let title = generateLoremIpsum(wordCount);
    return title.charAt(0).toUpperCase() + title.slice(1);
}

// Generate random excerpt (15-25 words)
function generateExcerpt() {
    const wordCount = Math.floor(Math.random() * 11) + 15; // 15-25 words
    return generateLoremIpsum(wordCount) + '.';
}

// Generate random quote
function generateQuote() {
    const wordCount = Math.floor(Math.random() * 20) + 20; // 20-40 words
    return generateLoremIpsum(wordCount) + '.';
}

const authors = [
    "Ahmad Rizki", "Siti Nurhaliza", "Budi Santoso", "Dewi Kartika",
    "Eko Prasetyo", "Fitri Handayani", "Gunawan Wijaya", "Hesti Puspita",
    "Indra Kusuma", "Joko Widodo", "Kartini Sari", "Lukman Hakim"
];

// Utility Functions
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDate(daysAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

function formatTime() {
    const hours = getRandomNumber(0, 23);
    const minutes = getRandomNumber(0, 59);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} WIB`;
}

function getPicsumImage(id, width = 800, height = 600) {
    return `https://picsum.photos/id/${id}/${width}/${height}`;
}

// Generate News Data
function generateNewsItem(index, category = null) {
    const imageId = getRandomNumber(10, 200);
    return {
        id: index,
        title: generateTitle(),
        excerpt: generateExcerpt(),
        category: category || getRandomItem(categories),
        author: getRandomItem(authors),
        date: formatDate(getRandomNumber(0, 7)),
        time: formatTime(),
        image: getPicsumImage(imageId, 800, 500),
        views: getRandomNumber(100, 10000)
    };
}

function generateNewsArray(count, category = null) {
    return Array.from({ length: count }, (_, i) => generateNewsItem(i, category));
}

// Render Functions
function renderHeroSection() {
    const heroSection = document.getElementById('heroSection');
    
    // Using random data but maintaining the requested structure
    const mainNews = generateNewsItem(0, 'HUKUM');
    const sideNews = generateNewsArray(4);
    const authorAvatarId = getRandomNumber(1, 99);

    heroSection.innerHTML = `
        <div class="hero-featured">
            <div class="hero-main-container">
                <img src="${mainNews.image}" alt="${mainNews.title}" class="hero-main-img">
                
                <div class="hero-card-overlay">
                    <div class="hero-card-header">
                        <img src="https://i.pravatar.cc/100?img=${authorAvatarId}" alt="${mainNews.author}" class="hero-card-avatar">
                        <span class="hero-card-author">${mainNews.author.toUpperCase()}</span>
                    </div>
                    
                    <h1 class="hero-card-title">${mainNews.title.toUpperCase()}</h1>
                    
                    <p class="hero-card-excerpt">${mainNews.excerpt}</p>
                    
                    <div class="hero-card-footer">
                        <span class="hero-card-date">${mainNews.date}</span>
                        <span class="hero-card-category">${mainNews.category.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="hero-sidebar-wrapper">
            <div class="hero-sidebar">
                ${sideNews.map(news => {
                    const sideAuthorId = getRandomNumber(1, 99);
                    return `
                    <a href="#" class="hero-side-item">
                        <div class="hero-side-thumb">
                            <img src="${getPicsumImage(getRandomNumber(50, 200), 120, 120)}" alt="${news.title}">
                        </div>
                        <div class="hero-side-content">
                            <div class="hero-side-meta">
                                <img src="https://i.pravatar.cc/24?img=${sideAuthorId}" alt="${news.author}" class="hero-side-avatar">
                                <span class="hero-side-author">${news.author.toUpperCase()}</span>
                                <span class="hero-side-date">${news.date}</span>
                            </div>
                            <h3 class="hero-side-title">${news.title}</h3>
                        </div>
                    </a>
                `}).join('')}
            </div>
        </div>
    `;
}

function renderLatestNews() {
    const container = document.getElementById('latestNews');
    const news = generateNewsArray(3); // Need 3 items for the complex layout
    
    container.innerHTML = `
        <div class="latest-top-row">
            <article class="latest-article-text">
                <h3 class="latest-title-large">${news[0].title}</h3>
                <p class="latest-excerpt">${news[0].excerpt}</p>
                <div class="latest-meta">${news[0].date}</div>
            </article>
            
            <div class="latest-vertical-divider"></div>
            
            <article class="latest-article-boxed">
                <div class="latest-boxed-image">
                    <img src="${news[1].image}" alt="${news[1].title}">
                </div>
                <div class="latest-boxed-content">
                    <div class="latest-meta-row">
                        <span>${news[1].date}</span>
                        <span>Foto: Kontributor Bernas</span>
                    </div>
                    <h3 class="latest-title-medium">${news[1].title}</h3>
                </div>
            </article>
        </div>
        
        <div class="latest-horizontal-divider"></div>
        
        <article class="latest-article-horizontal">
            <div class="latest-horiz-image">
                <img src="${news[2].image}" alt="${news[2].title}">
                <span class="latest-horiz-caption">Foto: Elvis Sendouw</span>
            </div>
            <div class="latest-horiz-content">
                <div class="latest-meta">${news[2].date}</div>
                <h3 class="latest-title-large">${news[2].title}</h3>
            </div>
        </article>
    `;
}

function renderTrendingNews() {
    const container = document.getElementById('trendingNews');
    const news = generateNewsArray(6);
    
    container.innerHTML = news.map((item, index) => `
        <div class="trending-item-alt">
            <div class="trending-number-bg">${index + 1}</div>
            <div class="trending-content-alt">
                <div class="trending-header-alt">
                    <span class="trending-dot"></span>
                    <h4 class="trending-title-alt">${item.title}</h4>
                </div>
                <div class="trending-meta-alt">
                    <span class="trending-author">${item.author.toUpperCase()}</span>
                    <span class="trending-date">${item.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCategoryNews(containerId, category) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const news = generateNewsArray(4, category);
    
    container.innerHTML = news.map((item, index) => {
        if (index === 0) {
            // First item: Prominent Card
            return `
                <a href="#" class="category-card-v2">
                    <div class="category-card-v2-img">
                        <img src="${getPicsumImage(getRandomNumber(30, 190), 300, 200)}" alt="${item.title}">
                    </div>
                    <div class="category-card-v2-content">
                        <h4 class="category-card-v2-title">${item.title}</h4>
                        <div class="category-card-v2-meta">
                            <span class="category-card-v2-date">${item.date}</span>
                        </div>
                    </div>
                </a>
            `;
        } else {
            // Subsequent items: Text Only with Dot
            return `
                <a href="#" class="category-item-text">
                    <span class="category-dot"></span>
                    <h4 class="category-item-text-title">${item.title}</h4>
                </a>
            `;
        }
    }).join('');
}




function renderBreakingNews() {
    const ticker = document.getElementById('breakingTicker');
    if (!ticker) return;
    const headlines = generateNewsArray(5).map(n => n.title);
    
    // Duplicate for seamless loop
    const content = headlines.map(h => `<span class="ticker-item">${h}</span>`).join('');
    ticker.innerHTML = content + content;
}

function renderTVSection() {
    const headline = document.getElementById('tvHeadline');
    const currentTitle = document.getElementById('tvCurrentPlayingTitle');
    const playlist = document.getElementById('tvPlaylist');
    
    if (!headline || !playlist) return;

    const mainTitle = generateTitle();
    headline.innerHTML = `${mainTitle} <span class="highlight-blue">${getRandomItem(['INVESTASI', 'PENTING', 'TERKINI', 'NASIONAL'])}</span>`;
    currentTitle.textContent = mainTitle;

    const items = Array.from({ length: 5 }, (_, i) => ({
        title: generateTitle(),
        duration: `00:0${getRandomNumber(1, 9)}:${getRandomNumber(10, 59)}`,
        image: `https://picsum.photos/seed/tv-item-${i}/150/100`
    }));

    playlist.innerHTML = items.map((item, index) => `
        <div class="tv-item ${index === 0 ? 'active' : ''}">
            <span class="active-dot"></span>
            <div class="tv-thumb">
                <img src="${item.image}" alt="Thumb">
            </div>
            <div class="tv-item-details">
                <h4 class="tv-item-title">${item.title}</h4>
                <span class="tv-item-duration">${item.duration}</span>
            </div>
        </div>
    `).join('');
}

function renderOpiniSection() {
    const container = document.getElementById('opiniList');
    if (!container) return;

    // Fully dynamic titles using Lorem Ipsum
    const opiniData = Array.from({ length: 6 }, (_, i) => ({
        title: generateTitle().toUpperCase(),
        image: `https://picsum.photos/seed/opini-v2-${i}/120/120`
    }));

    container.innerHTML = opiniData.map(item => `
        <a href="#" class="opini-item-horiz">
            <div class="opini-item-content">
                <h3 class="opini-item-title">${item.title}</h3>
            </div>
            <div class="opini-item-thumb">
                <img src="${item.image}" alt="Opini">
            </div>
        </a>
    `).join('');
}

function initOpiniScroll() {
    const list = document.getElementById('opiniList');
    const prevBtn = document.getElementById('opiniPrevBtn');
    const nextBtn = document.getElementById('opiniNextBtn');
    
    if (!list || !prevBtn || !nextBtn) return;

    const scrollAmount = 400; // Roughly one item width + gap

    prevBtn.addEventListener('click', () => {
        list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Optional: Toggle button visibility based on scroll position
    const toggleButtons = () => {
        prevBtn.style.opacity = list.scrollLeft > 10 ? '1' : '0.3';
        prevBtn.style.pointerEvents = list.scrollLeft > 10 ? 'auto' : 'none';
        
        const isAtEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 10;
        nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    };

    list.addEventListener('scroll', toggleButtons);
    window.addEventListener('resize', toggleButtons);
    setTimeout(toggleButtons, 100); // Initial check
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    
    if (!menuBtn || !mobileNavMenu) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNavMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.classList.remove('active');
            mobileNavMenu.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a link
    mobileNavMenu.querySelectorAll('.mobile-category-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileNavMenu.classList.remove('active');
        });
    });
}

// Category Navigation Active State
function initNavigation() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const mobileCategoryLinks = document.querySelectorAll('.mobile-category-link');
    
    const handleCategoryClick = (e, links) => {
        e.preventDefault();
        links.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        const category = e.target.dataset.category || e.target.textContent;
        console.log('Selected category:', category);
    };
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => handleCategoryClick(e, categoryLinks));
    });
    
    mobileCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => handleCategoryClick(e, mobileCategoryLinks));
    });
}

// Set Current Date
function setCurrentDate() {
    const dateDisplay = document.getElementById('currentDate');
    if (!dateDisplay) return;
    
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    dateDisplay.textContent = `${dayName}, ${day} ${month} ${year}`;
}

// Initialize Application
function init() {
    // Set current date
    setCurrentDate();
    
    // Render content
    renderHeroSection();
    renderLatestNews();
    renderTrendingNews();
    renderTVSection();
    renderOpiniSection();
    renderCategoryNews('politikNews', 'Politik');
    renderCategoryNews('ekonomiNews', 'Ekonomi');
    renderCategoryNews('hukumNews', 'Hukum');
    renderCategoryNews('peristiwaNews', 'Peristiwa');

    
    // Initialize interactions
    initMobileMenu();
    initNavigation();
    initOpiniScroll();
    
    console.log('BERNAS - Berita Nasional initialized successfully!');
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
