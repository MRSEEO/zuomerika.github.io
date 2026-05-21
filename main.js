// ============================================
// 🔧 НАСТРОЙКИ (РЕДАКТИРОВАТЬ ЗДЕСЬ)
// ============================================

// 🖼️ ГАЛЕРЕЯ (теперь каждый слайд ведёт к категории)
const galleryData = [
    { src: "images/sketch-head.jpg", category: "Sketches", target: "#sketches" },
    { src: "images/line-head.png", category: "Clean Lineart", target: "#lineart" },
    { src: "images/render-head.jpg", category: "Fully Rendered", target: "#rendered" },
    { src: "images/vtuber-banner.jpg", category: "VTuber Models", target: "#vtuber" },
    { src: "images/png-models.png", category: "PNG Models", target: "#png" },
    { src: "images/animated-png.gif", category: "Animated PNG", target: "#apng" },
    { src: "images/png-emoji.gif", category: "Emoji", target: "#emoji" },
    { src: "images/animated-bg.gif", category: "Animated Background", target: "#animated-bg" }
];

// 🌐 ПЕРЕВОДЫ (убран знак $ из английских текстов, чтобы не дублировался)
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
        pricing_title: "Цены",
        pricing_notice: "* Цены указаны от минимальной. Итоговая стоимость зависит от сложности запроса.",
        nsfw_notice: "NSFW — x2 к стоимости",
        headshot: "Headshot",
        halfbody: "Halfbody",
        fullbody: "Fullbody",
        bg_simple: "Simple Background — Free",
        bg_complex: "Complex Background +10",
        bg_complex_line: "Complex Background +20",
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
        payment_text_prefix: "Я принимаю оплату через ",
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
        pricing_title: "Pricing",
        pricing_notice: "* Prices are starting from shown. Final cost depends on complexity of your request.",
        nsfw_notice: "NSFW — x2 to pricing",
        headshot: "Headshot",
        halfbody: "Halfbody",
        fullbody: "Fullbody",
        bg_simple: "Simple Background — Free",
        bg_complex: "Complex Background +10",
        bg_complex_line: "Complex Background +20",
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
        payment_text_prefix: "I take payment via ",
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
let sliderState = {
    currentIndex: 0
    // isDragging, startX и т.д. удалены — они не нужны
};

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
        lightboxImage: document.getElementById('lightboxImage'),
        scrollBtn: document.getElementById('scrollToTop')
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

// Глобальная функция для кнопок слайдера в товарах
window.moveSlide = function(btn, direction) {
    const track = btn.parentElement.querySelector('.slider-track');
    if (!track) return;
    
    const slideWidth = track.querySelector('.slide-item').offsetWidth;
    const scrollAmount = slideWidth * direction;
    
    track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
};

document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    initGallerySlider();          // переписан
    initProductSliders();         // переписан (убраны драг и колёсико)
    initLanguage();
    initNav();
    initLightbox();
    initScrollToTop();
    updatePrices();
    setupImageClickHandlers();
}, { once: true });

// 🖼️ ГАЛЕРЕЯ-СЛАЙДЕР (ТОЛЬКО КНОПКИ, КЛИК ПО КАРТИНКЕ → ПЕРЕХОД)
function initGallerySlider() {
    const track = domCache.galleryTrack;
    const container = domCache.galleryContainer;
    const prevBtn = domCache.prevBtn;
    const nextBtn = domCache.nextBtn;

    if (!track || !container) return;

    // Рендер слайдов
    const fragment = document.createDocumentFragment();
    galleryData.forEach((item) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `
            <div class="slide-content">
                <img src="${item.src}" alt="${item.category}" loading="lazy">
                <div class="slide-label">${item.category}</div>
            </div>
        `;

        // Клик по всему слайду — переход к категории (лайтбокс отключён)
        slide.addEventListener('click', () => {
            const target = document.querySelector(item.target);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        fragment.appendChild(slide);
    });
    track.appendChild(fragment);

    // Функция обновления позиции
    const updateSliderPosition = (animate = true) => {
        const slides = track.querySelectorAll('.gallery-slide');
        if (slides.length === 0) return;
        
        const slideWidth = slides[0].offsetWidth;
        const gap = 20; 
        const newTranslateX = -sliderState.currentIndex * (slideWidth + gap);
        
        if (animate) {
            track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(${newTranslateX}px)`;

        // Видимость кнопок
        if (prevBtn) {
            prevBtn.classList.toggle('hidden', sliderState.currentIndex === 0);
        }
        if (nextBtn) {
            nextBtn.classList.toggle('hidden', sliderState.currentIndex === slides.length - 1);
        }
    };

    // Навигация кнопками
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (sliderState.currentIndex > 0) {
                sliderState.currentIndex--;
                updateSliderPosition();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = galleryData.length - 1;
            if (sliderState.currentIndex < maxIndex) {
                sliderState.currentIndex++;
                updateSliderPosition();
            }
        });
    }

    window.addEventListener('resize', () => updateSliderPosition(false));
    setTimeout(() => updateSliderPosition(false), 50);
}

// 📦 СЛАЙДЕРЫ ТОВАРОВ (только кнопки)
function initProductSliders() {
    const sliders = document.querySelectorAll('.showcase-slider');
    
    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        if (!track) return;

        const slides = track.querySelectorAll('.slide-item');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        if (slides.length <= 1) {
            if (prevBtn) prevBtn.classList.add('hidden');
            if (nextBtn) nextBtn.classList.add('hidden');
        }

        // 👉 ДРАГ И КОЛЁСИКО УДАЛЕНЫ
        // Оставлены только кнопки prev/next
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
            });
        }

        // Клик по картинке — лайтбокс
        track.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(img.src);
            });
            img.style.cursor = 'pointer';
        });
    });
}

// Обработчики изображений
function setupImageClickHandlers() {
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
    
    document.querySelectorAll('.price-img img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });
    
    document.querySelectorAll('.price-img').forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            if (img) openLightbox(img.src);
        });
    });
    
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

// 🔥 ЗДЕСЬ ОСНОВНОЕ ИЗМЕНЕНИЕ: ДОБАВЛЕНЫ ЗНАКИ ВАЛЮТ
function updatePrices() {
    domCache.priceElements.forEach(el => {
        const priceRu = el.dataset.priceRu;
        const priceEn = el.dataset.priceEn;
        let price = currentLang === 'ru' ? priceRu : priceEn;
        if (price) {
            const currencySymbol = currentLang === 'ru' ? '₽ ' : '$ ';
            el.textContent = currencySymbol + price;
        }
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

    img.addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
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

// ⬆️ Кнопка "Наверх"
function initScrollToTop() {
    const btn = domCache.scrollBtn;
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}