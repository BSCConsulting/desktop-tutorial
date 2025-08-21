// Aura Beauty Studio - Main JavaScript File
// Optimized for Hostinger deployment

// Global variables
let cart = [];
let currentFilter = 'All';
let searchTimeout;

// Product data - Optimized for performance
const products = [
    { id: 1, name: "Radiance Vitamin C Face Serum", category: "Skincare", price: 599, description: "Potent vitamin C serum for brighter, even-toned skin. Fights dullness and dark spots.", size: "30 ml", image: "https://images.pexels.com/photos/7755466/pexels-photo-7755466.jpeg" },
    { id: 2, name: "Hydra Glow Hyaluronic Moisturizer", category: "Skincare", price: 499, description: "Lightweight gel moisturizer with hyaluronic acid for all-day hydration and plump skin.", size: "50 g", image: "https://images.pexels.com/photos/6621491/pexels-photo-6621491.jpeg" },
    { id: 3, name: "Gentle Foaming Cleanser", category: "Skincare", price: 349, description: "Soap-free, pH-balanced cleanser suitable for all skin types. Removes impurities gently.", size: "100 ml", image: "https://images.pexels.com/photos/7755499/pexels-photo-7755499.jpeg" },
    { id: 4, name: "Ubtan De-Tan Face Pack", category: "Skincare", price: 399, description: "Herbal mask with turmeric and saffron for tan removal and glow.", size: "100 g", image: "https://images.pexels.com/photos/7755502/pexels-photo-7755502.jpeg" },
    { id: 5, name: "Ultra-Light Sunscreen SPF 50", category: "Skincare", price: 399, description: "Non-greasy, broad-spectrum sun protection for Indian climate.", size: "50 g", image: "https://images.pexels.com/photos/7755470/pexels-photo-7755470.jpeg" },
    { id: 6, name: "Revive Night Repair Cream", category: "Skincare", price: 599, description: "Overnight cream with peptides and antioxidants for youthful, refreshed skin.", size: "50 g", image: "https://images.pexels.com/photos/7755482/pexels-photo-7755482.jpeg" },
    { id: 7, name: "Cherry Tinted Lip Balm", category: "Lip Care", price: 199, description: "Nourishing lip balm with cherry tint and SPF 15.", size: "4 g", image: "https://images.pexels.com/photos/8129903/pexels-photo-8129903.jpeg" },
    { id: 8, name: "Moisture Matte Long Stay Lipstick", category: "Color Cosmetics", price: 399, description: "Intense color payoff, lightweight matte finish. Long-lasting comfort.", size: "12 shades", image: "https://images.pexels.com/photos/4620842/pexels-photo-4620842.jpeg" },
    { id: 9, name: "Glow Serum Foundation", category: "Color Cosmetics", price: 499, description: "Buildable coverage foundation with serum benefits for radiant skin.", size: "5 shades", image: "https://images.pexels.com/photos/6621487/pexels-photo-6621487.jpeg" },
    { id: 10, name: "All-in-One Face Palette", category: "Color Cosmetics", price: 699, description: "Palette with blush, highlighter, and bronzer for a complete look on-the-go.", size: "Universal", image: "https://images.pexels.com/photos/8129901/pexels-photo-8129901.jpeg" },
    { id: 11, name: "Blackest Black Kajal", category: "Color Cosmetics", price: 199, description: "Smudge-proof, waterproof kajal for bold, defined eyes.", size: "1 g", image: "https://images.pexels.com/photos/8129904/pexels-photo-8129904.jpeg" },
    { id: 12, name: "Lash Care Volumizing Mascara", category: "Color Cosmetics", price: 349, description: "Adds dramatic volume and nourishes lashes with castor oil.", size: "9 ml", image: "https://images.pexels.com/photos/8129902/pexels-photo-8129902.jpeg" },
    { id: 13, name: "Brow Definer Pencil", category: "Color Cosmetics", price: 249, description: "Dual-ended brow pencil for natural-looking, defined brows.", size: "2 shades", image: "https://images.pexels.com/photos/8129905/pexels-photo-8129905.jpeg" },
    { id: 14, name: "Hydra Shine Lip Gloss", category: "Color Cosmetics", price: 299, description: "Non-sticky, high-shine gloss with hydrating oils.", size: "5 shades", image: "https://images.pexels.com/photos/8129900/pexels-photo-8129900.jpeg" },
    { id: 15, name: "Nail Lacquer – Classic Reds", category: "Nails", price: 149, description: "Chip-resistant, high-gloss nail color in classic red tones.", size: "3 shades", image: "https://images.pexels.com/photos/8129906/pexels-photo-8129906.jpeg" },
    { id: 16, name: "Nail Strengthener Base Coat", category: "Nails", price: 199, description: "Fortifies weak nails and extends the life of your manicure.", size: "10 ml", image: "https://images.pexels.com/photos/8129907/pexels-photo-8129907.jpeg" },
    { id: 17, name: "Nourish & Repair Hair Oil", category: "Haircare", price: 349, description: "Blend of coconut, argan, and bhringraj oils for stronger, shinier hair.", size: "100 ml", image: "https://images.pexels.com/photos/7755479/pexels-photo-7755479.jpeg" },
    { id: 18, name: "Onion & Biotin Hair Growth Shampoo", category: "Haircare", price: 399, description: "Promotes hair growth and reduces breakage with onion and biotin.", size: "250 ml", image: "https://images.pexels.com/photos/7755481/pexels-photo-7755481.jpeg" },
    { id: 19, name: "Keratin Smooth Conditioner", category: "Haircare", price: 399, description: "Tames frizz and adds shine with keratin and silk proteins.", size: "200 ml", image: "https://images.pexels.com/photos/7755483/pexels-photo-7755483.jpeg" },
    { id: 20, name: "Anti-Dandruff Scalp Serum", category: "Haircare", price: 399, description: "Soothes itchy scalp and reduces flakes with tea tree and rosemary.", size: "50 ml", image: "https://images.pexels.com/photos/7755485/pexels-photo-7755485.jpeg" },
    { id: 21, name: "Protein Repair Hair Mask", category: "Haircare", price: 499, description: "Deep conditioning mask for damaged, brittle hair.", size: "200 g", image: "https://images.pexels.com/photos/7755487/pexels-photo-7755487.jpeg" },
    { id: 22, name: "Volumizing Dry Shampoo", category: "Haircare", price: 299, description: "Instantly refreshes hair and adds volume between washes.", size: "100 ml", image: "https://images.pexels.com/photos/7755489/pexels-photo-7755489.jpeg" },
    { id: 23, name: "Silk Touch Hair Serum", category: "Haircare", price: 349, description: "Lightweight serum for frizz-free, glossy hair.", size: "50 ml", image: "https://images.pexels.com/photos/7755491/pexels-photo-7755491.jpeg" },
    { id: 24, name: "Men's Oil Control Face Wash", category: "Men's Grooming", price: 249, description: "Deep cleanses and controls oil with charcoal and menthol.", size: "100 ml", image: "https://images.pexels.com/photos/7755493/pexels-photo-7755493.jpeg" },
    { id: 25, name: "Men's Beard & Face Moisturizer", category: "Men's Grooming", price: 349, description: "Dual-action moisturizer for face and beard, enriched with aloe and vitamin E.", size: "50 g", image: "https://images.pexels.com/photos/7755495/pexels-photo-7755495.jpeg" },
    { id: 26, name: "Men's Beard Growth Oil", category: "Men's Grooming", price: 349, description: "Stimulates beard growth with argan and jojoba oils.", size: "30 ml", image: "https://images.pexels.com/photos/7755497/pexels-photo-7755497.jpeg" },
    { id: 27, name: "Men's 3-in-1 Shaving Gel", category: "Men's Grooming", price: 299, description: "For shaving, cleansing, and moisturizing in one step.", size: "100 ml", image: "https://images.pexels.com/photos/7755500/pexels-photo-7755500.jpeg" },
    { id: 28, name: "Men's Aftershave Balm", category: "Men's Grooming", price: 249, description: "Soothes and hydrates skin post-shave with chamomile and aloe.", size: "50 ml", image: "https://images.pexels.com/photos/7755501/pexels-photo-7755501.jpeg" },
    { id: 29, name: "Herbal Bathing Bar – Aloe & Neem", category: "Bodycare", price: 99, description: "Gentle, antibacterial bathing bar for fresh, soft skin.", size: "100 g", image: "https://images.pexels.com/photos/7755503/pexels-photo-7755503.jpeg" },
    { id: 30, name: "Uplift Body Lotion – Shea & Almond", category: "Bodycare", price: 249, description: "Deeply nourishing body lotion for all-day softness.", size: "200 ml", image: "https://images.pexels.com/photos/7755505/pexels-photo-7755505.jpeg" },
    { id: 31, name: "Vitamin C Body Wash", category: "Bodycare", price: 249, description: "Refreshing body wash with vitamin C for radiant, energized skin.", size: "250 ml", image: "https://images.pexels.com/photos/7755507/pexels-photo-7755507.jpeg" },
    { id: 32, name: "Hand & Nail Cream – Rose", category: "Bodycare", price: 199, description: "Hydrates hands and strengthens nails with rose and shea butter.", size: "50 g", image: "https://images.pexels.com/photos/7755509/pexels-photo-7755509.jpeg" },
    { id: 33, name: "Foot Softening Cream – Peppermint", category: "Bodycare", price: 199, description: "Repairs cracked heels and refreshes tired feet.", size: "50 g", image: "https://images.pexels.com/photos/7755511/pexels-photo-7755511.jpeg" },
    { id: 34, name: "Wellness Biotin Gummies", category: "Wellness", price: 399, description: "Tasty biotin gummies for healthy hair, skin, and nails.", size: "30 gummies", image: "https://images.pexels.com/photos/7755513/pexels-photo-7755513.jpeg" },
    { id: 35, name: "Collagen Boost Effervescent Tablets", category: "Wellness", price: 349, description: "Supports skin elasticity and hydration.", size: "20 tablets", image: "https://images.pexels.com/photos/7755515/pexels-photo-7755515.jpeg" },
    { id: 36, name: "Detox Herbal Green Tea", category: "Wellness", price: 299, description: "Antioxidant-rich green tea blend for daily detox.", size: "30 bags", image: "https://images.pexels.com/photos/7755517/pexels-photo-7755517.jpeg" },
    { id: 37, name: "Hydrating Facial Mist – Rose", category: "Skincare", price: 249, description: "Instantly refreshes and tones with pure rose water.", size: "100 ml", image: "https://images.pexels.com/photos/7755519/pexels-photo-7755519.jpeg" },
    { id: 38, name: "Makeup Remover Micellar Water", category: "Skincare", price: 299, description: "Gently removes makeup and impurities, suitable for sensitive skin.", size: "200 ml", image: "https://images.pexels.com/photos/7755521/pexels-photo-7755521.jpeg" },
    { id: 39, name: "Gentle Exfoliating Face Scrub", category: "Skincare", price: 349, description: "Removes dead skin cells with walnut and apricot granules.", size: "100 g", image: "https://images.pexels.com/photos/7755523/pexels-photo-7755523.jpeg" },
    { id: 40, name: "Glow Boost Sheet Mask – Vitamin C", category: "Skincare", price: 149, description: "Single-use sheet mask for instant radiance and hydration.", size: "1 mask", image: "https://images.pexels.com/photos/7755525/pexels-photo-7755525.jpeg" },
    { id: 41, name: "Bright Eyes Under Eye Cream", category: "Skincare", price: 399, description: "Reduces dark circles and puffiness with caffeine and peptides.", size: "20 g", image: "https://images.pexels.com/photos/7755527/pexels-photo-7755527.jpeg" }
];

// WhatsApp Integration - Optimized for production
function openWhatsApp() {
    try {
        const phoneNumber = '918008893024';
        const message = encodeURIComponent('Hi! I\'m interested in your beauty products. Can you help me?');
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.error('WhatsApp integration error:', error);
        showNotification('Unable to open WhatsApp. Please try again.', 'error');
    }
}

// Initialize the website - DOM ready check
function initializeWebsite() {
    try {
        loadProducts();
        setupEventListeners();
        initializeAnimations();
        console.log('Aura Beauty Studio initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// DOM Content Loaded Event
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// Initialize animations and floating elements
function initializeAnimations() {
    try {
        // Add floating beauty elements to hero section
        const hero = document.querySelector('.hero');
        if (hero && !hero.querySelector('.floating-elements')) {
            const floatingContainer = document.createElement('div');
            floatingContainer.className = 'floating-elements';
            
            const beautyIcons = ['💄', '✨', '💅', '🌸', '💋', '🌺', '💫', '🦋'];
            
            beautyIcons.forEach((icon, index) => {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.textContent = icon;
                element.style.animationDelay = `${index * 2}s`;
                floatingContainer.appendChild(element);
            });
            
            hero.appendChild(floatingContainer);
        }
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
        
        // Observe product cards for staggered animation
        setTimeout(() => {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => observer.observe(card));
        }, 100);
    } catch (error) {
        console.error('Animation initialization error:', error);
    }
}

// Setup event listeners - Error handling added
function setupEventListeners() {
    try {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }
        
        // Mobile search
        const mobileSearchInput = document.querySelector('.mobile-search input');
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', handleSearch);
        }

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmission);
        }

        // Close modals on outside click
        document.addEventListener('click', handleOutsideClicks);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
    } catch (error) {
        console.error('Event listener setup error:', error);
    }
}

// Load and display products - Performance optimized
function loadProducts(filter = 'All', searchQuery = '') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    try {
        // Show loading state
        productsGrid.innerHTML = '<div class="loading">Loading products...</div>';
        
        let filteredProducts = products;
        
        // Apply category filter
        if (filter !== 'All') {
            filteredProducts = products.filter(product => product.category === filter);
        }
        
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        }
        
        // Use requestAnimationFrame for smooth rendering
        requestAnimationFrame(() => {
            productsGrid.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                productsGrid.innerHTML = '<div class="no-results">No products found matching your search.</div>';
                return;
            }
            
            // Use document fragment for better performance
            const fragment = document.createDocumentFragment();
            
            filteredProducts.forEach((product, index) => {
                const productCard = createProductCard(product, index);
                fragment.appendChild(productCard);
            });
            
            productsGrid.appendChild(fragment);
        });
        
    } catch (error) {
        console.error('Product loading error:', error);
        productsGrid.innerHTML = '<div class="no-results">Error loading products. Please refresh the page.</div>';
    }
}

// Create product card element - Optimized
function createProductCard(product, index = 0) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const categoryClass = product.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='">
        <div class="product-info">
            <div class="product-header">
                <span class="product-category ${categoryClass}">${product.category}</span>
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" aria-label="Add to wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <h4 class="product-name">${product.name}</h4>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">₹${product.price}</span>
                <span class="product-size">${product.size}</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Filter products by category
function filterProducts(category) {
    try {
        currentFilter = category;
        
        // Update active category button
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Find and activate the correct button
        categoryButtons.forEach(btn => {
            if (btn.textContent.includes(category === 'All' ? 'All Products' : category)) {
                btn.classList.add('active');
            }
        });
        
        // Get current search query
        const searchInput = document.getElementById('searchInput');
        const mobileSearchInput = document.querySelector('.mobile-search input');
        const searchQuery = searchInput ? searchInput.value : '';
        const mobileSearchQuery = mobileSearchInput ? mobileSearchInput.value : '';
        const finalSearchQuery = searchQuery || mobileSearchQuery;
        
        loadProducts(category, finalSearchQuery);
    } catch (error) {
        console.error('Filter error:', error);
    }
}

// Handle search - Debounced for performance
function handleSearch(event) {
    try {
        const searchQuery = event.target.value;
        
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // Sync search inputs
        const searchInput = document.getElementById('searchInput');
        const mobileSearchInput = document.querySelector('.mobile-search input');
        
        if (event.target === searchInput && mobileSearchInput) {
            mobileSearchInput.value = searchQuery;
        } else if (event.target === mobileSearchInput && searchInput) {
            searchInput.value = searchQuery;
        }
        
        // Debounce search to improve performance
        searchTimeout = setTimeout(() => {
            loadProducts(currentFilter, searchQuery);
        }, 300);
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Add product to cart
function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
            showNotification(`${product.name} quantity updated!`, 'info');
        } else {
            cart.push({ ...product, quantity: 1 });
            showNotification(`${product.name} added to cart!`, 'success');
        }
        
        updateCartUI();
        
        // Save cart to localStorage
        localStorage.setItem('auraBeautyCart', JSON.stringify(cart));
    } catch (error) {
        console.error('Add to cart error:', error);
        showNotification('Error adding product to cart', 'error');
    }
}

// Remove product from cart
function removeFromCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
        
        // Save cart to localStorage
        localStorage.setItem('auraBeautyCart', JSON.stringify(cart));
        
        if (product) {
            showNotification(`${product.name} removed from cart!`, 'error');
        }
    } catch (error) {
        console.error('Remove from cart error:', error);
    }
}

// Update product quantity in cart
function updateQuantity(productId, newQuantity) {
    try {
        if (newQuantity === 0) {
            removeFromCart(productId);
            return;
        }
        
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            updateCartUI();
            
            // Save cart to localStorage
            localStorage.setItem('auraBeautyCart', JSON.stringify(cart));
        }
    } catch (error) {
        console.error('Update quantity error:', error);
    }
}

// Update cart UI
function updateCartUI() {
    try {
        const cartCount = document.getElementById('cartCount');
        const mobileCartCount = document.getElementById('mobileCartCount');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartTotal = document.getElementById('cartTotal');
        
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Update cart count
        if (cartCount) cartCount.textContent = totalItems;
        if (mobileCartCount) mobileCartCount.textContent = totalItems;
        
        // Update cart items
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                if (cartFooter) cartFooter.style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₹${item.price}</div>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})" aria-label="Increase quantity">+</button>
                                <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                if (cartFooter) cartFooter.style.display = 'block';
            }
        }
        
        // Update total
        if (cartTotal) cartTotal.textContent = totalPrice;
    } catch (error) {
        console.error('Cart UI update error:', error);
    }
}

// Toggle cart sidebar
function toggleCart() {
    try {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('open');
        }
    } catch (error) {
        console.error('Toggle cart error:', error);
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    try {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('open');
        }
    } catch (error) {
        console.error('Toggle mobile menu error:', error);
    }
}

// Toggle wishlist
function toggleWishlist(productId) {
    try {
        const button = event.target.closest('.wishlist-btn');
        const icon = button.querySelector('i') || button;
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#e91e63';
            showNotification('Added to wishlist!', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
            showNotification('Removed from wishlist!', 'info');
        }
    } catch (error) {
        console.error('Toggle wishlist error:', error);
    }
}

// Show notification - Enhanced for production
function showNotification(message, type = 'success') {
    try {
        const colors = {
            success: 'linear-gradient(135deg, #4caf50, #45a049)',
            info: 'linear-gradient(135deg, #2196f3, #1976d2)',
            error: 'linear-gradient(135deg, #f44336, #d32f2f)'
        };
        
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.success};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            font-size: 14px;
        `;
        
        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            error: 'fas fa-exclamation-circle'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="${icons[type] || icons.success}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    } catch (error) {
        console.error('Notification error:', error);
    }
}

// Handle form submission - WhatsApp integration
function handleFormSubmission(e) {
    e.preventDefault();
    
    try {
        // Get form data
        const formData = new FormData(e.target);
        const fullName = formData.get('fullName')?.trim();
        const email = formData.get('email')?.trim();
        const mobile = formData.get('mobile')?.trim();
        const subject = formData.get('subject');
        const message = formData.get('message')?.trim();
        
        // Basic validation
        if (!fullName || !email || !mobile || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Mobile validation
        const mobileRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!mobileRegex.test(mobile)) {
            showNotification('Please enter a valid mobile number', 'error');
            return;
        }
        
        // Create WhatsApp message
        const subjectText = e.target.querySelector(`option[value="${subject}"]`)?.textContent || subject;
        const whatsappMessage = `Hi! I'm ${fullName}.

📧 Email: ${email}
📱 Mobile: ${mobile}
📋 Subject: ${subjectText}

💬 Message: ${message}

Please get back to me. Thank you!`;
        
        // Open WhatsApp with the message
        const phoneNumber = '918008893024';
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        
        // Show success message
        showNotification('✨ Redirecting to WhatsApp! Your message is ready to send. 💕', 'success');
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Error processing form. Please try again.', 'error');
    }
}

// Handle outside clicks for modals
function handleOutsideClicks(event) {
    try {
        // Close cart when clicking outside
        const cartSidebar = document.getElementById('cartSidebar');
        const cartBtn = document.querySelector('.cart-btn');
        const mobileCartBtn = document.querySelector('.mobile-cart-btn');
        
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            if (!cartSidebar.contains(event.target) && 
                !cartBtn?.contains(event.target) && 
                !mobileCartBtn?.contains(event.target)) {
                cartSidebar.classList.remove('open');
            }
        }
        
        // Close mobile menu when clicking outside
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn?.contains(event.target)) {
                mobileMenu.classList.remove('open');
            }
        }
    } catch (error) {
        console.error('Outside click handler error:', error);
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    try {
        // Close modals with Escape key
        if (event.key === 'Escape') {
            const cartSidebar = document.getElementById('cartSidebar');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (cartSidebar?.classList.contains('open')) {
                cartSidebar.classList.remove('open');
            }
            
            if (mobileMenu?.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        }
    } catch (error) {
        console.error('Keyboard navigation error:', error);
    }
}

// Load cart from localStorage on page load
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('auraBeautyCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
    } catch (error) {
        console.error('Load cart from storage error:', error);
        cart = [];
    }
}

// Initialize cart from storage
loadCartFromStorage();

// Performance optimization - Lazy load images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling for global errors
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export functions for global access (if needed)
window.AuraBeautyStudio = {
    openWhatsApp,
    toggleCart,
    toggleMobileMenu,
    filterProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist
};