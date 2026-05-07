document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Initialize cursor position on first mouse move to prevent jump
        let isFirstMove = true;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (isFirstMove) {
                cursorX = mouseX;
                cursorY = mouseY;
                isFirstMove = false;
            }
        });

        // Smooth animation for cursor using GSAP ticker
        gsap.ticker.add(() => {
            if (!isFirstMove) {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                gsap.set(cursor, { x: cursorX, y: cursorY });
            }
        });

        // Hover effect for interactive elements
        const hoverElements = document.querySelectorAll('a, button, input, textarea, .about-btn, .bottom-left-action, .post-item, .explore-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Full Page Scroll Logic
    const scrollWrapper = document.getElementById('scroll-wrapper');
    if (scrollWrapper) {
        const sections = document.querySelectorAll('.fullscreen-section');
        const scrollIndicator = document.getElementById('scroll-indicator');
        let currentSectionIndex = 0;
        let isScrolling = false;

        // Initialize first section
        if(sections.length > 0) sections[0].classList.add('active');

        window.addEventListener('wheel', (e) => {
            if (isScrolling) return;
            
            if (e.deltaY > 0) {
                // Scroll Down
                if (currentSectionIndex < sections.length - 1) {
                    currentSectionIndex++;
                    updateScroll();
                }
            } else {
                // Scroll Up
                if (currentSectionIndex > 0) {
                    currentSectionIndex--;
                    updateScroll();
                }
            }
        });

        function updateScroll() {
            isScrolling = true;
            scrollWrapper.style.transform = `translateY(-${currentSectionIndex * 100}vh)`;
            
            // Handle section active classes for animations
            sections.forEach((sec, index) => {
                if (index === currentSectionIndex) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });

            // Hide scroll indicator on last section
            if (scrollIndicator) {
                if (currentSectionIndex === sections.length - 1) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '0.6';
                }
            }

            setTimeout(() => {
                isScrolling = false;
            }, 1000); // Match CSS transition duration
        }
    }
});
