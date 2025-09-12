/* Main JavaScript Entry Point */
/* This file coordinates all JavaScript modules */

// Import and initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
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
    console.log('Portfolio initialized');
});