// scripts.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// Simple parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const overlay = document.querySelector('.hero-overlay');
    const scrollY = window.scrollY;

    overlay.style.transform = `translateY(${scrollY * 0.2}px)`; // Adjust the multiplier for the parallax speed

    // Optional: Parallax for the image (more complex)
    // const image = hero.querySelector('.hero-image img');
    // image.style.transform = `translateY(${scrollY * 0.4}px)`; // Different parallax speed for the image
});


// Form submission handling (example - you'll need server-side code)
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Here you would typically use AJAX or fetch to send the form data to your server
    // For this example, we'll just show an alert
    alert("Form submitted (client-side simulation).  You'll need server-side code to actually process the data.");

    // Reset the form (optional)
    form.reset();
});



// Add more JavaScript as needed for other interactive elements, animations, etc.
