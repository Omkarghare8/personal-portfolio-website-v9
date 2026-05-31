// ============================================
        // PRELOADER
        // ============================================
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 2000);
        });

        // ============================================
        // CUSTOM CURSOR
        // ============================================
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-card, .service-card, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Hide cursor on mobile
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }

        // ============================================
        // THEME TOGGLE
        // ============================================
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // ============================================
        // MOBILE NAVIGATION
        // ============================================
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // ============================================
        // NAVBAR SCROLL EFFECT
        // ============================================
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ============================================
        // ACTIVE NAV LINK ON SCROLL
        // ============================================
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // ============================================
        // SCROLL REVEAL ANIMATIONS
        // ============================================
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // ============================================
        // TIMELINE ANIMATION
        // ============================================
        const timelineItems = document.querySelectorAll('.timeline-item');

        const animateTimeline = () => {
            timelineItems.forEach((item, index) => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight - 100) {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                }
            });
        };

        window.addEventListener('scroll', animateTimeline);
        window.addEventListener('load', animateTimeline);

        // ============================================
        // SKILLS PROGRESS ANIMATION
        // ============================================
        const progressBars = document.querySelectorAll('.progress-fill');

        const animateProgress = () => {
            progressBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (barTop < windowHeight - 50) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }
            });
        };

        window.addEventListener('scroll', animateProgress);

        // ============================================
        // COUNTER ANIMATION
        // ============================================
        const counters = document.querySelectorAll('.stat-number');
        let countersAnimated = false;

        const animateCounters = () => {
            if (countersAnimated) return;
            
            const heroSection = document.getElementById('hero');
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            
            if (heroBottom > 0) {
                countersAnimated = true;
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                });
            }
        };

        window.addEventListener('scroll', animateCounters);
        window.addEventListener('load', animateCounters);

        // ============================================
        // PORTFOLIO FILTER
        // ============================================
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // ============================================
        // TESTIMONIALS SLIDER
        // ============================================
        const slider = document.getElementById('testimonials-slider');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentSlide = 0;

        const updateSlider = () => {
            const card = testimonialCards[0];
            const cardWidth = card.offsetWidth;
            const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
            const scrollWidth = cardWidth + gap;
            
            slider.scrollTo({
                left: currentSlide * scrollWidth,
                behavior: 'smooth'
            });
        };

        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentSlide < testimonialCards.length - 1) {
                currentSlide++;
                updateSlider();
            }
        });

        // ============================================
        // SCROLL TO TOP
        // ============================================
        const scrollTopBtn = document.getElementById('scroll-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ============================================
        // CONTACT FORM
        // ============================================
        const contactForm = document.getElementById('contact-form');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });

        // ============================================
        // 3D TILT EFFECT ON CARDS
        // ============================================
        const tiltCards = document.querySelectorAll('.skill-card, .service-card, .portfolio-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // ============================================
        // PARALLAX EFFECT ON HERO SHAPES
        // ============================================
        const heroShapes = document.querySelectorAll('.hero-shape');

        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                
                shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });

        // ============================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ============================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ============================================
        // LAZY LOADING IMAGES (if you add real images)
        // ============================================
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }

        // ============================================
        // PERFORMANCE OPTIMIZATION - Debounce scroll events
        // ============================================
        function debounce(func, wait = 10) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Apply debounce to scroll-heavy functions
        window.addEventListener('scroll', debounce(() => {
            revealOnScroll();
            animateTimeline();
            animateProgress();
            animateCounters();
        }, 10));
