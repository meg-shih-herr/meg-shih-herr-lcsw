// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navContainer = document.querySelector('.nav-container');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Also close mobile menu when clicking any Schedule Consultation button in nav-cta
    document.querySelectorAll('.nav-cta .btn-primary').forEach(scheduleBtn => {
        scheduleBtn.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .contact-card, .about-text, .intro-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form functionality
    const consultationForm = document.getElementById('consultation-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = consultationForm?.querySelector('.form-submit');
    const buttonText = submitButton?.querySelector('.button-text');
    const loadingSpinner = submitButton?.querySelector('.loading-spinner');

    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Show loading state
            if (submitButton && buttonText && loadingSpinner) {
                submitButton.disabled = true;
                buttonText.style.display = 'none';
                loadingSpinner.style.display = 'inline';
            }

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    formStatus.textContent = 'Thank you! Your consultation request has been sent. I will contact you within 24-48 hours.';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    consultationForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                formStatus.textContent = 'Sorry, there was an error sending your request. Please try again or contact me directly via phone or email.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
            } finally {
                // Reset button state
                if (submitButton && buttonText && loadingSpinner) {
                    submitButton.disabled = false;
                    buttonText.style.display = 'inline';
                    loadingSpinner.style.display = 'none';
                }
            }
        });
    }

    // Accessibility: Focus management for dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const content = dropdown.querySelector('.dropdown-content');

        // Keyboard navigation
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                content.style.opacity = content.style.opacity === '1' ? '0' : '1';
                content.style.visibility = content.style.visibility === 'visible' ? 'hidden' : 'visible';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
            }
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical images
    const criticalImages = [
        'images/hero-nature.jpg',
        'images/megan-professional.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Performance: Debounce scroll events
    let scrollTimeout;
    function debounceScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Add any scroll-based functionality here
        }, 10);
    }

    window.addEventListener('scroll', debounceScroll);

    // Error handling for missing elements
    function safeQuerySelector(selector, callback) {
        const element = document.querySelector(selector);
        if (element && callback) {
            callback(element);
        }
    }

    // Initialize AOS (Animate On Scroll) alternative
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => {
            observer.observe(el);
        });
    }

    initScrollAnimations();

    // Console message for developers
    console.log('🌿 Megan Shih LCSW Website Loaded Successfully');
    console.log('💚 Trauma-informed therapy for authentic healing');
});

// Additional CSS for JavaScript interactions
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-container.scrolled {
        background-color: rgba(254, 252, 243, 0.98);
        backdrop-filter: blur(15px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .menu-open {
        overflow: hidden;
    }

    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--white);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            padding: 20px 0;
        }

        .nav-menu.active .nav-list {
            flex-direction: column;
            gap: 20px;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .dropdown-content {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background: var(--light-gray);
            margin: 10px 20px;
            border-radius: 8px;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);