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
    }
};

// Initialize the application
App.init();
