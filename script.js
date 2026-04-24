// =====================================================
// Dr K. Mashaba's Herbal Website - Main JavaScript
// =====================================================

// =====================================================
// 1. NAVIGATION & MENU MANAGEMENT
// =====================================================

const Navigation = {
    hamburger: null,
    navMenu: null,

    init() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.setupHamburgerMenu();
        this.setupNavLinks();
        this.setupClickOutside();
    },

    setupHamburgerMenu() {
        if (!this.hamburger) return;
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
    },

    setupNavLinks() {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    },

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            if (this.hamburger && !this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    },

    closeMenu() {
        if (this.hamburger) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
        }
    }
};

// =====================================================
// 2. SMOOTH SCROLLING
// =====================================================

const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// =====================================================
// 3. ANIMATIONS & OBSERVERS
// =====================================================

const Animations = {
    observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },

    init() {
        this.setupFadeInAnimation();
        this.setupLoadingAnimation();
    },

    setupFadeInAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.about, .services, .products, .product-card').forEach(el => {
            observer.observe(el);
        });
    },

    setupLoadingAnimation() {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loaded');
        });
    }
};

// =====================================================
// 4. PRODUCT INTERACTIONS
// =====================================================

const Products = {
    init() {
        this.setupProductCardHover();
        this.setupProductButtons();
    },

    setupProductCardHover() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    },

    setupProductButtons() {
        // Product buttons now link directly to product pages
    }
};

// =====================================================
// 5. SHOPPING CART MANAGEMENT
// =====================================================

const Cart = {
    items: [],
    storageKey: 'cart',
    whatsappNumber: '27795255211',

    init() {
        this.loadCart();
        this.setupAddToCartButtons();
        this.setupCheckoutButton();
        this.updateDisplay();
    },

    loadCart() {
        this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    },

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    },

    addItem(product) {
        if (!this.items.includes(product)) {
            this.items.push(product);
            this.saveCart();
            alert(`${product} added to cart!`);
            this.updateDisplay();
            return true;
        } else {
            alert(`${product} is already in your cart.`);
            return false;
        }
    },

    removeItem(product) {
        this.items = this.items.filter(item => item !== product);
        this.saveCart();
        this.updateDisplay();
    },

    updateDisplay() {
        const cartItemsDiv = document.getElementById('cart-items');
        if (!cartItemsDiv) return;

        if (this.items.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItemsDiv.innerHTML = '<ul>' + 
                this.items.map(item => `<li>${item} <button class="remove-item" data-item="${item}">Remove</button></li>`).join('') + 
                '</ul>';
            this.setupRemoveButtons();
        }
    },

    setupRemoveButtons() {
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.getAttribute('data-item');
                this.removeItem(item);
            });
        });
    },

    setupAddToCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const product = button.getAttribute('data-product');
                this.addItem(product);
            });
        });
    },

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty. Add some products first.');
            return;
        }

        const message = encodeURIComponent(
            `Hello, I would like to order the following products: ${this.items.join(', ')}`
        );
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    },

    setupCheckoutButton() {
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }
};

const ContactForm = {
    whatsappNumber: '27795255211',
    
    // Input validation patterns
    patterns: {
        name: /^[a-zA-Z\s'-]{2,50}$/,
        phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
        message: /^[a-zA-Z0-9\s.,!?'-]{5,500}$/
    },

    // Sanitize input to prevent XSS
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    // Validate individual fields
    validateField(field, pattern) {
        if (!pattern.test(field)) {
            return false;
        }
        return true;
    },

    init() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        // Set up form submission
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.sendMessage();
        });

        // Add real-time validation feedback
        const nameInput = document.getElementById('contact-name');
        const phoneInput = document.getElementById('contact-phone');
        const messageInput = document.getElementById('contact-message');

        if (nameInput) nameInput.addEventListener('blur', () => this.validateName(nameInput));
        if (phoneInput) phoneInput.addEventListener('blur', () => this.validatePhone(phoneInput));
        if (messageInput) messageInput.addEventListener('blur', () => this.validateMessage(messageInput));
    },

    validateName(input) {
        if (!this.validateField(input.value.trim(), this.patterns.name)) {
            input.classList.add('invalid');
            return false;
        }
        input.classList.remove('invalid');
        return true;
    },

    validatePhone(input) {
        if (!this.validateField(input.value.trim(), this.patterns.phone)) {
            input.classList.add('invalid');
            return false;
        }
        input.classList.remove('invalid');
        return true;
    },

    validateMessage(input) {
        if (!this.validateField(input.value.trim(), this.patterns.message)) {
            input.classList.add('invalid');
            return false;
        }
        input.classList.remove('invalid');
        return true;
    },

    sendMessage() {
        const name = document.getElementById('contact-name')?.value.trim();
        const phone = document.getElementById('contact-phone')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();

        // Validate all fields
        if (!name || !phone || !message) {
            alert('Please fill in all fields before sending.');
            return;
        }

        if (!this.validateField(name, this.patterns.name)) {
            alert('Please enter a valid name (2-50 characters, letters and spaces only).');
            return;
        }

        if (!this.validateField(phone, this.patterns.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        if (!this.validateField(message, this.patterns.message)) {
            alert('Message must be 5-500 characters and contain only letters, numbers, and basic punctuation.');
            return;
        }

        // Sanitize inputs to prevent XSS
        const sanitizedName = this.sanitizeInput(name);
        const sanitizedPhone = this.sanitizeInput(phone);
        const sanitizedMessage = this.sanitizeInput(message);

        const formattedMessage = `Hello Prof Kokwana Mashaba, my name is ${sanitizedName}. My phone number is ${sanitizedPhone}. I would like to inquire about: ${sanitizedMessage}`;
        const encoded = encodeURIComponent(formattedMessage);
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encoded}`;
        
        // Use feature detection and secure window opening
        if (window.open) {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    }
};

// =====================================================
// 6. APP INITIALIZATION
// =====================================================

const App = {
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAll());
        } else {
            this.setupAll();
        }
    },

    setupAll() {
        Navigation.init();
        SmoothScroll.init();
        Animations.init();
        Products.init();
        Cart.init();
        ContactForm.init();
    }
};

// Initialize the application
App.init();
