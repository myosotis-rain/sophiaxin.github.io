// Enhanced custom cursor functionality
document.addEventListener('DOMContentLoaded', function() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    
    if (cursorDot) {
        // Track mouse movement with smooth trailing
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.25;
            cursorY += (mouseY - cursorY) * 0.25;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Enhanced hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .project-card-link');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(3)';
                cursorDot.style.background = 'rgba(147, 197, 253, 0.6)';
                cursorDot.style.backdropFilter = 'blur(5px)';
                cursorDot.style.boxShadow = '0 0 20px rgba(147, 197, 253, 0.4)';
            });
            
            el.addEventListener('mouseleave', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.background = '#93c5fd';
                cursorDot.style.backdropFilter = 'none';
                cursorDot.style.boxShadow = 'none';
            });
        });
    }
    
    // Image modal functionality
    window.openImageModal = function(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSrc;
        modal.classList.add('active');
    };
    
    window.closeImageModal = function() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('active');
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });

    // Portfolio navigation functionality
    const portfolioIframe = document.getElementById('portfolio-iframe');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    if (portfolioIframe && thumbnails.length > 0) {
        const slides = [4, 10, 16, 27, 33, 38, 50];
        let currentIndex = 0;
        
        // Function to update the iframe src
        function updateSlide(index) {
            const slideNumber = slides[index];
            const baseUrl = 'https://docs.google.com/presentation/d/1jslD6MsrWgA6xIfu7wktOjOvYFiQ4dAFNwh--_PbIpk/embed?start=false&loop=false&delayms=3000';
            portfolioIframe.src = `${baseUrl}&slide=${slideNumber}`;
            
            // Update active thumbnail
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Thumbnail click handlers
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                updateSlide(index);
            });
        });
        
        // Initialize with first slide
        updateSlide(0);
    }
    
    // Enhanced horizontal scrolling for legacy slides (if any)
    const slidesContainer = document.querySelector('.slides-container');
    if (slidesContainer && !portfolioIframe) {
        // Enable horizontal scrolling with mouse wheel
        slidesContainer.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
        
        // Smooth scroll to slides with arrow keys
        document.addEventListener('keydown', function(e) {
            if (!slidesContainer.matches(':hover')) return;
            
            const slideWidth = slidesContainer.querySelector('.slide-item').offsetWidth;
            const gap = 48; // 3rem gap
            const scrollDistance = slideWidth + gap;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                slidesContainer.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                slidesContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
            }
        });
        
        // Add momentum scrolling for touch devices
        let isScrolling = false;
        let startX = 0;
        let scrollLeft = 0;
        
        slidesContainer.addEventListener('touchstart', function(e) {
            isScrolling = true;
            startX = e.touches[0].pageX - this.offsetLeft;
            scrollLeft = this.scrollLeft;
        });
        
        slidesContainer.addEventListener('touchmove', function(e) {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - this.offsetLeft;
            const walk = (x - startX) * 2;
            this.scrollLeft = scrollLeft - walk;
        });
        
        slidesContainer.addEventListener('touchend', function() {
            isScrolling = false;
        });
    }
    
    // Animated name reveal
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        const text = animatedText.textContent;
        animatedText.innerHTML = '';
        
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
            animatedText.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 500 + i * 100);
        });
    }
    
    // Enhanced parallax mouse effects
    document.addEventListener('mousemove', function(e) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Floating elements effect
        const floatingElements = document.querySelectorAll('.project-card, .about-preview');
        floatingElements.forEach((el, index) => {
            const x = (clientX - centerX) * (0.02 + index * 0.01);
            const y = (clientY - centerY) * (0.02 + index * 0.01);
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Scroll-triggered animations with stagger
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Enhanced project card animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
        
        // Add hover personality
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
        
        observer.observe(card);
    });
    
    // Smooth scrolling with personality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add a little shake to the clicked element
                this.style.animation = 'shake 0.3s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Fun random interactions
    let clickCount = 0;
    document.addEventListener('click', function(e) {
        clickCount++;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(147, 197, 253, 0.4)';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Easter egg after many clicks
        if (clickCount === 20) {
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
                clickCount = 0;
            }, 2000);
        }
    });
    
    
    // Magnetic buttons effect
    const magneticElements = document.querySelectorAll('.project-card, .nav-link, .about-button');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    
    // Scroll progress indicator - removed
    
    // Text reveal on scroll (only for hero and main sections, not about page)
    function setupTextReveal() {
        if (window.location.pathname.includes('about.html')) return; // Skip on about page
        
        const textElements = document.querySelectorAll('.hero h1, .hero p, .projects-section h2');
        textElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = text.split(' ').map(word => 
                `<span class="word-reveal" style="opacity: 0; transform: translateY(20px); transition: all 0.6s ease;">${word}</span>`
            ).join(' ');
        });
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const words = entry.target.querySelectorAll('.word-reveal');
                    words.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.opacity = '1';
                            word.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        textElements.forEach(el => revealObserver.observe(el));
    }
    
    // Initialize new components
    setupTextReveal();
    
    // Keep project data for potential future modal use
    const projectData = {
                dovekie: {
                    title: 'Dovekie Interface',
                    subtitle: 'MIT Media Lab • Future Sketches',
                    description: 'Interface design for the open-source live-code package Dovekie under the supervision of Jessica Stringham. Created molds simulation sketch based on work of Patt Vira and collaborated on interface development for the live-coding environment.',
                    tech: ['Interface Design', 'Live Coding', 'Open Source', 'Simulation', 'Collaboration'],
                    features: ['Open-source interface design', 'Live-code package integration', 'Molds simulation sketch', 'Collaborative development', 'User interaction design'],
                    challenges: 'Designing an intuitive interface for complex live-coding workflows while maintaining the flexibility needed for creative expression.',
                    outcome: 'Successfully contributed to an open-source tool that enables creative live-coding experiences for artists and developers.',
                    videoUrl: 'https://youtu.be/AaxXMroazQs'
                },
                etextiles: {
                    title: 'Electronic Textiles',
                    subtitle: 'MIT Media Lab • Responsive Environments',
                    description: 'Concept art and 3D visualization project for sensor network applications under the supervision of Irmandy Wicaksono. Focused on device designs and user interaction within electronic textile systems.',
                    tech: ['3D Visualization', 'Concept Art', 'UX Design', 'Sensor Networks', 'Wearable Tech'],
                    features: ['Sensor network visualization', '3D device mockups', 'User interaction concepts', 'Wearable integration design', 'Technical concept art'],
                    challenges: 'Visualizing complex sensor network interactions in textile form while ensuring user-friendly interfaces and practical wearability.',
                    outcome: 'Created comprehensive visual concepts that informed the development of next-generation electronic textile applications.'
                },
                portfolio: {
                    title: 'Semester Portfolio',
                    subtitle: 'Wellesley College • ARTS205 - Meditated Drawing',
                    description: 'Animated portfolio created for meditated drawing course, featuring interactive presentations and dynamic visual elements. The project explores the intersection of traditional drawing techniques with digital animation.',
                    tech: ['Animation', 'Interactive Design', 'Digital Art', 'Presentation Design', 'Visual Storytelling'],
                    features: ['Animated slideshow presentations', 'Interactive visual elements', 'Digital drawing integration', 'Creative storytelling', 'Academic portfolio format'],
                    challenges: 'Translating meditative drawing practices into engaging digital animations while maintaining the contemplative essence of the original work.',
                    outcome: 'Successfully documented semester-long artistic journey with innovative presentation format that enhanced the viewing experience.'
                },
                aicontentgen: {
                    title: 'Smart Content Generator',
                    subtitle: 'AI-Powered Content Platform',
                    description: 'Advanced AI content creation platform utilizing natural language processing for automated content generation and optimization.',
                    tech: ['Python', 'TensorFlow', 'OpenAI API', 'React', 'FastAPI'],
                    features: ['AI content generation', 'Multi-language support', 'Content optimization', 'Plagiarism detection', 'Brand voice adaptation'],
                    challenges: 'Fine-tuning AI models to generate contextually relevant and brand-consistent content.',
                    outcome: 'Helped content creators increase productivity by 60% while maintaining quality.'
                },
                artwork: {
                    title: 'Creative Works & Visual Exploration',
                    subtitle: 'Illustrations, Collages & Digital Art',
                    description: 'A curated collection of visual works including digital illustrations, experimental collages, and artistic explorations that blend traditional art techniques with digital innovation.',
                    tech: ['Digital Illustration', 'Collage', 'Mixed Media', 'Adobe Creative Suite', 'Procreate'],
                    features: ['Character illustrations', 'Abstract compositions', 'Digital collages', 'Experimental typography', 'Visual storytelling'],
                    challenges: 'Developing a unique visual language that bridges traditional artistic methods with contemporary digital tools and themes.',
                    outcome: 'Created a diverse portfolio showcasing artistic versatility and creative problem-solving across multiple visual mediums.'
                },
                componentlibrary: {
                    title: 'Component Library',
                    subtitle: 'Design System & UI Kit',
                    description: 'Comprehensive design system with 50+ reusable components, complete documentation, and seamless Figma integration.',
                    tech: ['React', 'Storybook', 'Figma', 'TypeScript', 'Styled Components'],
                    features: ['50+ components', 'Figma integration', 'Interactive documentation', 'Theme customization', 'Accessibility compliance'],
                    challenges: 'Creating flexible, accessible components that work across different design requirements.',
                    outcome: 'Reduced development time by 50% across multiple product teams.'
                },
                wellesleyweb: {
                    title: 'The Wellesley Web: TechConnect',
                    subtitle: 'Wellesley College • CS304 - Databases with Web Interfaces',
                    description: 'Pre-professional networking platform specifically designed for Wellesley College students and alumni in tech and tech-adjacent fields. Built front-end and back-end entirely from scratch as a team project.',
                    tech: ['Python', 'HTML', 'CSS', 'JavaScript', 'SQL'],
                    features: ['User authentication', 'Professional networking', 'Database integration', 'Responsive design', 'Full-stack architecture'],
                    challenges: 'Learning HTML and CSS from scratch while implementing complex database interactions and creating an intuitive user interface for professional networking.',
                    outcome: 'Successfully delivered a fully functional networking platform, gaining comprehensive full-stack development experience from zero prior knowledge in frontend technologies.'
                }
            };
    
    // Konami code easter egg with more personality
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // More dramatic easter egg
            document.body.style.animation = 'party 3s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
            konamiCode = [];
        }
    });
});

// CSS animations added via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }
    
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes party {
        0%, 100% { 
            filter: hue-rotate(0deg) saturate(1) brightness(1); 
            transform: scale(1);
        }
        25% { 
            filter: hue-rotate(90deg) saturate(1.5) brightness(1.2); 
            transform: scale(1.02);
        }
        50% { 
            filter: hue-rotate(180deg) saturate(2) brightness(1.1); 
            transform: scale(0.98);
        }
        75% { 
            filter: hue-rotate(270deg) saturate(1.5) brightness(1.2); 
            transform: scale(1.01);
        }
    }
    
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        25% { background-position: 100% 50%; }
        50% { background-position: 100% 100%; }
        75% { background-position: 0% 100%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);