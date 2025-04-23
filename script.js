// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('click', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    });

    document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .menu-toggle').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(108, 92, 231, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(108, 92, 231, 0.5)';
        });
    });
});

// Navigation and Scroll
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Menu toggle for mobile
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Add active class to nav links when scrolling
    function highlightNavLink() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Back to top button visibility
    function handleScrollEvents() {
        // Navbar shrink on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        highlightNavLink();
    }

    // Back to top button click handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollEvents);
    
    // Initialize nav highlight on page load
    highlightNavLink();
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.getElementById('typewriter');
    const phrases = ['DevOps Engineer', 'Front-End Developer', 'Tech Enthusiast', 'Cloud Explorer'];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = '';
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeEffect() {
        const currentText = phrases[phraseIndex];
        
        if (isDeleting) {
            currentPhrase = currentText.substring(0, letterIndex - 1);
            letterIndex--;
            typeSpeed = 50;
        } else {
            currentPhrase = currentText.substring(0, letterIndex + 1);
            letterIndex++;
            typeSpeed = 100;
        }
        
        typewriter.textContent = currentPhrase;
        
        if (!isDeleting && letterIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at end of phrase
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typing effect
    typeEffect();
});

// Glitch Effect
document.addEventListener('DOMContentLoaded', () => {
    const glitchText = document.querySelector('.glitch-text');
    
    setInterval(() => {
        glitchText.classList.add('glitching');
        setTimeout(() => {
            glitchText.classList.remove('glitching');
        }, 200);
    }, 5000);
});

// Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return false;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Your message has been sent successfully!');
            contactForm.reset();
        });
    }
});

// Animate on scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .cert-item, .achievement-item');
    
    function checkInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkInView);
    checkInView(); // Check on initial load
});