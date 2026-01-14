// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // 1. LOADING ANIMATION
    // ======================
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initializeAllEffects();
        }, 500);
    }, 2000);

    // ======================
    // 2. CUSTOM CURSOR SYSTEM
    // ======================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Mouse tracking with smoothing
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX - 10}px`;
        cursor.style.top = `${mouseY - 10}px`;
        
        // Interactive elements effect
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-node');
        hoverElements.forEach(el => {
            if (el.matches(':hover')) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--accent)';
                cursorFollower.style.transform = 'scale(1.2)';
                cursorFollower.style.background = 'rgba(0, 212, 255, 0.2)';
            }
        });
    });

    // Smooth follower animation
    function animateCursor() {
        followerX += (mouseX - followerX - 30) * 0.1;
        followerY += (mouseY - followerY - 30) * 0.1;
        
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ======================
    // 3. NAVIGATION INDICATOR
    // ======================
    const navIndicator = document.getElementById('navIndicator');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateNavIndicator() {
        const currentSection = getCurrentSection();
        const currentLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
        
        if (currentLink) {
            const { offsetLeft, offsetWidth } = currentLink;
            navIndicator.style.left = `${offsetLeft}px`;
            navIndicator.style.width = `${offsetWidth}px`;
        }
    }

    function getCurrentSection() {
        const sections = ['home', 'about', 'projects', 'skills', 'contact'];
        let current = 'home';
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    current = section;
                }
            }
        });
        
        return current;
    }

    // ======================
    // 4. FLOATING DATA PARTICLES
    // ======================
    const floatingData = document.getElementById('floatingData');
    const dataPoints = ['001010', '110011', '101101', '010110', '111000'];
    
    function createDataParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.textContent = dataPoints[Math.floor(Math.random() * dataPoints.length)];
            
            const size = Math.random() * 20 + 10;
            particle.style.fontSize = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
            
            floatingData.appendChild(particle);
        }
    }

    // ======================
    // 5. ANIMATED COUNTERS
    // ======================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-value[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const suffix = counter.textContent.includes('%') ? '%' : 
                          counter.textContent.includes('+') ? '+' : '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    }

    // ======================
    // 6. PROJECT CARD 3D EFFECT
    // ======================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            
            // Add shine effect
            const shine = document.createElement('div');
            shine.style.position = 'absolute';
            shine.style.top = `${y}px`;
            shine.style.left = `${x}px`;
            shine.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
            shine.style.width = '100px';
            shine.style.height = '100px';
            shine.style.pointerEvents = 'none';
            shine.style.transform = 'translate(-50%, -50%)';
            shine.style.zIndex = '1';
            
            card.appendChild(shine);
            
            setTimeout(() => {
                shine.remove();
            }, 1000);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // ======================
    // 7. SCROLL ANIMATIONS
    // ======================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animations based on element type
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'slideUp 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('viz-card')) {
                    entry.target.style.animation = 'fadeIn 1s ease forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.project-card, .viz-card, .about-content, .section-title').forEach(el => {
        observer.observe(el);
    });

    // ======================
    // 8. CONTACT FORM
    // ======================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showToast('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // ======================
    // 9. TOAST NOTIFICATION
    // ======================
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ======================
    // 10. THEME TOGGLE
    // ======================
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        
        if (isDark) {
            document.documentElement.style.setProperty('--primary', '#0A0A0F');
            document.documentElement.style.setProperty('--secondary', '#151520');
            document.documentElement.style.setProperty('--text-primary', '#FFFFFF');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.style.setProperty('--primary', '#FFFFFF');
            document.documentElement.style.setProperty('--secondary', '#F5F5F7');
            document.documentElement.style.setProperty('--text-primary', '#0A0A0F');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`);
    });

    // ======================
    // 11. KEYBOARD SHORTCUTS
    // ======================
    document.addEventListener('keydown', (e) => {
        // Toggle theme with Ctrl+T
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Escape key hides modals/toasts
        if (e.key === 'Escape') {
            document.querySelectorAll('.toast').forEach(toast => toast.remove());
        }
    });

    // ======================
    // 12. INITIALIZE ALL EFFECTS
    // ======================
    function initializeAllEffects() {
        createDataParticles();
        animateCounters();
        updateNavIndicator();
        
        // Start scroll listener for nav indicator
        window.addEventListener('scroll', updateNavIndicator);
        
        // Initialize tooltips
        initTooltips();
        
        // Initialize typing effect
        initTypingEffect();
    }

    // ======================
    // 13. TYPING EFFECT
    // ======================
    function initTypingEffect() {
        const titles = ['Data Analyst', 'ML Engineer', 'BI Specialist', 'AI Strategist'];
        const titleElement = document.querySelector('.title-gradient');
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentTitle = titles[currentIndex];
            
            if (isDeleting) {
                titleElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                titleElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % titles.length;
            }
            
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
        
        if (titleElement) {
            setTimeout(typeEffect, 1000);
        }
    }

    // ======================
    // 14. TOOLTIPS
    // ======================
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('.tech-node, .btn-link');
        
        tooltipElements.forEach(el => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip') || 'Click to view';
            
            el.addEventListener('mouseenter', () => {
                const rect = el.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - 40}px`;
                document.body.appendChild(tooltip);
                tooltip.classList.add('show');
            });
            
            el.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            });
        });
    }

    // ======================
    // 15. PERFORMANCE METRICS DISPLAY
    // ======================
    function initPerformanceMetrics() {
        const metrics = {
            'Load Time': `${performance.now().toFixed(0)}ms`,
            'Page Size': `${(performance.getEntriesByType('navigation')[0].transferSize / 1024).toFixed(2)}KB`,
            'DOM Ready': `${performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd.toFixed(0)}ms`
        };
        
        // Create metrics display (hidden by default)
        const metricsDisplay = document.createElement('div');
        metricsDisplay.id = 'performanceMetrics';
        metricsDisplay.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: var(--secondary);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            padding: 10px;
            font-size: 11px;
            font-family: 'IBM Plex Mono', monospace;
            opacity: 0.3;
            transition: opacity 0.3s;
            z-index: 999;
        `;
        
        let metricsHTML = '<div style="margin-bottom: 5px; font-weight: bold;">⚡ Perf</div>';
        for (const [key, value] of Object.entries(metrics)) {
            metricsHTML += `<div>${key}: ${value}</div>`;
        }
        metricsDisplay.innerHTML = metricsHTML;
        
        document.body.appendChild(metricsDisplay);
        
        // Show on hover
        metricsDisplay.addEventListener('mouseenter', () => {
            metricsDisplay.style.opacity = '1';
        });
        
        metricsDisplay.addEventListener('mouseleave', () => {
            metricsDisplay.style.opacity = '0.3';
        });
    }

    // ======================
    // 16. LAZY LOAD IMAGES
    // ======================
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ======================
    // 17. SMOOTH SCROLL TO SECTIONS
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
        });
    });

    // ======================
    // 18. VIEWPORT CHECKER
    // ======================
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // ======================
    // 19. INITIALIZE ON LOAD
    // ======================
    setTimeout(() => {
        initPerformanceMetrics();
        initLazyLoading();
    }, 1000);
});

// ======================
// 20. ADDITIONAL CSS ANIMATIONS
// ======================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(0, 212, 255, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
        }
    }
    
    .tooltip {
        position: fixed;
        background: var(--secondary);
        color: var(--text-primary);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        pointer-events: none;
        transform: translate(-50%, -10px);
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        border: 1px solid var(--glass-border);
        z-index: 10000;
        white-space: nowrap;
    }
    
    .tooltip.show {
        opacity: 1;
        transform: translate(-50%, 0);
    }
    
    .btn-link:hover {
        animation: pulse 2s infinite;
    }
    
    /* Print styles */
    @media print {
        .loading-screen,
        .custom-cursor,
        .cursor-follower,
        .theme-toggle,
        .floating-data,
        .grid-overlay {
            display: none !important;
        }
    }
    
    /* Reduced motion preference */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(styleSheet);

// ======================
// 21. SERVICE WORKER FOR PWA
// ======================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// ======================
// 22. OFFLINE DETECTION
// ======================
window.addEventListener('online', () => {
    showToast('Back online', 'success');
});

window.addEventListener('offline', () => {
    showToast('You are offline', 'warning');
});

// ======================
// 23. COPYRIGHT YEAR
// ======================
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// ======================
// 24. ANALYTICS (Simulated)
// ======================
function trackEvent(eventName, data = {}) {
    console.log(`Event: ${eventName}`, data);
    // In production, integrate with Google Analytics or similar
}

// Track page views
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
});

// ======================
// 25. EXPORT FUNCTIONS
// ======================
// Make some functions available globally if needed
window.Portfolio = {
    showToast,
    trackEvent,
    updateNavIndicator: () => {
        const navIndicator = document.getElementById('navIndicator');
        if (navIndicator) updateNavIndicator();
    }
};
