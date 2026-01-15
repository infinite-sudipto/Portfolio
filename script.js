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
            const
