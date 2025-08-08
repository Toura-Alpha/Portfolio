document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');

    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
    }

    // Smooth scroll for the scroll-down indicator
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            // This is a landing page, so there might not be a section to scroll to.
            // If an 'about' section with id="about" existed on this page, this would work:
            // document.querySelector(scrollIndicator.getAttribute('href')).scrollIntoView({
            //     behavior: 'smooth'
            // });
            
            // For demonstration, let's scroll down by the window height.
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});