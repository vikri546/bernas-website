// Global State
let allNews = [];

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
    if (!heroSection) return;
    
    const mainNews = generateNewsItem(0, 'HUKUM');
    const sideNews = generateNewsArray(4);
    const authorAvatarId = getRandomNumber(1, 99);

    heroSection.innerHTML = `
        <div class="hero-featured">
            <div onclick="showDescription(${JSON.stringify(mainNews).replace(/"/g, '&quot;')}, ${authorAvatarId})" class="hero-main-container" style="cursor: pointer;">
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
    if (!container) return;
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
    if (!container) return;
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
    if (!headline) return;
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

function renderLatestNewsV3() {
    const container = document.getElementById('latestNewsV3');
    if (!container) return;

    const news = generateNewsArray(5);
    container.innerHTML = news.map(item => {
        const avatarId = getRandomNumber(1, 99);
        return `
            <article class="latest-card-v3">
                <div class="latest-card-v3-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="latest-card-v3-content">
                    <div class="latest-v3-meta">
                        <img src="https://i.pravatar.cc/48?img=${avatarId}" alt="Author" class="latest-v3-avatar">
                        <span class="latest-v3-author">${item.author}</span>
                        <span class="latest-v3-date">${item.date}</span>
                    </div>
                    <a href="#" class="latest-card-v3-title">${item.title.toUpperCase()}</a>
                </div>
            </article>
        `;
    }).join('');
}

function initBannerSlider() {
    const container = document.getElementById('sidebarBanner');
    if (!container) return;

    const bannerCount = 5;
    const images = Array.from({ length: bannerCount }, (_, i) => getPicsumImage(getRandomNumber(200, 300), 400, 600));

    container.innerHTML = images.map((img, i) => `
        <div class="banner-slide ${i === 0 ? 'active' : ''}" style="background-image: url('${img}')"></div>
    `).join('');

    let currentSlide = 0;
    const slides = container.querySelectorAll('.banner-slide');

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

function renderSidebarExtra() {
    const editorChoiceContainer = document.getElementById('editorChoiceNews');
    const audioTitle = document.getElementById('audioTitle');
    
    if (editorChoiceContainer) {
        const item = generateNewsItem(0);
        editorChoiceContainer.innerHTML = `
            <div class="editor-choice-item">
                <img src="${item.image}" alt="Editor Choice" class="editor-choice-img">
                <a href="#" class="editor-choice-title">${item.title.toUpperCase()}</a>
                <div class="editor-choice-meta-v3">${item.date}</div>
            </div>
        `;
    }

    if (audioTitle) {
        audioTitle.textContent = generateTitle();
    }
}

function renderVotingSection() {
    const container = document.getElementById('interactiveVoting');
    if (!container) return;

    const polls = Array.from({ length: 3 }, (_, i) => ({
        id: 101 + i,
        question: generateTitle() + "?",
        options: Array.from({ length: 4 }, () => generateTitle()),
        votes: getRandomNumber(1000, 15000)
    }));

    container.innerHTML = polls.map(poll => `
        <div class="polling-card" id="poll-${poll.id}">
            <div class="polling-badge">POLLING #${poll.id}</div>
            <h3 class="polling-question">${poll.question}</h3>
            
            <div class="polling-options">
                ${poll.options.map((opt, idx) => `
                    <label class="polling-option-label" onclick="castVote(this, ${poll.id})">
                        <input type="radio" name="poll-${poll.id}" class="polling-radio">
                        <div class="polling-check"></div>
                        <span class="polling-option-text">${opt}</span>
                    </label>
                `).join('')}
            </div>

            <div class="poll-results-v4" style="display: none;">
                <div class="result-bars">
                    ${poll.options.map((opt, idx) => {
                        const percent = idx === 0 ? 45 : (idx === 1 ? 30 : (idx === 2 ? 15 : 10));
                        return `
                            <div class="poll-result-item">
                                <div class="res-bar-label">
                                    <span>${opt}</span>
                                    <span>${percent}%</span>
                                </div>
                                <div class="res-bar-bg"><div class="res-bar-fill" style="width: ${percent}%"></div></div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="polling-footer">
                <div class="polling-stats">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <span>${poll.votes.toLocaleString()} VOTES</span>
                </div>
                <button class="polling-submit-btn" onclick="submitVote(${poll.id})">KIRIM SUARA</button>
            </div>
        </div>
    `).join('');

    // Generate Dots
    const dotsContainer = document.getElementById('pollingDots');
    if (dotsContainer) {
        dotsContainer.innerHTML = polls.map((_, i) => `
            <span class="dot ${i === 0 ? 'active' : ''}"></span>
        `).join('');
    }
}

// Global functions for voting interaction
window.castVote = function(el, pollId) {
    const card = document.getElementById(`poll-${pollId}`);
    const labels = card.querySelectorAll('.polling-option-label');
    labels.forEach(l => l.classList.remove('selected'));
    el.classList.add('selected');
    
    // Check the radio input
    const radio = el.querySelector('.polling-radio');
    if (radio) radio.checked = true;
};

window.submitVote = function(pollId) {
    const card = document.getElementById(`poll-${pollId}`);
    const selected = card.querySelector('.polling-option-label.selected');
    if (!selected) {
        alert('Silakan pilih salah satu opsi!');
        return;
    }

    card.querySelector('.polling-options').style.display = 'none';
    card.querySelector('.poll-results-v4').style.display = 'block';
    card.querySelector('.polling-submit-btn').style.display = 'none';
};

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

function initPollingSlider() {
    const container = document.getElementById('interactiveVoting');
    const dotsContainer = document.getElementById('pollingDots');
    
    if (!container || !dotsContainer) return;

    container.addEventListener('scroll', () => {
        const dots = dotsContainer.querySelectorAll('.dot');
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.querySelector('.polling-card').offsetWidth + 20; // 20 is gap
        const index = Math.round(scrollLeft / cardWidth);
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });
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

// Search Management
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length >= 2) {
                renderSearchResults(query);
            } else if (query.length === 0) {
                showHome();
            }
        });
    }
}

function renderSearchResults(query) {
    const homeContent = document.getElementById('homeContent');
    const heroSection = document.getElementById('heroSection');
    const descriptionArea = document.getElementById('descriptionArea');
    const descriptionContent = document.getElementById('descriptionContent');

    if (!homeContent || !descriptionArea || !descriptionContent) return;

    // Show description area as a container for results
    homeContent.style.display = 'none';
    heroSection.style.display = 'none';
    descriptionArea.style.display = 'block';

    // Hide extra sections as requested
    const tvSection = document.querySelector('.tv-section');
    const pollingSection = document.querySelector('.polling-section');
    const opiniSection = document.querySelector('.opini-section-horizontal');
    const latestSidebarSection = document.querySelector('.latest-sidebar-container');
    const categoryGridSection = document.querySelector('.category-grid-layout');

    if (tvSection) tvSection.style.display = 'none';
    if (pollingSection) pollingSection.style.display = 'none';
    if (opiniSection) opiniSection.style.display = 'none';
    if (latestSidebarSection) latestSidebarSection.style.display = 'none';
    if (categoryGridSection) categoryGridSection.style.display = 'none';

    const results = allNews.filter(n => 
        n.title.toLowerCase().includes(query) || 
        n.excerpt.toLowerCase().includes(query) ||
        n.category.toLowerCase().includes(query)
    );

    descriptionContent.innerHTML = `
        <div class="search-results-header">
            <h2>Hasil Pencarian untuk: "${query}"</h2>
            <p>${results.length} berita ditemukan</p>
        </div>
        <div class="search-results-list">
            ${results.map(item => `
                <article class="search-result-item" onclick="showDescription(${JSON.stringify(item).replace(/"/g, '&quot;')}, ${getRandomNumber(1, 99)})" style="cursor: pointer; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-gray-200);">
                    <div style="display: flex; gap: 1.5rem;">
                        <img src="${item.image}" alt="${item.title}" style="width: 200px; height: 120px; object-fit: cover; border-radius: 8px;">
                        <div>
                            <span class="article-category" style="font-size: 0.75rem; color: var(--color-primary); font-weight: bold;">${item.category.toUpperCase()}</span>
                            <h3 style="margin: 0.5rem 0;">${item.title.toUpperCase()}</h3>
                            <p style="font-size: 0.9rem; color: var(--color-gray-600);">${item.excerpt}</p>
                            <span style="font-size: 0.75rem; color: var(--color-gray-500);">${item.date}</span>
                        </div>
                    </div>
                </article>
            `).join('')}
            ${results.length === 0 ? '<p>Tidak ada berita yang sesuai dengan kata kunci Anda.</p>' : ''}
        </div>
    `;

    window.scrollTo(0, 0);
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

function renderDescriptionPage() {
    // This is no longer used as a standalone page-load function
}

window.showDescription = function(news, avatarId) {
    const homeContent = document.getElementById('homeContent');
    const heroSection = document.getElementById('heroSection');
    const descriptionArea = document.getElementById('descriptionArea');
    const descriptionContent = document.getElementById('descriptionContent');
    const descriptionTrendingNews = document.getElementById('descriptionTrendingNews');

    if (!homeContent || !descriptionArea || !descriptionContent) return;

    // Hide home content elements
    homeContent.style.display = 'none';
    heroSection.style.display = 'none';
    
    // Show description area
    descriptionArea.style.display = 'block';

    // Hide extra sections as requested
    const tvSection = document.querySelector('.tv-section');
    const pollingSection = document.querySelector('.polling-section');
    const opiniSection = document.querySelector('.opini-section-horizontal');
    const latestSidebarSection = document.querySelector('.latest-sidebar-container');
    const categoryGridSection = document.querySelector('.category-grid-layout');

    if (tvSection) tvSection.style.display = 'none';
    if (pollingSection) pollingSection.style.display = 'none';
    if (opiniSection) opiniSection.style.display = 'none';
    if (latestSidebarSection) latestSidebarSection.style.display = 'none';
    if (categoryGridSection) categoryGridSection.style.display = 'none';

    // Populate description content
    descriptionContent.innerHTML = `
        <article class="article-detail">
            <header class="article-header">
                <h1 class="article-title">${news.title.toUpperCase()}</h1>
            </header>

            <div class="article-main-image-wrapper">
                <img src="${news.image}" alt="${news.title}" class="article-main-img">
                <div class="article-caption-row">
                    <p class="image-caption">Foto: Dok. Bernas - Dokumentasi Berita Nasional Indonesia Terkini.</p>
                    <span class="article-category-tag">${news.category.toUpperCase()}</span>
                </div>
            </div>

            <div class="article-meta-actions-bar">
                <div class="meta-left">
                    <span class="author-name">Oleh: <strong>${news.author}</strong></span>
                    <span class="meta-divider">|</span>
                    <span class="meta-date">${news.date}</span>
                </div>
                <div class="meta-right">
                    <button class="action-icon-btn" title="Sesuaikan Teks">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 0m10 0l-4 0M12 5l0 14"/></svg>
                    </button>
                    <button class="action-icon-btn" title="Komentar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    </button>
                    <button class="action-icon-btn" title="Dengarkan Berita">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
                    </button>
                </div>
            </div>

            <div class="article-body">
                <p class="article-lead">${news.excerpt}</p>
                
                <p>${generateLoremIpsum(50)}</p>
                
                <div class="article-pull-quote">
                    <blockquote>"${generateQuote()}"</blockquote>
                    <cite>- ${news.author}</cite>
                </div>

                <p>${generateLoremIpsum(60)}</p>

                <div class="article-mid-image">
                    <img src="${getPicsumImage(getRandomNumber(201, 300), 700, 400)}" alt="Additional Image">
                    <div class="article-caption-row">
                         <p class="image-caption">Ilustrasi berita terkait - ${news.title}.</p>
                    </div>
                </div>

                <p>${generateLoremIpsum(45)}</p>
                
                <h2>Ringkasan Peristiwa</h2>
                <ul>
                    <li>${generateLoremIpsum(10)}</li>
                    <li>${generateLoremIpsum(12)}</li>
                    <li>${generateLoremIpsum(15)}</li>
                </ul>

                <p>${generateLoremIpsum(70)}</p>
            </div>

            <footer class="article-footer">
                <div class="article-tags">
                    <span class="tag">#BERNAS</span>
                    <span class="tag">#${news.category.toUpperCase()}</span>
                    <span class="tag">#NASIONAL</span>
                    <span class="tag">#BREAKING</span>
                </div>
                <div class="article-share">
                    <span>Bagikan:</span>
                    <div class="share-icons">
                        <a href="#" class="share-icon fb"><svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                        <a href="#" class="share-icon tw"><svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                        <a href="#" class="share-icon wa"><svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
                    </div>
                </div>
            </footer>
        </article>
    `;

    // Populate Trending News in Description
    const trendNews = generateNewsArray(6);
    descriptionTrendingNews.innerHTML = trendNews.map((item, index) => `
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

    window.scrollTo(0, 0);
}

window.showHome = function() {
    const homeContent = document.getElementById('homeContent');
    const heroSection = document.getElementById('heroSection');
    const descriptionArea = document.getElementById('descriptionArea');
    
    if (!homeContent || !descriptionArea) return;

    homeContent.style.display = 'block';
    heroSection.style.display = 'grid';
    descriptionArea.style.display = 'none';

    // Show extra sections
    const tvSection = document.querySelector('.tv-section');
    const pollingSection = document.querySelector('.polling-section');
    const opiniSection = document.querySelector('.opini-section-horizontal');
    const latestSidebarSection = document.querySelector('.latest-sidebar-container');
    const categoryGridSection = document.querySelector('.category-grid-layout');

    if (tvSection) tvSection.style.display = 'block';
    if (pollingSection) pollingSection.style.display = 'block';
    if (opiniSection) opiniSection.style.display = 'block';
    if (latestSidebarSection) latestSidebarSection.style.display = 'flex'; // Use flex for this container
    if (categoryGridSection) categoryGridSection.style.display = 'block';

    window.scrollTo(0, 0);
}

// Initialize Application
function init() {
    // Populate allNews global state
    allNews = generateNewsArray(50);

    // Set current date
    setCurrentDate();
    
    // Search
    initSearch();
    
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
    renderLatestNewsV3();
    renderSidebarExtra();
    renderVotingSection();
    
    // Add event listener to logo to return home
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) searchInput.value = '';
            showHome();
        });
    });

    console.log('BERNAS - Berita Nasional initialized successfully!');
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
