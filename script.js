// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const offset = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            document.getElementById('navMenu').classList.remove('active');
        }
    });
});

// ===================================
// Mobile Nav
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) navMenu.classList.remove('active');
});

// ===================================
// Active Link
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
    const scrollY = window.scrollY;
    const navH = document.querySelector('.navbar').offsetHeight;
    sections.forEach(sec => {
        const top = sec.offsetTop - navH - 120;
        const bottom = top + sec.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            const id = sec.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', highlightNav, { passive: true });

// ===================================
// Navbar Shadow
// ===================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 80
        ? '0 6px 24px rgba(42,42,42,0.08)'
        : '0 2px 12px rgba(42,42,42,0.05)';
}, { passive: true });

// ===================================
// Fade-in
// ===================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); fadeObserver.unobserve(entry.target); }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.highlight-card, .service-category, .feature-card, .review-card, .gallery-item').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===================================
// Booking Form
// ===================================
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = new FormData(bookingForm).get('name');
        alert(`Thank you, ${name}! Your booking request has been received. We'll be in touch shortly to confirm.`);
        bookingForm.reset();
    });
}
