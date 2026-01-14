document.addEventListener('DOMContentLoaded', () => {

    /* ==============================
       1. MOUSE GLOW (OPTIMIZED)
       ============================== */

    let cursorGlow = document.getElementById('cursor-glow');

    // Create only if it doesn't already exist
    if (!cursorGlow) {
        cursorGlow = document.createElement('div');
        cursorGlow.id = 'cursor-glow';
        document.body.appendChild(cursorGlow);
    }

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth trailing animation (premium feel)
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();


    /* ==============================
       2. PROFESSIONAL SMOOTH SCROLL
       ============================== */

    const headerOffset = 90; // fixed header height

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            e.preventDefault();

            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });


    /* ==============================
       3. REVEAL ON SCROLL (REFINED)
       ============================== */

    const revealObserver = new IntersectionObserver(
        (
