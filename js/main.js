/* Main JavaScript Entry Point */
/* This file coordinates all JavaScript modules */

// Import and initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll cue
    initScrollCue();
    
    // Initialize navigation functionality
    if (typeof initNavigation !== 'undefined') {
        initNavigation();
    }
    
    // Initialize scroll animations
    if (typeof initScrollAnimations !== 'undefined') {
        initScrollAnimations();
    }
    
    // Initialize project interactions
    if (typeof initProjectInteractions !== 'undefined') {
        initProjectInteractions();
    }
    
    // Initialize p5.js sketch (will be loaded separately)
    console.log('Whisper Interface Portfolio initialized');
});

// Scroll cue functionality
function initScrollCue() {
    const scrollCue = document.getElementById('scroll-cue');
    if (!scrollCue) return;
    
    let hasScrolled = false;
    
    window.addEventListener('scroll', function() {
        if (!hasScrolled && window.scrollY > 50) {
            hasScrolled = true;
            scrollCue.classList.add('hidden');
        }
    });
    
    // Hide scroll cue after 8 seconds if user hasn't scrolled
    setTimeout(() => {
        if (!hasScrolled) {
            scrollCue.classList.add('hidden');
        }
    }, 8000);
}