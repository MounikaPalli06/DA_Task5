// ========================================
// MOUNIKA PALLI - DATA ANALYST PORTFOLIO
// JavaScript Interactivity & Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollToTop();
    initializeAnimations();
    initializeFormValidation();
});

// ========================================
// NAVIGATION ACTIVE STATES
// ========================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'inline-flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// ANIMATIONS ON SCROLL
// ========================================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.project-card, .skill-category, .stat-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ========================================
// SKILL BAR ANIMATIONS
// ========================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const width = skillFill.style.width;

                skillFill.style.width = '0';
                setTimeout(() => {
                    skillFill.style.transition = 'width 1s ease-out';
                    skillFill.style.width = width;
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Call after page load
window.addEventListener('load', animateSkillBars);

// ========================================
// FORM VALIDATION (if contact form exists)
// ========================================

function initializeFormValidation() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form fields
            const email = this.querySelector('[name="email"]');
            const message = this.querySelector('[name="message"]');

            if (!email.value.includes('@')) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            if (message.value.length < 10) {
                showNotification('Message must be at least 10 characters', 'error');
                return;
            }

            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            this.reset();
        });
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        z-index: 1000;
        max-width: 300px;
    }

    .notification-success {
        background: #10b981;
        color: white;
    }

    .notification-error {
        background: #ef4444;
        color: white;
    }

    .notification-warning {
        background: #f59e0b;
        color: white;
    }

    @media (max-width: 640px) {
        .notification {
            left: 10px;
            right: 10px;
            max-width: none;
        }
    }
`;

document.head.appendChild(style);

// ========================================
// PARALLAX SCROLLING EFFECT
// ========================================

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            const parallaxFactor = parseFloat(element.getAttribute('data-parallax'));

            element.style.transform = `translateY(${distance * parallaxFactor}px)`;
        });
    });
}

// ========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ========================================

function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.textContent;
        element.textContent = 'Copied!';

        setTimeout(() => {
            element.textContent = originalText;
        }, 2000);
    });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-lazy]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-lazy');
                img.removeAttribute('data-lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

window.addEventListener('load', initializeLazyLoading);

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// PAGE LOAD PERFORMANCE
// ========================================

window.addEventListener('load', () => {
    console.log('Portfolio page loaded successfully');
    
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ========================================
// DARK MODE TOGGLE (Optional)
// ========================================

function initializeDarkMode() {
    const darkModeToggle = document.querySelector('[data-dark-mode-toggle]');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Check saved preference
        if (localStorage.getItem('darkMode') === 'true' || prefersDark) {
            document.body.classList.add('dark-mode');
        }
    }
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🎓 Welcome to Mounika Palli\'s Data Analyst Portfolio', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cExplore my data analytics projects and technical skills!', 'color: #764ba2; font-size: 14px;');
console.log('%cGitHub: https://github.com/MounikaPalli06', 'color: #1f2937;');
console.log('%cLinkedIn: https://www.linkedin.com/in/mounika-palli-377314332/', 'color: #1f2937;');
