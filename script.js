// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 0';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        nav.style.padding = '20px 0';
        nav.style.boxShadow = 'none';
    }
});

/** 
 * МОБІЛЬНЕ МЕНЮ ТА DROPDOWN 
 */
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

// 1. Відкриття/Закриття бургера
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// 2. Обробка кліку на "Послуги" (Dropdown)
if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Запобігаємо переходу по посиланню
            e.stopPropagation(); // ВАЖЛИВО: зупиняємо спливання, щоб меню не закрилося
            
            dropdownMenu.classList.toggle('open');
            
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = dropdownMenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        }
    });
}

// 3. Закриття меню при кліку на звичайні посилання (крім випадаючого списку)
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
        // Якщо це НЕ кнопка розкриття списку — закриваємо меню
        if (!link.classList.contains('dropdown-toggle')) {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        }
    });
});

// 4. Закриття меню при кліку поза його межами (на оверлей/екран)
document.addEventListener('click', (e) => {
    const isClickInsideMenu = navLinks.contains(e.target);
    const isClickOnBurger = mobileMenuBtn.contains(e.target);

    if (!isClickInsideMenu && !isClickOnBurger && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Функція для закриття меню
function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    // Скидаємо стан випадаючого списку при закритті
    if (dropdownMenu) dropdownMenu.classList.remove('open');
    const arrow = dropdownToggle ? dropdownToggle.querySelector('.arrow') : null;
    if (arrow) arrow.style.transform = 'rotate(0deg)';
}