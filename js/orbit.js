// Enhanced Spinning Orbit Interactions
document.addEventListener('DOMContentLoaded', function() {
    const orbit = document.querySelector('.spinning-orbit');
    const circles = document.querySelectorAll('.orbit-circle');
    
    if (!orbit) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Smooth mouse tracking
    function updateMousePosition(e) {
        const rect = orbit.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    }
    
    // Parallax effect based on mouse position
    function animateParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        orbit.style.transform = `
            rotateX(${currentY * 10}deg) 
            rotateY(${currentX * 10}deg)
            scale(${1 + Math.abs(currentX) * 0.05})
        `;
        
        requestAnimationFrame(animateParallax);
    }
    
    // Start parallax animation
    animateParallax();
    
    // Mouse move listener
    document.addEventListener('mousemove', updateMousePosition);
    
    // Enhanced hover effects for individual circles
    circles.forEach((circle, index) => {
        circle.addEventListener('mouseenter', function() {
            // Pause the main orbit spin
            orbit.style.animationPlayState = 'paused';
            
            // Add ripple effect
            createRipple(this);
            
            // Slightly move other circles away
            circles.forEach((otherCircle, otherIndex) => {
                if (otherIndex !== index) {
                    otherCircle.style.transform += ' scale(0.9)';
                    otherCircle.style.opacity = '0.7';
                }
            });
        });
        
        circle.addEventListener('mouseleave', function() {
            // Resume orbit spin
            orbit.style.animationPlayState = 'running';
            
            // Reset other circles
            circles.forEach((otherCircle, otherIndex) => {
                if (otherIndex !== index) {
                    otherCircle.style.transform = otherCircle.style.transform.replace(' scale(0.9)', '');
                    otherCircle.style.opacity = '1';
                }
            });
        });
        
        // Add click handler for potential navigation
        circle.addEventListener('click', function() {
            const label = this.querySelector('.orbit-label').textContent;
            
            // Add a subtle click animation
            this.style.transform += ' scale(0.95)';
            setTimeout(() => {
                this.style.transform = this.style.transform.replace(' scale(0.95)', '');
            }, 150);
            
            // You could add navigation logic here based on the label
            console.log(`Clicked on: ${label}`);
        });
    });
    
    // Create ripple effect
    function createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(179, 167, 207, 0.4) 0%, transparent 70%);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            margin: -100px 0 0 -100px;
            z-index: -1;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple animation keyframes dynamically
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-refresh feature - subtle content rotation
    let contentIndex = 0;
    const alternateImages = [
        'media/etextiles_Portfolio3.jpg',
        'media/collage_3.JPG',
        'media/art_Searching my reaches.jpg'
    ];
    
    // Occasionally refresh one random circle with new content
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            const randomCircle = circles[Math.floor(Math.random() * circles.length)];
            const img = randomCircle.querySelector('.orbit-image');
            const randomImg = alternateImages[Math.floor(Math.random() * alternateImages.length)];
            
            // Fade out, change image, fade in
            randomCircle.style.opacity = '0.3';
            setTimeout(() => {
                img.src = randomImg;
                randomCircle.style.opacity = '1';
            }, 300);
        }
    }, 8000); // Every 8 seconds
});