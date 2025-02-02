// scripts.js

// Smooth scrolling for navigation links (use ONE of the versions - they are the same)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {  // Recommended version
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

// OR (Alternative - does exactly the same thing)
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         const targetId = this.getAttribute('href').substring(1);
//         const targetElement = document.getElementById(targetId);

//         if (targetElement) {
//             window.scrollTo({
//                 top: targetElement.offsetTop,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });


// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const heroImage = hero.querySelector('.hero-image'); // Select the hero image element

    const scrollY = window.scrollY;

    // Parallax effect for the background image
    heroImage.style.transform = `translateY(${scrollY * 0.3}px)`; // Adjust parallax speed

    // Optional: Parallax for the text content (if needed)
    // const heroContent = hero.querySelector('.hero-content');
    // heroContent.style.transform = `translateY(${scrollY * 0.1}px)`; // Adjust speed as needed
});


// Form submission handling (example - you'll need server-side code)
const form = document.querySelector('form'); // Make sure you have a <form> element
if (form) { // Check if the form exists on the page
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Here you would typically use AJAX or fetch to send the form data to your server
        // For this example, we'll just show an alert
        alert("Form submitted (client-side simulation). You'll need server-side code to actually process the data.");

        form.reset(); // Reset the form (optional)
    });
}


// Add more JavaScript as needed for other interactive elements, animations, etc.
