// Editorial Studio Portfolio Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navigation line color change on scroll
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Project reveal animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, observerOptions);

  // Initialize project animations for all types
  document.querySelectorAll('.project-feature, .project-small').forEach((item, index) => {
    projectObserver.observe(item);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 100; // Account for fixed nav
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Subtle parallax on hero elements
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroFrame = document.querySelector('.hero-frame');
    
    if (heroFrame && scrolled < window.innerHeight) {
      const rate = scrolled * 0.03;
      heroFrame.style.transform = `translateY(${rate}px)`;
    }
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Enhanced link hover effects
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateX(4px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateX(0)';
    });
  });

  // Page entrance animation
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(12px)';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 150);

  // Add cursor trail effect (optional enhancement)
  if (window.innerWidth > 1024) {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Create subtle cursor follower
    const cursorFollower = document.createElement('div');
    cursorFollower.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      background: radial-gradient(circle, rgba(255, 107, 74, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease;
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(cursorFollower);

    function updateCursor() {
      cursorFollower.style.left = (mouseX - 20) + 'px';
      cursorFollower.style.top = (mouseY - 20) + 'px';
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Scale cursor on hover
    document.querySelectorAll('a, button, .project-feature, .project-small').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
      });
    });
  }
});
