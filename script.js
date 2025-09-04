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
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Enhanced hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(3)';
                cursorDot.style.background = 'rgba(147, 197, 253, 0.6)';
                cursorDot.style.backdropFilter = 'blur(5px)';
            });
            
            el.addEventListener('mouseleave', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.background = '#93c5fd';
                cursorDot.style.backdropFilter = 'none';
            });
        });
    }
    
    // Typing animation for hero subtitle
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (typingText) {
        const roles = [
            'Full Stack Developer',
            'UI/UX Designer', 
            'Creative Coder',
            'Problem Solver',
            'Tech Enthusiast'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Blinking cursor
        setInterval(() => {
            if (cursor) {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
        
        setTimeout(typeEffect, 1000);
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
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
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
    
    // Image upload functionality
    const imageUpload = document.getElementById('imageUpload');
    let uploadedImages = [];
    
    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const imageData = {
                            src: e.target.result,
                            name: file.name,
                            id: Date.now() + index
                        };
                        
                        uploadedImages.push(imageData);
                        
                        // Find project cards with placeholders and replace them
                        const projectCards = document.querySelectorAll('.project-card');
                        const availableCard = Array.from(projectCards).find(card => {
                            const placeholder = card.querySelector('.project-placeholder');
                            return placeholder && !card.querySelector('.uploaded-image');
                        });
                        
                        if (availableCard) {
                            replaceProjectImage(availableCard, imageData);
                        }
                        
                        // Show upload success animation
                        showUploadSuccess();
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        });
    }
    
    function replaceProjectImage(projectCard, imageData) {
        const projectImage = projectCard.querySelector('.project-image');
        const placeholder = projectCard.querySelector('.project-placeholder');
        
        if (projectImage && placeholder) {
            // Create uploaded image element
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.name;
            img.className = 'uploaded-image';
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            
            // Add click to remove functionality
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '×';
            removeBtn.className = 'remove-image';
            removeBtn.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                cursor: pointer;
                font-size: 14px;
                line-height: 1;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 10;
            `;
            
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                removeProjectImage(projectCard, imageData.id);
            });
            
            // Show remove button on hover
            projectImage.addEventListener('mouseenter', function() {
                removeBtn.style.opacity = '1';
            });
            
            projectImage.addEventListener('mouseleave', function() {
                removeBtn.style.opacity = '0';
            });
            
            // Replace placeholder with image
            placeholder.style.opacity = '0';
            setTimeout(() => {
                projectImage.appendChild(img);
                projectImage.appendChild(removeBtn);
                placeholder.style.display = 'none';
                img.style.opacity = '1';
            }, 200);
        }
    }
    
    function removeProjectImage(projectCard, imageId) {
        const projectImage = projectCard.querySelector('.project-image');
        const uploadedImg = projectCard.querySelector('.uploaded-image');
        const removeBtn = projectCard.querySelector('.remove-image');
        const placeholder = projectCard.querySelector('.project-placeholder');
        
        if (uploadedImg) {
            uploadedImg.style.opacity = '0';
            setTimeout(() => {
                uploadedImg.remove();
                if (removeBtn) removeBtn.remove();
                if (placeholder) {
                    placeholder.style.display = 'flex';
                    placeholder.style.opacity = '1';
                }
            }, 200);
        }
        
        // Remove from uploaded images array
        uploadedImages = uploadedImages.filter(img => img.id !== imageId);
    }
    
    function showUploadSuccess() {
        const uploadBtn = document.querySelector('.upload-btn');
        if (uploadBtn) {
            const originalText = uploadBtn.textContent;
            uploadBtn.textContent = '✓ Uploaded!';
            uploadBtn.style.background = '#10b981';
            
            setTimeout(() => {
                uploadBtn.textContent = originalText;
                uploadBtn.style.background = '#3b82f6';
            }, 2000);
        }
    }
    
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
`;
document.head.appendChild(style);