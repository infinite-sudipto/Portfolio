@@ -1,7 +1,7 @@
// scripts.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// Smooth scrolling for navigation links (use ONE of the versions - they are the same)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {  // Recommended version
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

@@ -17,34 +17,53 @@ document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    });
});

// OR (Alternative - does exactly the same thing)
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

// Simple parallax effect for hero section (optional)
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
    const overlay = document.querySelector('.hero-overlay');
    const heroImage = hero.querySelector('.hero-image'); // Select the hero image element

    const scrollY = window.scrollY;

    overlay.style.transform = `translateY(${scrollY * 0.2}px)`; // Adjust the multiplier for the parallax speed
    // Parallax effect for the background image
    heroImage.style.transform = `translateY(${scrollY * 0.3}px)`; // Adjust parallax speed

    // Optional: Parallax for the image (more complex)
    // const image = hero.querySelector('.hero-image img');
    // image.style.transform = `translateY(${scrollY * 0.4}px)`; // Different parallax speed for the image
    // Optional: Parallax for the text content (if needed)
    // const heroContent = hero.querySelector('.hero-content');
    // heroContent.style.transform = `translateY(${scrollY * 0.1}px)`; // Adjust speed as needed
});


// Form submission handling (example - you'll need server-side code)
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
const form = document.querySelector('form'); // Make sure you have a <form> element
if (form) { // Check if the form exists on the page
    form.addEventListener('submit', (event) => {
        event.preventDefault();

    // Here you would typically use AJAX or fetch to send the form data to your server
    // For this example, we'll just show an alert
    alert("Form submitted (client-side simulation).  You'll need server-side code to actually process the data.");

    // Reset the form (optional)
    form.reset();
});
        // Here you would typically use AJAX or fetch to send the form data to your server
        // For this example, we'll just show an alert
        alert("Form submitted (client-side simulation). You'll need server-side code to actually process the data.");

        form.reset(); // Reset the form (optional)
    });
}


