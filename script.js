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
                cursorFollower.style.background = 'rgba(0, 212, 255, 0.2)';
            } else {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--accent)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.background = 'rgba(0, 212, 255, 0.1)';
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
    // 8. THEME TOGGLE
    // ======================
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        
        if (isDark) {
            // Dark theme
            document.documentElement.style.setProperty('--primary', '#0A0A0F');
            document.documentElement.style.setProperty('--secondary', '#151520');
            document.documentElement.style.setProperty('--text-primary', '#FFFFFF');
            document.documentElement.style.setProperty('--text-secondary', '#B0B0C0');
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
    // 9. TOAST NOTIFICATION
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
    // 10. SMOOTH SCROLL
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
    // 11. INITIALIZE ALL EFFECTS
    // ======================
    function initializeAllEffects() {
        createDataParticles();
        animateCounters();
        updateNavIndicator();
        
        // Start scroll listener for nav indicator
        window.addEventListener('scroll', updateNavIndicator);
        
        // Initialize typing effect
        initTypingEffect();
        
        // Update copyright year
        updateCopyrightYear();
    }

    // ======================
    // 12. TYPING EFFECT
    // ======================
    function initTypingEffect() {
        const titles = ['Data Analyst', 'ML Engineer', 'BI Specialist', 'AI Strategist'];
        const titleElement = document.querySelector('.title-gradient');
        if (!titleElement) return;
        
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentTitle = titles[currentIndex];
            
            if (isDeleting) {
                titleElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                titleElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                typingSpeed = 1500;
                setTimeout(typeEffect, typingSpeed);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % titles.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(typeEffect, 1000);
    }

    // ======================
    // 13. UPDATE COPYRIGHT YEAR
    // ======================
    function updateCopyrightYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ======================
    // 14. TECH NODE INTERACTIONS
    // ======================
    const techNodes = document.querySelectorAll('.tech-node');
    techNodes.forEach(node => {
        node.addEventListener('click', () => {
            const tech = node.textContent || node.querySelector('i').className.replace('fab fa-', '').replace('fas fa-', '');
            showToast(`Clicked on ${tech}`, 'info');
        });
        
        node.addEventListener('mouseenter', () => {
            node.style.boxShadow = '0 0 40px var(--accent-glow)';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.boxShadow = '0 0 30px var(--accent-glow)';
        });
    });

    // ======================
    // 15. KEYBOARD SHORTCUTS
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
        
        // Number keys for navigation
        if (e.key >= '1' && e.key <= '5') {
            const sections = ['home', 'about', 'projects', 'skills', 'contact'];
            const index = parseInt(e.key) - 1;
            if (sections[index]) {
                const section = document.getElementById(sections[index]);
                if (section) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = section.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    showToast(`Navigated to ${sections[index]}`, 'info');
                }
            }
        }
    });

    // ======================
    // 16. INITIALIZE ON LOAD
    // ======================
    // Add some initial toasts
    setTimeout(() => {
        showToast('Welcome to my portfolio!', 'success');
    }, 2500);
    
    setTimeout(() => {
        showToast('Try hovering over project cards!', 'info');
    }, 5000);
});

// ======================
// 17. WINDOW RESIZE HANDLER
// ======================
window.addEventListener('resize', () => {
    const navIndicator = document.getElementById('navIndicator');
    if (navIndicator) {
        // Recalculate nav indicator position on resize
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
// 18. UTILITY FUNCTIONS
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
// 19. MAKE FUNCTIONS GLOBALLY AVAILABLE
// ======================
window.Portfolio = {
    showToast: (message, type) => showToast(message, type),
    toggleTheme: () => document.getElementById('themeToggle').click(),
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// ======================
// 20. CONSOLE GREETING
// ======================
console.log('%c👋 Welcome to Sudipta Bosu\'s Portfolio!', 'color: #00D4FF; font-size: 18px; font-weight: bold;');
console.log('%c💻 Built with cutting-edge web technologies', 'color: #7B61FF; font-size: 14px;');
console.log('%c📊 Data Analyst & AI Strategist | Physics Background', 'color: #00FF88; font-size: 14px;');
console.log('%c🔗 GitHub: https://github.com/infinite-sudipto', 'color: #FFFFFF; font-size: 12px;');
