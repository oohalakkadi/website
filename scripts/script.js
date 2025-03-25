document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for the name
    const timeline = gsap.timeline();
    
    // Animate the letters
    timeline.from('.letter', {
        duration: 1.5,
        opacity: 0,
        strokeDasharray: 100,
        strokeDashoffset: 100,
        ease: "power2.out",
        stagger: 0.2
    });
    
    // Animate the inner O circles
    timeline.from('.letter-inner', {
        duration: 1,
        opacity: 0,
        scale: 0,
        ease: "back.out(1.7)",
        stagger: 0.2
    }, "-=1");
    
    // Animate the circuit lines
    timeline.from('.circuit', {
        duration: 1,
        opacity: 0,
        drawSVG: "0%",
        ease: "power1.inOut",
        stagger: 0.2
    }, "-=1");
    
    // Custom cursor effect
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    document.addEventListener('mousedown', () => {
        gsap.to(cursor, {
            scale: 0.8,
            duration: 0.2
        });
    });
    
    document.addEventListener('mouseup', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.2
        });
    });
    
    // Hover effects for interactive elements
    document.querySelectorAll('.letter-group, .section-node, .explore-container').forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: 50,
                height: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });
            
            // Add ripple effect for O's
            if (element.classList.contains('letter-group')) {
                const circle = element.querySelector('circle.letter');
                if (circle) {
                    createRipple(circle);
                }
            }
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: 20,
                height: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                duration: 0.3
            });
        });
    });
    
    // Function to create ripple effect
    function createRipple(element) {
        const cx = element.getAttribute('cx');
        const cy = element.getAttribute('cy');
        const r = parseInt(element.getAttribute('r'));
        
        const ripple = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ripple.setAttribute('cx', cx);
        ripple.setAttribute('cy', cy);
        ripple.setAttribute('r', r);
        ripple.setAttribute('fill', 'none');
        ripple.setAttribute('stroke', 'white');
        ripple.setAttribute('stroke-width', '1');
        ripple.setAttribute('class', 'ripple');
        
        document.getElementById('name-svg').appendChild(ripple);
        
        gsap.to(ripple, {
            r: r * 2,
            opacity: 0,
            strokeWidth: 0.5,
            duration: 1,
            onComplete: () => {
                ripple.remove();
            }
        });
    }
    
    // Explore button and navigation animation
    const exploreBtn = document.querySelector('.explore-container');
    const navigationHub = document.querySelector('.navigation-hub');
    
    exploreBtn.addEventListener('click', () => {
        // Animate the circuit pulse path
        gsap.to('.circuit-pulse', {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power1.inOut"
        });
        
        // Scroll down to navigation hub
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: navigationHub,
                offsetY: 0
            },
            onComplete: () => {
                navigationHub.style.display = 'flex';
                
                // Animate the central node
                gsap.from('.central-node', {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
                
                // Animate each path line and section node
                gsap.to('.path-line', {
                    width: '100px',
                    duration: 1,
                    stagger: 0.2,
                    ease: "power1.inOut",
                    onComplete: function() {
                        // After lines are drawn, show the section nodes
                        gsap.to('.section-node', {
                            opacity: 1,
                            x: 0,
                            duration: 0.5,
                            stagger: 0.1
                        });
                    }
                });
            }
        });
    });
    
    // Scroll trigger for explore animation
    ScrollTrigger.create({
        trigger: ".landing",
        start: "bottom bottom",
        onEnter: () => {
            // Similar animation as click, but triggered by scroll
            gsap.to('.circuit-pulse', {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power1.inOut"
            });
            
            navigationHub.style.display = 'flex';
            
            gsap.from('.central-node', {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
            
            gsap.to('.path-line', {
                width: '100px',
                duration: 1,
                stagger: 0.2,
                ease: "power1.inOut",
                onComplete: function() {
                    gsap.to('.section-node', {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1
                    });
                }
            });
        },
        once: true
    });
    
    // Section navigation
    document.querySelectorAll('.section-node').forEach(node => {
        node.addEventListener('click', function() {
            const section = this.textContent.toLowerCase();
            loadSection(section);
        });
    });
    
    function loadSection(section) {
        const contentSection = document.getElementById('content');
        contentSection.style.display = 'block';
        
        // Scroll to content section
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: contentSection,
                offsetY: 0
            }
        });
        
        // Clear previous content
        contentSection.innerHTML = '';
        
        // Load section content (placeholder for now)
        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        contentSection.appendChild(sectionTitle);
        
        // You would load actual content here in a real implementation
    }
});