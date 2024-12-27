// Add this at the beginning of script.js
let pageStack = [];

// Function to navigate to a new page
function navigateToPage(url) {
    pageStack.push(window.location.href); // Save current page to stack
    window.location.href = url;
}

// Function to go back to previous page
function goBack() {
    if (pageStack.length > 0) {
        const previousPage = pageStack.pop();
        window.location.href = previousPage;
    } else {
        // If stack is empty, go to home page
        window.location.href = 'index.html';
    }
}

// Slider functionality
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

// Auto slide
setInterval(() => showSlide(currentSlide + 1), 5000);

// Product Modal Functionality
const descriptions = {
    "Personalized Photo Mug": "Transform your favorite memories into a beautiful ceramic mug! Our high-quality mugs feature vibrant color printing that won't fade. Perfect for morning coffee or evening tea.",
    "Custom T-Shirt": "Premium quality cotton t-shirt with smooth finish for perfect printing. Available in multiple sizes and colors. Breathable fabric that's perfect for daily wear.",
    "Photo Cushion": "Soft and comfortable cushion with your cherished photos. Made with premium quality fabric and filled with high-grade polyester.",
    "Custom Phone Case": "Durable and stylish phone case with your personal touch. Precise cutouts for all ports and buttons. Available for all popular phone models.",
    "Wall Art Canvas": "Gallery-quality canvas prints that bring your walls to life. Printed using HD technology for sharp, vivid images.",
    // Add descriptions for your other products here
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // First check if modal exists, if not create it
    let modal = document.getElementById('productModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'productModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="product-details">
                    <div class="product-details-image">
                        <img id="modalProductImage" src="" alt="Product Image">
                    </div>
                    <div class="product-details-info">
                        <h2 id="modalProductTitle"></h2>
                        <div class="rating">
                            <span id="modalProductRating" class="stars"></span>
                            <span id="modalProductReviews" class="reviews"></span>
                        </div>
                        <p id="modalProductPrice" class="price"></p>
                        <div class="product-description">
                            <h3>Product Description</h3>
                            <p id="modalProductDescription"></p>
                        </div>
                        <div class="modal-buttons">
                            <a id="whatsappButton" href="" target="_blank" class="whatsapp-btn">
                                <i class="fab fa-whatsapp"></i> Buy on WhatsApp
                            </a>
                            <button id="addToCartButton" class="add-to-cart-btn">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function openProductModal(event) {
        console.log('Opening modal...'); 
        
        event.preventDefault();
        event.stopPropagation();

        const product = event.target.closest('.product-card');
        console.log('Product element:', product);
        
        if (!product) {
            console.error('Product card not found!');
            return;
        }

        const title = product.querySelector('h3').textContent;
        const price = product.querySelector('.price').textContent;
        const rating = product.querySelector('.rating .stars').textContent;
        const reviews = product.querySelector('.rating .reviews').textContent;
        const imageUrl = product.querySelector('img').src;

        console.log('Product details:', { title, price, rating, reviews, imageUrl });

        try {
            document.getElementById('modalProductTitle').textContent = title;
            document.getElementById('modalProductImage').src = imageUrl;
            document.getElementById('modalProductPrice').textContent = price;
            document.getElementById('modalProductRating').textContent = rating;
            document.getElementById('modalProductReviews').textContent = reviews;

            // Get description from the descriptions object or use a default description
            const description = descriptions[title] || 
                `This is a premium quality ${title.toLowerCase()} that you can personalize according to your preferences.`;
            document.getElementById('modalProductDescription').textContent = description;

            // Update WhatsApp button
            const whatsappNumber = '911234567890'; // Replace with your actual WhatsApp number
            const message = encodeURIComponent(`Hi! I'm interested in buying ${title} for ${price}`);
            document.getElementById('whatsappButton').href = 
                `https://wa.me/${+917524963330}?text=${message}`;

            modal.style.display = 'block';
        } catch (error) {
            console.error('Error updating modal:', error);
        }
    }

    // Add event listeners for buy now buttons
    document.querySelectorAll('.buy-now-btn').forEach(button => {
        button.addEventListener('click', openProductModal);
    });

    // Close modal when clicking the close button
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = 'none';
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Add event listener for the "Add to Cart" button
    const addToCartButton = document.getElementById('addToCartButton');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }

    const aboutUsButton = document.querySelector('a[href="#about"]');
    const aboutSection = document.getElementById('about');

    aboutUsButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        aboutSection.style.display = aboutSection.style.display === 'block' ? 'none' : 'block';
        aboutSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the section
    });

    // Add click handlers to all navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default behavior - let browser handle navigation naturally
            // This allows the browser's back button to work as expected
        });
    });

    // Back button functionality
    if (!window.location.href.includes('index.html') && !isHomePage()) {
        const goBackButton = document.createElement('button');
        goBackButton.innerHTML = '← Back';
        goBackButton.className = 'back-button';
        goBackButton.addEventListener('click', function() {
            // Navigate back to home page or previous page
            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
        document.body.appendChild(goBackButton);
    }

    // Handle middle section navigation links
    const middleNavLinks = document.querySelectorAll('.service-links a, .middle-nav a');
    middleNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default - let browser handle navigation naturally
            // This ensures browser's back button works correctly
        });
    });
});

// Stop propagation for quick view button clicks
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Add to cart function
function addToCart() {
    const product = document.querySelector('.modal-content .product-details-info');
    const title = product.querySelector('#modalProductTitle').textContent;
    const price = product.querySelector('#modalProductPrice').textContent;
    const imageUrl = document.querySelector('#modalProductImage').src;
    const quantity = 1; // Default quantity

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.title === title);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ title, price, imageUrl, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart:\n' + `Product: ${title}\nPrice: ${price}`);

    // Close the modal
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';

    // Redirect to home page
    window.location.href = 'index.html';
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Pagination logic
const productsPerPage = 10;
let currentPage = 1;

function displayProducts(page) {
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.children);
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Hide all products
    products.forEach(product => product.style.display = 'none');

    // Calculate start and end index for the current page
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    // Show products for the current page
    products.slice(start, end).forEach(product => product.style.display = 'block');

    // Update pagination info
    document.getElementById('pageInfo').textContent = `Page ${page} of ${totalPages}`;

    // Enable/disable pagination buttons
    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = page === totalPages;
}

// Event listeners for pagination buttons
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(document.querySelector('.product-grid').children.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage);
    }
});

// Initialize the first page
document.addEventListener('DOMContentLoaded', () => displayProducts(currentPage));

// Function to sort products
function sortProducts(criteria) {
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.children);

    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace('₹', ''));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace('₹', ''));

        switch (criteria) {
            case 'Price: Low to High':
                return priceA - priceB;
            case 'Price: High to Low':
                return priceB - priceA;
            case 'New':
                // Assuming new products have a specific class or data attribute
                return a.dataset.newest - b.dataset.newest;
            default:
                return 0; // Default or recommended sorting
        }
    });

    // Clear and re-append sorted products
    productGrid.innerHTML = '';
    products.forEach(product => productGrid.appendChild(product));
}

// Event listener for sort options
document.getElementById('sortOptions').addEventListener('change', (event) => {
    sortProducts(event.target.value);
});

// Customer Review Slider functionality
const reviewSlides = document.querySelectorAll('.review-slide');
let currentReview = 0;

function showReview(n) {
    reviewSlides.forEach(slide => slide.classList.remove('active'));
    currentReview = (n + reviewSlides.length) % reviewSlides.length;
    reviewSlides[currentReview].classList.add('active');
}

// Initialize the first review and set up auto-slide
document.addEventListener('DOMContentLoaded', () => {
    showReview(currentReview);

    // Auto-slide functionality
    setInterval(() => {
        showReview(currentReview + 1);
    }, 5000); // Change slide every 5 seconds
});

// Update the browser history handling
window.addEventListener('popstate', function(event) {
    // Let the browser handle the navigation naturally
    if (event.state) {
        window.location.href = event.state.page;
    }
});

// Function to handle page navigation
function navigatePage(url) {
    window.location.href = url;
}

// Initialize navigation stack
let navigationStack = [];

// Store current page in stack when navigating
function navigatePage(url) {
    // Push current URL to stack before navigating
    navigationStack.push(window.location.href);
    
    // Store the stack in sessionStorage to persist across page loads
    sessionStorage.setItem('navigationStack', JSON.stringify(navigationStack));
    
    // Navigate to new page
    window.location.href = url;
}

// Handle back navigation
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve stack from sessionStorage
    const storedStack = sessionStorage.getItem('navigationStack');
    if (storedStack) {
        navigationStack = JSON.parse(storedStack);
    }

    // Add event listener for browser's back button
    window.addEventListener('popstate', function(event) {
        if (navigationStack.length > 0) {
            // Get the last URL from stack
            const previousPage = navigationStack.pop();
            
            // Update stack in sessionStorage
            sessionStorage.setItem('navigationStack', JSON.stringify(navigationStack));
            
            // Navigate to previous page
            window.location.href = previousPage;
        } else {
            // If stack is empty, go to home page
            window.location.href = 'index.html';
        }
    });

    // Add click handlers to navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default navigation
            navigatePage(this.href);
        });
    });

    // Add keyboard shortcut for back navigation (Alt + Left Arrow)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            window.history.back();
        }
    });
});

// Function to go back
function goBack() {
    if (navigationStack.length > 0) {
        const previousPage = navigationStack.pop();
        sessionStorage.setItem('navigationStack', JSON.stringify(navigationStack));
        window.location.href = previousPage;
    } else {
        window.location.href = 'index.html';
    }
}

// Helper function to check if we're on the home page
function isHomePage() {
    const path = window.location.pathname;
    return path === '/' || path.endsWith('/') || path === '/index.html';
}

// Add keyboard navigation only for non-home pages
document.addEventListener('keydown', function(e) {
    if (!isHomePage() && e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    }
});

// Add this function after your existing code
function bookService(serviceName, price) {
    const whatsappNumber = '+917524963330'; // Your WhatsApp number
    const message = encodeURIComponent(`Hi! I'm interested in booking the ${serviceName} for ${price}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Add this function for mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    if (!event.target.closest('.nav-links') && 
        !event.target.closest('.hamburger-menu') && 
        navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    });
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const navLinks = document.querySelector('.nav-links');
    const SWIPE_THRESHOLD = 50;
    
    if (touchEndX < touchStartX - SWIPE_THRESHOLD && navLinks.classList.contains('active')) {
        // Swipe left - close menu
        navLinks.classList.remove('active');
    } else if (touchEndX > touchStartX + SWIPE_THRESHOLD && !navLinks.classList.contains('active')) {
        // Swipe right - open menu
        navLinks.classList.add('active');
    }
}

// Add keyboard shortcut for back navigation
document.addEventListener('keydown', function(e) {
    if (!isHomePage() && e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
    }
});