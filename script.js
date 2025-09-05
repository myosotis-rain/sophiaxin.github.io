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
    
    
    // Project page navigation
    const projectCards = document.querySelectorAll('.project-card[data-project]');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the "View Case Study" link
            if (e.target.classList.contains('project-link')) {
                e.preventDefault();
            }
            
            const projectId = this.dataset.project;
            
            // Create project pages with detailed content
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
                defitrading: {
                    title: 'DeFi Trading Platform',
                    subtitle: 'Decentralized Finance Solution',
                    description: 'Cutting-edge decentralized trading platform with automated market making, yield farming, and advanced DeFi protocols.',
                    tech: ['Solidity', 'Web3.js', 'Ethereum', 'React', 'Hardhat'],
                    features: ['Automated market making', 'Yield farming protocols', 'Multi-token swaps', 'Liquidity mining', 'Governance voting'],
                    challenges: 'Ensuring smart contract security while optimizing gas efficiency and user experience.',
                    outcome: 'Facilitated $10M+ in trading volume with zero security incidents.'
                },
                componentlibrary: {
                    title: 'Component Library',
                    subtitle: 'Design System & UI Kit',
                    description: 'Comprehensive design system with 50+ reusable components, complete documentation, and seamless Figma integration.',
                    tech: ['React', 'Storybook', 'Figma', 'TypeScript', 'Styled Components'],
                    features: ['50+ components', 'Figma integration', 'Interactive documentation', 'Theme customization', 'Accessibility compliance'],
                    challenges: 'Creating flexible, accessible components that work across different design requirements.',
                    outcome: 'Reduced development time by 50% across multiple product teams.'
                }
            };
            
            const project = projectData[projectId];
            if (project) {
                openProjectModal(project);
            }
        });
    });
    
    function openProjectModal(project) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            margin: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="padding: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">${project.title}</h2>
                        <p style="color: #64748b; font-size: 1.1rem;">${project.subtitle}</p>
                    </div>
                    <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #64748b; padding: 0.5rem;">×</button>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #374151;">${project.description}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #0f172a; margin-bottom: 1rem;">Technologies Used</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${project.tech.map(tech => `<span style="background: #f1f5f9; color: #475569; padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.85rem; font-weight: 500;">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #0f172a; margin-bottom: 1rem;">Key Features</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${project.features.map(feature => `<li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9; color: #374151;">• ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #0f172a; margin-bottom: 1rem;">Challenge</h3>
                    <p style="color: #374151; line-height: 1.6;">${project.challenges}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #0f172a; margin-bottom: 1rem;">Outcome</h3>
                    <p style="color: #059669; line-height: 1.6; font-weight: 500;">${project.outcome}</p>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    ${project.videoUrl ? `<a href="${project.videoUrl}" target="_blank" style="background: #3b82f6; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">📹 View Video</a>` : ''}
                    <button class="close-modal" style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.02) 100%); color: #374151; border: 1px solid rgba(0, 0, 0, 0.08); padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500;">Close</button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close modal functionality
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
                setTimeout(() => modal.remove(), 300);
            });
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
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