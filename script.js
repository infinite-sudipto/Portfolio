document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THE MOUSE GLOW (Ultra-Cool Visual) ---
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // --- 2. PROFESSIONAL SMOOTH SCROLL ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // Space for the fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. REVEAL ANIMATION (Intersection Observer) ---
    // This makes content fade in as you scroll down
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, revealOptions);

    // Apply to glass panels and project cards
    const elementsToReveal = document.querySelectorAll('.glass-panel, .project-card');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-hidden');
        revealOnScroll.observe(el);
    });

    // --- 4. FORM HANDLING (Safe Check) ---
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert("Thank you, Sudipta will get back to you soon!");
            form.reset();
        });
    }
});
