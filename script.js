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
    }, 1500);

    // ======================
    // 2. CUSTOM CURSOR SYSTEM - UPDATED
    // ======================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Initialize cursor position
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update main cursor
        cursor.style.left = `${mouseX - 6}px`;
        cursor.style.top = `${mouseY - 6}px`;
        
        // Fade in cursor on first movement
        if (cursor.style.opacity === '0') {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        }

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-node, .expertise');
        let isHovering = false;
        
        hoverElements.forEach(el => {
            if (el.matches(':hover')) {
                isHovering = true;
            }
        });

        if (isHovering) {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        }
    });

    // Smooth follower animation
    function animateCursor() {
        followerX += (mouseX - followerX - 18) * 0.1;
        followerY += (mouseY - followerY - 18) * 0.1;

        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Click animation
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursorFollower.style.transform = 'scale(0.9)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = '';
        cursorFollower.style.transform = '';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    // ======================
    // 3. NAVIGATION INDICATOR
    // ======================
    const navIndicator = document.getElementById('navIndicator');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateNavIndicator() {
        const currentSection = getCurrentSection();
        const currentLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);

        if (currentLink && navIndicator) {
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
    const dataPoints = ['0010', '1100', '1011', '0110', '1110', '1001', '0101'];

    function createDataParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.textContent = dataPoints[Math.floor(Math.random() * dataPoints.length)];

            const size = Math.random() * 12 + 8;
            particle.style.fontSize = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
            particle.style.opacity = Math.random() * 0.4 + 0.2;

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
            const duration = 1500;
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

            // Start counter when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    // ======================
    // 6. PROJECT CARD EFFECTS
    // ======================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Add subtle glow effect
            card.style.boxShadow = `0 15px 35px rgba(255, 152, 0, 0.2)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.05)';
        });
    });

    // ======================
    // 7. SCROLL ANIMATIONS
    // ======================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'slideUp 0.8s ease forwards';
                }

                if (entry.target.classList.contains('viz-card') || entry.target.classList.contains('expertise')) {
                    entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.project-card, .viz-card, .expertise, .section-title, .about-text').forEach(el => {
        observer.observe(el);
    });

    // ======================
    // 8. ADVANCED TYPING ANIMATION
    // ======================
    function initAdvancedTypingAnimation() {
        // Text sequences for animation
        const sequences = {
            line1: [
                "Strategic Data Analysis",
                "Predictive Analytics",
                "Business Intelligence",
                "Data-Driven Insights"
            ],
            line2: [
                "Clear Strategic Decisions",
                "Actionable Intelligence",
                "Measurable Results",
                "Informed Strategies"
            ]
        };

        const typingText1 = document.getElementById('typing-text-1');
        const typingText2 = document.getElementById('typing-text-2');
        const fadeText = document.getElementById('fade-text');

        // Check if elements exist
        if (!typingText1 || !typingText2 || !fadeText) {
            console.log('Animation elements not found');
            return;
        }

        // Animation timeline
        setTimeout(() => {
            // Start first line animation
            startTypingAnimation(typingText1, sequences.line1, {
                typingSpeed: 80,
                deleteSpeed: 40,
                pauseAfterType: 1200,
                pauseAfterDelete: 400,
                cursorStyle: '|',
                cursorAnimation: 'blink'
            });

            // Start second line animation after delay
            setTimeout(() => {
                startTypingAnimation(typingText2, sequences.line2, {
                    typingSpeed: 90,
                    deleteSpeed: 45,
                    pauseAfterType: 1400,
                    pauseAfterDelete: 500,
                    cursorStyle: '▌',
                    cursorAnimation: 'blink'
                });
            }, 1500);

        }, 800);

        // Tagline effects
        setTimeout(() => {
            fadeText.style.animation = 'fadeIn 1s ease forwards';
        }, 3500);
    }

    // Advanced typing animation function
    function startTypingAnimation(element, wordList, options = {}) {
        const {
            typingSpeed = 100,
            deleteSpeed = 50,
            pauseAfterType = 2000,
            pauseAfterDelete = 800,
            cursorStyle = '|',
            cursorAnimation = 'blink'
        } = options;

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        // Set cursor style
        element.dataset.cursor = cursorStyle;
        element.classList.add(`cursor-${cursorAnimation}`);

        function type() {
            if (isPaused) return;

            const currentWord = wordList[wordIndex];

            if (!isDeleting) {
                // Typing forward
                if (charIndex <= currentWord.length) {
                    element.textContent = currentWord.substring(0, charIndex);
                    charIndex++;
                    setTimeout(type, typingSpeed);
                } else {
                    // Finished typing word
                    isDeleting = true;
                    isPaused = true;

                    // Add success effect
                    element.classList.add('typing-complete');

                    setTimeout(() => {
                        isPaused = false;
                        element.classList.remove('typing-complete');
                        setTimeout(type, deleteSpeed);
                    }, pauseAfterType);
                }
            } else {
                // Deleting
                if (charIndex >= 0) {
                    element.textContent = currentWord.substring(0, charIndex);
                    charIndex--;
                    setTimeout(type, deleteSpeed);
                } else {
                    // Finished deleting
                    isDeleting = false;
                    isPaused = true;

                    // Move to next word
                    wordIndex = (wordIndex + 1) % wordList.length;

                    setTimeout(() => {
                        isPaused = false;
                        setTimeout(type, typingSpeed);
                    }, pauseAfterDelete);
                }
            }
        }

        // Start animation
        type();

        // Add interactive pause on hover
        element.addEventListener('mouseenter', () => {
            isPaused = true;
            element.classList.add('typing-paused');
        });

        element.addEventListener('mouseleave', () => {
            setTimeout(() => {
                isPaused = false;
                element.classList.remove('typing-paused');
                type();
            }, 500);
        });
    }

    // ======================
    // 9. THEME TOGGLE
    // ======================
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;

        if (isDark) {
            // Dark theme
            document.documentElement.style.setProperty('--primary', '#F8F9FA');
            document.documentElement.style.setProperty('--secondary', '#E9ECEF');
            document.documentElement.style.setProperty('--text-primary', '#212529');
            document.documentElement.style.setProperty('--text-secondary', '#495057');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            // Light theme
            document.documentElement.style.setProperty('--primary', '#FFFFFF');
            document.documentElement.style.setProperty('--secondary', '#F5F7FA');
            document.documentElement.style.setProperty('--text-primary', '#0A0A0F');
            document.documentElement.style.setProperty('--text-secondary', '#666666');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
    });

    // ======================
    // 10. TOAST NOTIFICATION
    // ======================
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        if (type === 'danger') icon = 'times-circle';

        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // ======================
    // 11. SMOOTH SCROLL
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // ======================
    // 12. TECH NODE INTERACTIONS
    // ======================
    const techNodes = document.querySelectorAll('.tech-node');
    techNodes.forEach(node => {
        node.addEventListener('click', () => {
            const tech = node.textContent || node.querySelector('i').className.replace('fab fa-', '').replace('fas fa-', '');
            showToast(`Clicked on ${tech}`, 'info');
        });
    });

    // ======================
    // 13. KEYBOARD SHORTCUTS
    // ======================
    document.addEventListener('keydown', (e) => {
        // Toggle theme with Ctrl+T
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }

        // Escape key hides toasts
        if (e.key === 'Escape') {
            document.querySelectorAll('.toast').forEach(toast => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            });
        }
    });

    // ======================
    // 14. INITIALIZE ALL EFFECTS
    // ======================
    function initializeAllEffects() {
        createDataParticles();
        animateCounters();
        updateNavIndicator();
        initAdvancedTypingAnimation();
        updateCopyrightYear();

        window.addEventListener('scroll', updateNavIndicator);
        window.addEventListener('resize', handleResize);
    }

    // ======================
    // 15. UPDATE COPYRIGHT YEAR
    // ======================
    function updateCopyrightYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ======================
    // 16. WINDOW RESIZE HANDLER
    // ======================
    function handleResize() {
        const navIndicator = document.getElementById('navIndicator');
        if (navIndicator) {
            setTimeout(() => {
                const currentSection = getCurrentSection();
                const currentLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);

                if (currentLink) {
                    const { offsetLeft, offsetWidth } = currentLink;
                    navIndicator.style.left = `${offsetLeft}px`;
                    navIndicator.style.width = `${offsetWidth}px`;
                }
            }, 100);
        }
    }

    // Initial toasts
    setTimeout(() => {
        showToast('Welcome to my portfolio!', 'success');
    }, 2000);

    setTimeout(() => {
        showToast('Hover over project cards for effects!', 'info');
    }, 4500);
});

// Console greeting
console.log('%c👋 Welcome to Sudipto Bosu\'s Portfolio!', 'color: #FF9800; font-size: 16px; font-weight: bold;');
console.log('%c💼 Business Operations & Data Analytics', 'color: #2196F3; font-size: 14px;');
console.log('%c🚀 Driving Efficiency Through Data-Driven Decisions', 'color: #4CAF50; font-size: 14px;');


// ===== ENHANCED THEME TOGGLE WITH HEADER EFFECT =====
(function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const header = document.querySelector('header');
    
    if (!themeToggle || !header) return;
    
    themeToggle.addEventListener('click', function() {
        // Toggle theme
        document.body.classList.toggle('dark-theme');
        
        // Update header
        if (document.body.classList.contains('dark-theme')) {
            header.style.cssText = `
                background: rgba(26, 26, 26, 0.95);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            `;
        } else {
            header.style.cssText = `
                background: var(--primary);
                border-bottom: 1px solid var(--glass-border);
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
            `;
        }
    });
})();
