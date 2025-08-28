// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
            hamburgers.forEach((hamburger, index) => {
                if (mobileMenu.classList.contains('active')) {
                    if (index === 0) {
                        hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        hamburger.style.opacity = '0';
                    } else if (index === 2) {
                        hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    }
                } else {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                
                // Reset hamburger menu
                const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                });
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                
                // Reset hamburger menu
                const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                });
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
    
    // Registration form handler
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const childFirstName = document.getElementById('childFirstName')?.value;
            const childLastName = document.getElementById('childLastName')?.value;
            const childAge = document.getElementById('childAge')?.value;
            const parentFirstName = document.getElementById('parentFirstName')?.value;
            const parentLastName = document.getElementById('parentLastName')?.value;
            const email = document.getElementById('email')?.value;
            const phone = document.getElementById('phone')?.value;
            const terms = document.getElementById('terms')?.checked;
            
            if (!childFirstName || !childLastName || !childAge || !parentFirstName || !parentLastName || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!terms) {
                alert('You must agree to the terms and conditions.');
                return;
            }
            
            // Show success message
            alert('Registration submitted successfully! Thank you for registering. We\'ll contact you soon with next steps.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Donation form functionality
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        const amountButtons = document.querySelectorAll('.amount-btn');
        const customAmountInput = document.getElementById('customAmount');
        
        // Handle amount button clicks
        if (amountButtons && customAmountInput) {
            amountButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    amountButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Clear custom amount input
                    customAmountInput.value = '';
                    
                    // Set the amount value
                    const amount = this.getAttribute('data-amount');
                    customAmountInput.setAttribute('data-selected', amount);
                });
            });
            
            // Handle custom amount input
            customAmountInput.addEventListener('input', function() {
                // Remove active class from all amount buttons when typing custom amount
                amountButtons.forEach(btn => btn.classList.remove('active'));
            });
        }
        
        // Handle donation form submission
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get donation amount
            let amount;
            const activeButton = document.querySelector('.amount-btn.active');
            const customAmountInput = document.getElementById('customAmount');
            
            if (activeButton) {
                amount = activeButton.getAttribute('data-amount');
            } else if (customAmountInput) {
                amount = customAmountInput.value;
            }
            
            if (!amount || amount <= 0) {
                alert('Please select or enter a donation amount.');
                return;
            }
            
            // Simple form validation
            const firstName = document.getElementById('donorFirstName')?.value;
            const lastName = document.getElementById('donorLastName')?.value;
            const email = document.getElementById('donorEmail')?.value;
            
            if (!firstName || !lastName || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message (in a real application, this would process the payment)
            alert(`Thank you for your donation of $${amount}! Your contribution helps empower young Muslim leaders.`);
            
            // Reset form
            this.reset();
            if (amountButtons) {
                amountButtons.forEach(btn => btn.classList.remove('active'));
            }
            const oneTimeRadio = document.getElementById('one-time');
            if (oneTimeRadio) {
                oneTimeRadio.checked = true;
            }
        });
    }
});