
// ============================================
// 🔧 НАСТРОЙКИ (РЕДАКТИРОВАТЬ ЗДЕСЬ)
// ============================================

// 🖼️ ГАЛЕРЕЯ
const galleryData = [
    { src: "images/gallery1.jpg", title: "Work 1" },
    { src: "images/gallery2.jpg", title: "Work 2" },
    { src: "images/gallery3.jpg", title: "Work 3" },
    { src: "images/gallery4.jpg", title: "Work 4" }
];

// 🌐 ПЕРЕВОДЫ
const translations = {
    ru: {
        nav_about: "Обо мне",
        nav_gallery: "Работы",
        nav_pricing: "Цены",
        nav_contact: "Контакты",
        hero_subtitle: "Digital Artist & Illustrator",
        about_title: "Обо мне",
        about_text: "Я создаю иллюстрации в аниме-стиле. Люблю работать с персонажами, создавать тёплые и атмосферные работы. Принимаю заказы на портреты, арты для игр, VTuber-модели и личные проекты.",
        gallery_title: "Мои работы",
        gallery_subtitle: "Подборка работ",
        pricing_title: "Цены",
        pricing_notice: "* Цены указаны от минимальной. Итоговая стоимость зависит от сложности запроса.",
        nsfw_notice: "NSFW — x2 к стоимости",
        headshot: "Headshot",
        halfbody: "Halfbody",
        fullbody: "Fullbody",
        bg_simple: "Simple Background — Free",
        bg_complex: "Complex Background +$10",
        bg_complex_line: "Complex Background +$20",
        vtuber_half: "Halfbody",
        vtuber_full: "Fullbody",
        vtuber_chibi: "Chibi",
        vtuber_mascot: "Mascot",
        vtuber_assets: "Assets",
        png_half: "Halfbody",
        png_full: "Fullbody",
        apng_half: "Halfbody",
        apng_full: "Fullbody",
        emoji_png: "PNG Emoji",
        emoji_frame: "Frame by Frame",
        anim_bg_detailed: "Detailed Background",
        anim_bg_simple: "Simple Background",
        anim_head: "Animated Headshot +",
        anim_half: "Animated Halfbody +",
        anim_full: "Animated Fullbody +",
        ask: "Ask",
        payment_title: "Payment",
        payment_text: "I take payment via ",
        payment_plans: "Payment plans are okay!",
        contact_title: "Контакты",
        footer_copyright: "© 2026 Zuomerika. All rights reserved"
    },
    en: {
        nav_about: "About",
        nav_gallery: "Works",
        nav_pricing: "Pricing",
        nav_contact: "Contact",
        hero_subtitle: "Digital Artist & Illustrator",
        about_title: "About Me",
        about_text: "I create illustrations in anime style. I love working with characters, creating warm and atmospheric artworks. Accepting orders for portraits, game art, VTuber models and personal projects.",
        gallery_title: "My Works",
        gallery_subtitle: "A selection of artworks",
        pricing_title: "Pricing",
        pricing_notice: "* Prices are starting from shown. Final cost depends on complexity of your request.",
        nsfw_notice: "NSFW — x2 to pricing",
        headshot: "Headshot",
        halfbody: "Halfbody",
        fullbody: "Fullbody",
        bg_simple: "Simple Background — Free",
        bg_complex: "Complex Background +$10",
        bg_complex_line: "Complex Background +$20",
        vtuber_half: "Halfbody",
        vtuber_full: "Fullbody",
        vtuber_chibi: "Chibi",
        vtuber_mascot: "Mascot",
        vtuber_assets: "Assets",
        png_half: "Halfbody",
        png_full: "Fullbody",
        apng_half: "Halfbody",
        apng_full: "Fullbody",
        emoji_png: "PNG Emoji",
        emoji_frame: "Frame by Frame",
        anim_bg_detailed: "Detailed Background",
        anim_bg_simple: "Simple Background",
        anim_head: "Animated Headshot +",
        anim_half: "Animated Halfbody +",
        anim_full: "Animated Fullbody +",
        ask: "Ask",
        payment_title: "Payment",
        payment_text: "I take payment via ",
        payment_plans: "Payment plans are okay!",
        contact_title: "Contact",
        footer_copyright: "© 2026 Zuomerika. All rights reserved"
    }
};

// ============================================
// ⚙️ ЛОГИКА
// ============================================

let currentLang = 'ru';

// Кэширование DOM элементов
let domCache = {};

function cacheDOM() {
    domCache = {
        navMenu: document.getElementById('navMenu'),
        mobileToggle: document.getElementById('mobileToggle'),
        langBtns: document.querySelectorAll('.lang-btn'),
        i18nElements: document.querySelectorAll('[data-i18n]'),
        priceElements: document.querySelectorAll('.price-amount'),
        galleryGrid: document.getElementById('galleryGrid'),
        lightbox: document.getElementById('lightbox'),
        lightboxClose: document.getElementById('lightboxClose'),
        lightboxImage: document.getElementById('lightboxImage')
    };
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    initGallery();
    initLanguage();
    initNav();
    initLightbox();
    updatePrices();
}, { once: true });

// 🖼️ Галерея
function initGallery() {
    const grid = domCache.galleryGrid;
    if (!grid) return;
    
    const fragment = document.createDocumentFragment();
    
    galleryData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
        div.addEventListener('click', () => openLightbox(item.src));
        fragment.appendChild(div);
    });
    
    grid.appendChild(fragment);
    
    // Добавляем обработчики кликов для всех изображений в секции цен
    addPricingImageHandlers();
}

// Обработчики для изображений в прайсинге
function addPricingImageHandlers() {
    // Обработчик для всех изображений в баннерах
    document.querySelectorAll('.pricing-image-banner img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });
    
    // Обработчик для контейнеров баннеров (если клик по контейнеру)
    document.querySelectorAll('.pricing-image-banner').forEach(banner => {
        banner.style.cursor = 'pointer';
        banner.addEventListener('click', () => {
            const img = banner.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });
    
    // Обработчик для изображений в карточках товаров (headshot, halfbody, fullbody)
    document.querySelectorAll('.price-img img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });
    
    // Обработчик для контейнеров price-img
    document.querySelectorAll('.price-img').forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });
}

// 🌐 Язык
function initLanguage() {
    domCache.langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            domCache.langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage();
            updatePrices();
        });
    });
}

function updateLanguage() {
    domCache.i18nElements.forEach(el => {
        const key = el.dataset.i18n;
        if (translations[currentLang]?.[key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    document.documentElement.lang = currentLang;
}

function updatePrices() {
    domCache.priceElements.forEach(el => {
        const priceRu = el.dataset.priceRu;
        const priceEn = el.dataset.priceEn;
        const price = currentLang === 'ru' ? priceRu : priceEn;
        if (price) {
            el.textContent = price;
        }
    });
}

// 🧭 Навигация
function initNav() {
    const menu = domCache.navMenu;
    const toggle = domCache.mobileToggle;

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    }, { passive: true });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        }, { passive: true });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, { passive: false });
    });
}

// 🔍 Lightbox
function initLightbox() {
    const lightbox = domCache.lightbox;
    const close = domCache.lightboxClose;
    const img = domCache.lightboxImage;

    if (!lightbox || !close || !img) return;

    window.openLightbox = (src) => {
        img.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    close.addEventListener('click', closeLightbox, { passive: true });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    }, { passive: true });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    }, { passive: true });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}