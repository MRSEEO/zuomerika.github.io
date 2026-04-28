// ============================================
// 🔧 НАСТРОЙКИ (РЕДАКТИРОВАТЬ ЗДЕСЬ)
// ============================================

// 🖼️ ГАЛЕРЕЯ (СЛАЙДЕР)
const galleryData = [
    { src: "images/hero.jpg", title: "Hero Art" },
    { src: "images/about.jpg", title: "About Art" },
    { src: "images/sketch-full.jpg", title: "Sketch Work" },
    { src: "images/render-full.jpg", title: "Rendered Work" }
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
        gallery_subtitle: "Листайте работы",
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
        gallery_subtitle: "Swipe to view works",
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
let domCache = {};

function cacheDOM() {
    domCache = {
        navMenu: document.getElementById('navMenu'),
        mobileToggle: document.getElementById('mobileToggle'),
        langBtns: document.querySelectorAll('.lang-btn'),
        i18nElements: document.querySelectorAll('[data-i18n]'),
        priceElements: document.querySelectorAll('.price-amount'),
        galleryTrack: document.getElementById('galleryTrack'),
        galleryContainer: document.getElementById('galleryContainer'),
        prevBtn: document.getElementById('galleryPrev'),
        nextBtn: document.getElementById('galleryNext'),
        lightbox: document.getElementById('lightbox'),
        lightboxClose: document.getElementById('lightboxClose'),
        lightboxImage: document.getElementById('lightboxImage')
    };
}

// Глобальная функция открытия лайтбокса
window.openLightbox = function(src) {
    const { lightbox, lightboxImage } = domCache;
    if (!lightbox || !lightboxImage) return;
    
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeLightbox() {
    const { lightbox } = domCache;
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    initGallerySlider();
    initProductSliders(); // Инициализация слайдеров для товаров (VTuber и др.)
    initLanguage();
    initNav();
    initLightbox();
    updatePrices();
    
    setTimeout(() => {
        addAllImageHandlers();
        addPricingImageHandlers();
    }, 100);
}, { once: true });

// 🖼️ ГАЛЕРЕЯ-СЛАЙДЕР (ГЛАВНАЯ)
function initGallerySlider() {
    const track = domCache.galleryTrack;
    const container = domCache.galleryContainer;
    const prevBtn = domCache.prevBtn;
    const nextBtn = domCache.nextBtn;

    if (!track || !container) return;

    // Рендер слайдов
    const fragment = document.createDocumentFragment();
    galleryData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `
            <div class="slide-content">
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="slide-title">${item.title}</div>
            </div>
        `;
        slide.querySelector('img').addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(item.src);
        });
        slide.addEventListener('click', () => openLightbox(item.src));
        fragment.appendChild(slide);
    });
    track.appendChild(fragment);

    setupSliderLogic(container, track, prevBtn, nextBtn);
}

// 🛍️ СЛАЙДЕРЫ ДЛЯ ТОВАРОВ (VTuber, PNG и т.д.)
function initProductSliders() {
    // Находим все контейнеры товаров, где есть галерея
    const showcases = document.querySelectorAll('.product-showcase');
    
    showcases.forEach(showcase => {
        const track = showcase.querySelector('.slider-track');
        const prevBtn = showcase.querySelector('.slider-prev');
        const nextBtn = showcase.querySelector('.slider-next');
        
        if (track && (prevBtn || nextBtn)) {
            setupSliderLogic(track.parentElement || showcase, track, prevBtn, nextBtn);
            
            // Добавляем обработчики кликов для картинок внутри слайдера товара
            track.querySelectorAll('img').forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightbox(img.src);
                });
            });
        }
    });
}

// Общая логика слайдера (кнопки + свайп)
function setupSliderLogic(container, track, prevBtn, nextBtn) {
    let isDragging = false;
    let startPos = 0;
    let scrollLeft = 0;
    let animationFrameId;

    const getSlideWidth = () => {
        const slide = track.querySelector('.slide-item, .gallery-slide, img');
        return slide ? slide.clientWidth + 20 : 300; // 20px отступ
    };

    const scrollBySlide = (direction) => {
        const slideWidth = getSlideWidth();
        const scrollAmount = slideWidth * direction;
        
        track.scrollTo({
            left: track.scrollLeft + scrollAmount,
            behavior: 'smooth'
        });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => scrollBySlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollBySlide(1));

    // События мыши/тача для свайпа
    const startDrag = (e) => {
        isDragging = true;
        startPos = e.pageX || e.touches[0].pageX;
        scrollLeft = track.scrollLeft;
        track.style.cursor = 'grabbing';
        track.style.scrollBehavior = 'auto'; // Отключаем плавность для драга
    };

    const endDrag = () => {
        isDragging = false;
        track.style.cursor = 'grab';
        track.style.scrollBehavior = 'smooth';
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startPos) * 2;
        track.scrollLeft = scrollLeft - walk;
    };

    // Mouse events
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mouseleave', endDrag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mousemove', moveDrag);

    // Touch events
    container.addEventListener('touchstart', startDrag, { passive: true });
    container.addEventListener('touchend', endDrag);
    container.addEventListener('touchmove', moveDrag, { passive: false });
}

// Обработчики для всех изображений на сайте
function addAllImageHandlers() {
    // Баннеры прайса
    document.querySelectorAll('.pricing-image-banner img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });
    
    document.querySelectorAll('.pricing-image-banner').forEach(banner => {
        banner.style.cursor = 'pointer';
        banner.addEventListener('click', () => {
            const img = banner.querySelector('img');
            if (img) openLightbox(img.src);
        });
    });
    
    // Карточки товаров (если не в слайдере)
    document.querySelectorAll('.price-img img').forEach(img => {
        if (!img.closest('.slider-track')) { // Пропускаем те, что уже в слайдере
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(img.src);
            });
        }
    });
    
    document.querySelectorAll('.price-img').forEach(container => {
        if (!container.querySelector('.slider-track')) {
            container.style.cursor = 'pointer';
            container.addEventListener('click', () => {
                const img = container.querySelector('img');
                if (img) openLightbox(img.src);
            });
        }
    });
    
    // Hero и About
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg) {
        heroImg.style.cursor = 'pointer';
        heroImg.addEventListener('click', () => openLightbox(heroImg.src));
    }
    
    const aboutImg = document.querySelector('.about-image img');
    if (aboutImg) {
        aboutImg.style.cursor = 'pointer';
        aboutImg.addEventListener('click', () => openLightbox(aboutImg.src));
    }
}

function addPricingImageHandlers() {
    console.log("Pricing handlers ready");
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
        if (price) el.textContent = price;
    });
}

// 🧭 Навигация
function initNav() {
    const menu = domCache.navMenu;
    const toggle = domCache.mobileToggle;
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => menu.classList.toggle('active'));
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('active'));
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// 🔍 Lightbox
function initLightbox() {
    const lightbox = domCache.lightbox;
    const close = domCache.lightboxClose;
    const img = domCache.lightboxImage;

    if (!lightbox || !close || !img) return;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX, startY;

    const resetTransform = () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        img.style.cursor = 'zoom-in';
    };

    // Зум колесиком
    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        const newScale = Math.min(Math.max(1, scale + delta), 5);
        
        if (newScale > 1) {
            scale = newScale;
            img.style.cursor = 'grab';
        } else {
            scale = 1;
            translateX = 0;
            translateY = 0;
            img.style.cursor = 'zoom-in';
        }
        
        img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }, { passive: false });

    // Перетаскивание увеличенного изображения
    img.addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
        e.stopPropagation(); // Чтобы не срабатывал клик по лайтбоксу
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging || scale <= 1) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        if (scale > 1) img.style.cursor = 'grab';
    });

    close.addEventListener('click', () => {
        resetTransform();
        closeLightbox();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            resetTransform();
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resetTransform();
            closeLightbox();
        }
    });
}