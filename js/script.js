// Modern Portfolio 2025 - Strategic JavaScript
// Clean, purposeful interactions for the redesigned portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe elements for scroll-triggered animations
    const animatedElements = document.querySelectorAll('.hero-content, .hero-visual, .section-header, .project-row, .contact-content');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ===== SMOOTH NAVIGATION =====
    function initSmoothNavigation() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== NAVIGATION SCROLL EFFECT =====
    function initNavigationScrollEffect() {
        const nav = document.querySelector('.nav');
        let scrolled = false;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 50 && !scrolled) {
                nav.classList.add('scrolled');
                scrolled = true;
            } else if (scrollTop <= 50 && scrolled) {
                nav.classList.remove('scrolled');
                scrolled = false;
            }
        });
    }

    // ===== PROJECT HOVER ENHANCEMENTS =====
    function initProjectInteractions() {
        const projects = document.querySelectorAll('.project');
        
        projects.forEach(project => {
            const projectMedia = project.querySelector('.project-media');
            
            project.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                
                if (projectMedia) {
                    projectMedia.style.transform = 'translateY(-8px) scale(1.05)';
                }
            });
            
            project.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                
                if (projectMedia) {
                    projectMedia.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // ===== PROJECT PREVIEW CLICK HANDLERS =====
        const projectPreviews = document.querySelectorAll('.project-media[data-href]');
        projectPreviews.forEach(preview => {
            preview.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('data-href');
                if (href) {
                    window.location.href = href;
                }
            });
        });
    }

    // ===== BUTTON INTERACTIONS =====
    function initButtonInteractions() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ===== FLOATING SHAPES INTERACTION =====
    function initFloatingShapesInteraction() {
        const shapes = document.querySelectorAll('.shape');
        
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3; // Gentler movement
                const x = (mouseX - 0.5) * speed * 5;
                const y = (mouseY - 0.5) * speed * 5;
                const rotation = (mouseX - 0.5) * 2;
                
                shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                shape.style.filter = `hue-rotate(${mouseX * 30}deg) saturate(${1 + mouseY * 0.3})`;
            });
        });

        // Add gentle pulsing interaction
        shapes.forEach(shape => {
            shape.addEventListener('mouseenter', function() {
                this.style.transform += ' scale(1.1)';
                this.style.opacity = '0.5';
            });
            
            shape.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.1)', '');
                this.style.opacity = '0.3';
            });
        });
    }

    // ===== PAGE LOAD ANIMATIONS =====
    function initPageLoadAnimations() {
        // Add a class to body to trigger CSS animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // ===== SCROLL-TRIGGERED PROJECT REVEALS =====
    function initScrollTriggeredReveals() {
        const projectRows = document.querySelectorAll('.project-row');
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Animate individual project items within the row
                    const projectItems = entry.target.querySelectorAll('.project-item');
                    projectItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('revealed');
                        }, index * 150);
                    });
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        projectRows.forEach(row => {
            revealObserver.observe(row);
        });
    }

    // ===== CONTACT LINK INTERACTIONS =====
    function initContactInteractions() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ===== HERO GRAPHIC INTERACTION =====
    function initHeroGraphicInteraction() {
        const heroGraphic = document.querySelector('.hero-graphic');
        
        if (heroGraphic) {
            document.addEventListener('mousemove', function(e) {
                const rect = heroGraphic.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                const rotateX = mouseY / rect.height * 10;
                const rotateY = mouseX / rect.width * 10;
                
                heroGraphic.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            document.addEventListener('mouseleave', function() {
                heroGraphic.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        }
    }



    // ===== INITIALIZE ALL INTERACTIONS =====
    function initializeAllInteractions() {
        initSmoothNavigation();
        initNavigationScrollEffect();
        initProjectInteractions();
        initButtonInteractions();
        initFloatingShapesInteraction();
        initPageLoadAnimations();
        initScrollTriggeredReveals();
        initContactInteractions();
        initHeroGraphicInteraction();
    }

    // Start all interactions
    initializeAllInteractions();

    // ===== UTILITY FUNCTIONS =====
    
    // Debounce function for performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for performance optimization
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // ===== KEYBOARD NAVIGATION ACCESSIBILITY =====
    document.addEventListener('keydown', function(e) {
        // Enable keyboard navigation for interactive elements
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('project') || 
                focusedElement.classList.contains('contact-link') ||
                focusedElement.classList.contains('btn')) {
                focusedElement.click();
            }
        }
    });

    // ===== REDUCED MOTION SUPPORT =====
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
});

// ===== CSS ANIMATIONS INJECTED VIA JAVASCRIPT =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Scroll-triggered reveal animations */
    .in-view {
        animation: revealUp 0.8s ease-out forwards;
    }

    @keyframes revealUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Project reveal animation */
    .project.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Page load states */
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
    }

    body.loaded .hero-visual {
        opacity: 1;
        transform: translateX(0);
    }

    /* Enhanced transitions */
    .project {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .project-media {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .contact-link {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hero-graphic {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Focus states for accessibility */
    .project:focus,
    .btn:focus,
    .contact-link:focus,
    .nav-link:focus {
        outline: 2px solid var(--blue);
        outline-offset: 2px;
    }
`;
document.head.appendChild(styleSheet);