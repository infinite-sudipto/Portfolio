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
                cursorFollower.style.background = 'rgba(255, 107, 107, 0.2)';
            } else {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--accent)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.background = 'rgba(255, 107, 107, 0.1)';
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
    const dataPoints = ['001010', '110011', '101101', '010110', '111000', '100100', '011011'];
    
    function createDataParticles() {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.textContent = dataPoints[Math.floor(Math.random() * dataPoints.length)];
            
            const size = Math.random() * 20 + 10;
            particle.style.fontSize = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            
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
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) translateY(-10px)`;
            
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
                if (shine.parentNode) {
                    shine.parentNode.removeChild(shine);
                }
            }, 1000);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) translateY(0)';
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
                    entry.target.style.animation = 'fadeIn 1s ease forwards';
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
                pauseAfterType: 1500,
                pauseAfterDelete: 500,
                cursorStyle: '|',
                cursorAnimation: 'blink'
            });

            // Start second line animation after delay
            setTimeout(() => {
                startTypingAnimation(typingText2, sequences.line2, {
                    typingSpeed: 90,
                    deleteSpeed: 45,
                    pauseAfterType: 1800,
                    pauseAfterDelete: 600,
                    cursorStyle: '▌',
                    cursorAnimation: 'pulse'
                });
            }, 2000);

        }, 1000);

        // Tagline effects
        setTimeout(() => {
            fadeText.style.animation = 'fadeIn 1s ease forwards';
            
            // Add hover effect to tagline
            fadeText.addEventListener('mouseenter', () => {
                fadeText.style.transform = 'scale(1.05)';
                fadeText.style.transition = 'transform 0.3s ease';
            });
            
            fadeText.addEventListener('mouseleave', () => {
                fadeText.style.transform = 'scale(1)';
            });
        }, 4000);
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
            document.documentElement.style.setProperty('--primary', '#FFF9E3');
            document.documentElement.style.setProperty('--secondary', '#F5F0D8');
            document.documentElement.style.setProperty('--text-primary', '#2D3436');
            document.documentElement.style.setProperty('--text-secondary', '#636E72');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            // Light theme
            document.documentElement.style.setProperty('--primary', '#FFFFFF');
            document.documentElement.style.setProperty('--secondary', '#F5F5F7');
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
        
        node.addEventListener('mouseenter', () => {
            node.style.boxShadow = '0 0 40px rgba(255, 107, 107, 0.4)';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.3)';
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

    // Initial toasts
    setTimeout(() => {
        showToast('Welcome to my portfolio!', 'success');
    }, 2500);
    
    setTimeout(() => {
        showToast('Try hovering over project cards!', 'info');
    }, 5000);
});

// ======================
// 16. WINDOW RESIZE HANDLER
// ======================
window.addEventListener('resize', () => {
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
});

// ======================
// 17. UTILITY FUNCTIONS
// ======================
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
// 18. ANIMATION KEYFRAMES
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
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
        }
    }
    
    .toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--secondary);
        border: 1px solid var(--success);
        border-left: 4px solid var(--success);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .toast.show {
        transform: translateX(0);
    }
`;
document.head.appendChild(styleSheet);

// Console greeting
console.log('%c👋 Welcome to Sudipta Bosu\'s Portfolio!', 'color: #FF6B6B; font-size: 18px; font-weight: bold;');
console.log('%c💼 Business Operations & Data Analytics', 'color: #4ECDC4; font-size: 14px;');
console.log('%c🚀 Driving Efficiency Through Data-Driven Decisions', 'color: #00B894; font-size: 14px;');
