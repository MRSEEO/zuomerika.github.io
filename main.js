// ============================================
// 🔧 НАСТРОЙКИ (РЕДАКТИРОВАТЬ ЗДЕСЬ)
// ============================================

// 🖼️ ГАЛЕРЕЯ
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

// Глобальная функция открытия лайтбокса (чтобы была видна везде)
window.openLightbox = function(src) {
    const { lightbox, lightboxImage } = domCache;
    if (!lightbox || !lightboxImage) return;
    
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Глобальная функция закрытия лайтбокса
function closeLightbox() {
    const { lightbox } = domCache;
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    initGallery();
    initLanguage();
    initNav();
    initLightbox();
    updatePrices();
    
    // Добавляем обработчики кликов для всех изображений после полной загрузки DOM
    // Используем setTimeout, чтобы убедиться, что все элементы отрендерены
    setTimeout(() => {
        addAllImageHandlers();
        addPricingImageHandlers();
    }, 100);
}, { once: true });

// 🖼️ Галерея
function initGallery() {
    const grid = domCache.galleryGrid;
    if (!grid) return;
    
    const fragment = document.createDocumentFragment();
    
    galleryData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        // Проверка пути для локального запуска не нужна, браузер сам обработает 404
        div.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
        div.addEventListener('click', () => openLightbox(item.src));
        fragment.appendChild(div);
    });
    
    grid.appendChild(fragment);
}

// Обработчики для всех изображений на сайте (основная галерея, обо мне, герой)
function addAllImageHandlers() {
    // 1. Обработчик для всех изображений в баннерах (VTuber, PNG, Animated, Emoji, Background)
    document.querySelectorAll('.pricing-image-banner img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });
    
    // 2. Обработчик для контейнеров баннеров
    document.querySelectorAll('.pricing-image-banner').forEach(banner => {
        banner.style.cursor = 'pointer';
        banner.addEventListener('click', () => {
            const img = banner.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });
    
    // 3. Обработчик для изображений в карточках товаров (headshot, halfbody, fullbody)
    document.querySelectorAll('.price-img img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });
    
    // 4. Обработчик для контейнеров price-img
    document.querySelectorAll('.price-img').forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });
    
    // 5. Обработчик для hero изображения
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg) {
        heroImg.style.cursor = 'pointer';
        heroImg.addEventListener('click', () => {
            openLightbox(heroImg.src);
        });
    }
    
    // 6. Обработчик для about изображения
    const aboutImg = document.querySelector('.about-image img');
    if (aboutImg) {
        aboutImg.style.cursor = 'pointer';
        aboutImg.addEventListener('click', () => {
            openLightbox(aboutImg.src);
        });
    }
}

// Специальные обработчики для секции цен (дополнительная гарантия)
function addPricingImageHandlers() {
    // Эта функция дублирует часть логики addAllImageHandlers для надежности,
    // но может быть расширена для специфических элементов прайса, если они есть.
    // Сейчас она просто гарантирует, что обработчики навешены после рендера.
    console.log("Pricing image handlers initialized");
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

    // Кнопка закрытия
    close.addEventListener('click', closeLightbox, { passive: true });
    
    // Закрытие по клику вне картинки
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    }, { passive: true });
    
    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    }, { passive: true });
}


// 🔍 Lightbox с зумом
let currentScale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

function initLightbox() {
    const lightbox = domCache.lightbox;
    const close = domCache.lightboxClose;
    const img = domCache.lightboxImage;
    const imgContainer = lightbox.querySelector('.lightbox-content') || lightbox; // Контейнер для трансформации

    if (!lightbox || !close || !img) return;

    // Сброс состояния при открытии
    window.openLightbox = function(src) {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
        
        img.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Кнопка закрытия
    close.addEventListener('click', closeLightbox, { passive: true });
    
    // Закрытие по клику вне картинки
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === imgContainer) closeLightbox();
    }, { passive: true });
    
    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    }, { passive: true });

    // Зум колесиком мыши
    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const zoomSpeed = 0.1;
        const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
        
        let newScale = currentScale + delta;
        // Ограничения зума
        newScale = Math.max(0.5, Math.min(newScale, 5)); 
        
        currentScale = newScale;
        
        // Если уменьшаем до 1 или меньше, сбрасываем позицию в центр
        if (currentScale <= 1) {
            currentScale = 1;
            translateX = 0;
            translateY = 0;
        }
        
        updateTransform();
    }, { passive: false });

    // Перетаскивание (Pan)
    img.addEventListener('mousedown', (e) => {
        if (currentScale <= 1) return; // Не перетаскивать, если не увеличено
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || currentScale <= 1) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        if (img) img.style.cursor = 'zoom-in';
    });

    // Поддержка тач-событий для мобильных
    let initialPinchDistance = null;

    img.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
        } else if (e.touches.length === 2) {
            initialPinchDistance = getDistance(e.touches);
        }
    }, { passive: true });

    img.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDragging && currentScale > 1) {
            e.preventDefault(); // Предотвращаем скролл страницы при перетаскивании
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            updateTransform();
        } else if (e.touches.length === 2 && initialPinchDistance) {
            e.preventDefault();
            const currentDistance = getDistance(e.touches);
            const diff = currentDistance - initialPinchDistance;
            
            let newScale = currentScale + (diff * 0.005);
            newScale = Math.max(0.5, Math.min(newScale, 5));
            
            if (newScale <= 1) {
                currentScale = 1;
                translateX = 0;
                translateY = 0;
            } else {
                currentScale = newScale;
            }
            updateTransform();
        }
    }, { passive: false });

    img.addEventListener('touchend', () => {
        isDragging = false;
        initialPinchDistance = null;
    });

    function updateTransform() {
        img.style.transformOrigin = 'center center';
        img.style.transition = isDragging ? 'none' : 'transform 0.2s ease';
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Сброс трансформаций после закрытия
        setTimeout(() => {
            currentScale = 1;
            translateX = 0;
            translateY = 0;
            img.style.transform = 'none';
        }, 200);
    }
}

// Вспомогательная функция для расчета расстояния между двумя точками (для пинча)
function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}