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
    const mainNews = generateNewsItem(0);
    const sideNews = generateNewsArray(4); // 4 items for sidebar
    const authorAvatarId = getRandomNumber(1, 99);
    
    heroSection.innerHTML = `
        <div class="hero-featured">
            <a href="#" class="hero-main">
                <img src="${mainNews.image}" alt="${mainNews.title}">
                <div class="hero-overlay">
                    <!-- Author Info -->
                    <div class="hero-author">
                        <img src="https://i.pravatar.cc/40?img=${authorAvatarId}" alt="${mainNews.author}" class="hero-author-avatar">
                        <span class="hero-author-name">${mainNews.author.toUpperCase()}</span>
                    </div>
                    
                    <!-- Title -->
                    <h1 class="hero-title">${mainNews.title.toUpperCase()}</h1>
                    
                    <!-- Excerpt -->
                    <p class="hero-excerpt">${mainNews.excerpt}</p>
                    
                    <!-- Bottom: Date & Category -->
                    <div class="hero-bottom">
                        <span class="hero-date">${mainNews.date}</span>
                        <span class="hero-category-badge">${mainNews.category.toUpperCase()}</span>
                    </div>
                </div>
            </a>
        </div>
        
        <div class="hero-sidebar">
            ${sideNews.map((news, index) => {
                const sideAuthorId = getRandomNumber(1, 99);
                return `
                <a href="#" class="hero-side-item">
                    <div class="hero-side-thumb">
                        <img src="${getPicsumImage(getRandomNumber(50, 200), 120, 80)}" alt="${news.title}">
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
    `;
}

function renderLatestNews() {
    const container = document.getElementById('latestNews');
    const news = generateNewsArray(6);
    
    container.innerHTML = news.map(item => `
        <article class="news-card">
            <a href="#" class="news-card-image">
                <img src="${getPicsumImage(getRandomNumber(20, 180), 600, 400)}" alt="${item.title}">
                <span class="news-card-category">${item.category}</span>
            </a>
            <div class="news-card-content">
                <h3 class="news-card-title">${item.title}</h3>
                <p class="news-card-excerpt">${item.excerpt}</p>
                <div class="news-card-meta">
                    <span>${item.author}</span>
                    <span>•</span>
                    <span>${item.date}</span>
                </div>
            </div>
        </article>
    `).join('');
}

function renderCategoryNews(containerId, category) {
    const container = document.getElementById(containerId);
    const news = generateNewsArray(4, category);
    
    container.innerHTML = news.map(item => `
        <a href="#" class="category-card">
            <div class="category-card-image">
                <img src="${getPicsumImage(getRandomNumber(30, 190), 300, 300)}" alt="${item.title}">
            </div>
            <div class="category-card-content">
                <h4 class="category-card-title">${item.title}</h4>
                <span class="category-card-meta">${item.date}</span>
            </div>
        </a>
    `).join('');
}

function renderPopularNews() {
    const container = document.getElementById('popularNews');
    const news = generateNewsArray(5);
    
    container.innerHTML = news.map((item, index) => `
        <div class="popular-item">
            <span class="popular-number">${String(index + 1).padStart(2, '0')}</span>
            <div class="popular-content">
                <h4 class="popular-title">${item.title}</h4>
                <span class="popular-meta">${item.views.toLocaleString()} views • ${item.time}</span>
            </div>
        </div>
    `).join('');
}

function renderQuote() {
    const container = document.getElementById('dailyQuote');
    const authorTitles = [
        { author: "Prof. Dr. Ahmad Wijaya", title: "Pakar Ekonomi" },
        { author: "Dr. Sari Kusuma", title: "Analis Politik" },
        { author: "Prof. Bambang Sutrisno", title: "Tokoh Budayawan" },
        { author: "Dr. Maya Indah", title: "Pemerhati Sosial" }
    ];
    const selectedAuthor = getRandomItem(authorTitles);
    
    container.innerHTML = `
        <div class="quote-icon">❝</div>
        <p class="quote-text">${generateQuote()}</p>
        <div class="quote-author">${selectedAuthor.author}</div>
        <div class="quote-title">${selectedAuthor.title}</div>
    `;
}

function renderBreakingNews() {
    const ticker = document.getElementById('breakingTicker');
    const headlines = generateNewsArray(5).map(n => n.title);
    
    // Duplicate for seamless loop
    const content = headlines.map(h => `<span class="ticker-item">${h}</span>`).join('');
    ticker.innerHTML = content + content;
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
    renderCategoryNews('politikNews', 'Politik');
    renderCategoryNews('ekonomiNews', 'Ekonomi');
    renderPopularNews();
    renderQuote();
    
    // Initialize interactions
    initMobileMenu();
    initNavigation();
    
    console.log('BERNAS - Berita Nasional initialized successfully!');
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
