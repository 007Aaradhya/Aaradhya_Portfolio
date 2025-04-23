// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor click effect
    document.addEventListener('click', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    });

    // Cursor hover effects
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

    // Navigation elements
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.page');
    const contactBtn = document.getElementById('contactBtn');
    const projectsBtn = document.getElementById('projectsBtn');

    // Smooth scrolling function
    function smoothScrollTo(target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }

    // Navigation click handler
    allNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                smoothScrollTo(targetSection);
                
                // Update active nav link
                allNavLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
            
            // Close mobile menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Home page buttons
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) smoothScrollTo(contactSection);
        });
    }

    if (projectsBtn) {
        projectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) smoothScrollTo(projectsSection);
        });
    }

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll events handler
    function handleScroll() {
        // Navbar shrink effect
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        
        // Back to top button visibility
        backToTop.classList.toggle('visible', window.scrollY > 300);
        
        // Highlight active section in nav
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on load

    // Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
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
                typeSpeed = 1000;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validation
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
            
            // Success message (in a real app, you'd send to server here)
            alert('Your message has been sent successfully!');
            contactForm.reset();
        });
    }
});