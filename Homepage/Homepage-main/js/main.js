document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Trailer
    const cursor = document.getElementById('custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .reserve-btn, .booking-submit, .primary-btn, .secondary-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { 
                scale: 2, 
                background: "rgba(0, 122, 255, 0.2)",
                borderColor: "rgba(0, 122, 255, 0.8)",
                duration: 0.3 
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { 
                scale: 1, 
                background: "rgba(0, 122, 255, 0.1)",
                borderColor: "var(--accent-blue)",
                duration: 0.3 
            });
        });
    });

    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const tl = gsap.timeline();
    tl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.hero-title', { y: 30, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8')
      .from('.hero-description', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1')
      .from('.cta-group', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8');

    // Section Animations
    const sections = document.querySelectorAll('.feature-section');
    sections.forEach(section => {
        const textBlock = section.querySelector('.text-block');
        const imageBlock = section.querySelector('.image-block');

        gsap.from(textBlock, {
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
            },
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.from(imageBlock, {
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
            },
            x: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    // Parallax effect for hero image
    gsap.to('.hero-img', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: 'none'
    });
});
