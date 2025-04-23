document.addEventListener('DOMContentLoaded', function() {
    // Cursor Effect
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button').forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
            });
            item.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
            });
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Show the home page by default
    showPage('home');

    // Page navigation - no scrolling, just switching between pages
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the # character
            
            // Update active class in navigation
            document.querySelectorAll('.nav-links a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show the target page
            showPage(targetId);
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Handle other internal links (buttons that link to sections)
    document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the # character
            
            // Update active class in navigation
            document.querySelectorAll('.nav-links a').forEach(item => {
                item.classList.remove('active');
                if(item.getAttribute('href') === '#' + targetId) {
                    item.classList.add('active');
                }
            });
            
            // Show the target page
            showPage(targetId);
        });
    });

    // Function to show specific page and hide others
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            // Reset to top of the page container
            document.querySelector('.page-container').scrollTop = 0;
        }
    }

    // Back to Home Button (instead of Back to Top)
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            showPage('home');
            // Update active class in navigation
            document.querySelectorAll('.nav-links a').forEach(item => {
                item.classList.remove('active');
                if(item.getAttribute('href') === '#home') {
                    item.classList.add('active');
                }
            });
        });
        
        // Always show the button
        backToTop.classList.add('visible');
    }

    // Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const phrases = ['DevOps Engineer', 'Front-End Developer', 'Tech Enthusiast', 'Cloud Explorer'];
        let phraseIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        let speed = 100;

        function type() {
            const currentText = phrases[phraseIndex];
            const displayText = isDeleting 
                ? currentText.substring(0, letterIndex - 1)
                : currentText.substring(0, letterIndex + 1);
            
            typewriter.textContent = displayText;
            letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;
            
            if (!isDeleting && displayText === currentText) {
                speed = 1000;
                isDeleting = true;
            } else if (isDeleting && displayText === '') {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 500;
            }
            
            setTimeout(type, speed);
        }
        
        type();
    }

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email');
                return;
            }
            alert('Message sent! (This is a demo)');
            this.reset();
        });
    }
});