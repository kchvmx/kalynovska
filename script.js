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

// Initial check
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

// Mobile Menu Toggle (Бургер)
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Handling Dropdown click on Mobile devices
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Скасовуємо перехід, щоб просто відкрити список
            dropdownMenu.classList.toggle('open');
            
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = dropdownMenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        }
    });
}