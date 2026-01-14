document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SCROLL WITH OFFSET ---
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. HEADER SCROLL EFFECT (Glass Intensity) ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'rgba(255, 250, 218, 0.9)'; // More cream when scrolling
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(255, 255, 255, 0.45)';
            header.style.boxShadow = 'none';
        }
    });

    // --- 3. REVEAL ON SCROLL (Intersection Observer) ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it reveals, we can stop observing
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Target all project cards and the about container
    const elementsToReveal = document.querySelectorAll('.project-card, .contact-container');
    
    elementsToReveal.forEach(el => {
        // Set initial state via JS if not in CSS
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        revealOnScroll.observe(el);
    });

    // --- 4. ACTIVE NAV LINK TRACKING ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-nav');
            }
        });
    });
});

// Create the active-nav style helper
const style = document.createElement('style');
style.innerHTML = `
    .active-nav { color: #4A90E2 !important; border-bottom: 2px solid #4A90E2; }
    .active { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);
