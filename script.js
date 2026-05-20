// ===== CONFIGURATION =====
// Professional WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = "2250546655717";

// Default WhatsApp message
const DEFAULT_MESSAGE = "Hello! I'm interested in your premium wellness and beauty products. Can you help me?";

// ===== DOM ELEMENTS =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

// ===== WHATSAPP LINK SETUP =====
function setupWhatsAppLinks() {
    const whatsappBaseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    const whatsappUrlWithMessage = `${whatsappBaseUrl}?text=${encodedMessage}`;

    // Dynamic setup for all buy buttons in product cards
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(btn => {
        const productCard = btn.closest('.product-card');
        const productName = productCard ? productCard.querySelector('h4').textContent : 'wellness product';
        const productMessage = encodeURIComponent(`Hello! I'm interested in ordering: ${productName}. Can you help me with this?`);
        btn.href = `${whatsappBaseUrl}?text=${productMessage}`;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
    });

    // General WhatsApp button IDs for general consultation/deals
    const generalWhatsappBtnIds = [
        'whatsappBtn',
        'whatsappBtn2',
        'whatsappBtn3',
        'whatsappBtnMain',
        'whatsappSocial',
        'whatsappFloat'
    ];

    generalWhatsappBtnIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.href = whatsappUrlWithMessage;
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
        }
    });
}

// ===== MOBILE NAVIGATION =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile navigation menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== PRODUCT FILTERING =====
function filterProducts(filterType) {
    productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterType === 'all' || category === filterType) {
            card.style.display = 'block';
            // Smooth fade-in animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
}

function handleFilterClick(e) {
    const btn = e.target;
    const filter = btn.getAttribute('data-filter');
    
    // Update active states
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Perform filter
    filterProducts(filter);
}

// ===== SMOOTH SCROLL =====
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Offsets for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu();
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
    const animatableElements = document.querySelectorAll('.about-card, .product-card, .testimonial-card, .section-header');
    
    animatableElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 80;
        
        if (isVisible) {
            el.classList.add('animate-in');
        }
    });
}

// ===== ANIMATE ELEMENTS ON LOAD =====
function animateOnLoad() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(25px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 150);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            heroImage.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }, 300);
    }
}

// ===== INITIALIZATION =====
function init() {
    // Setup high-converting WhatsApp links
    setupWhatsAppLinks();
    
    // Mobile navigation toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Fixed navbar scroll event
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Product tab selection filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Smooth scrolling link behaviors
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Scroll reveal animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial page animations
    animateOnLoad();
    handleScrollAnimations();
    
    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Run init when DOM structure is ready
document.addEventListener('DOMContentLoaded', init);