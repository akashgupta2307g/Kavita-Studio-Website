const productData = {
    categories: {
        "online-services": {
            title: "Online Services",
            products: [
                {
                    id: "os1",
                    title: "Life Certificate",
                    image: "images/jivan.jpg",
                    description: "Quick and easy life certificate service",
                    price: "Contact for price",
                    badge: "ESSENTIAL"
                },
                {
                    id: "os2",
                    title: "Shop & Establishment Certificate",
                    image: "images/labour dep.jpg",
                    description: "Professional certification service for businesses",
                    price: "Contact for price",
                    badge: "BUSINESS"
                },
                {
                    id: "os3",
                    title: "MSME Certificate",
                    image: "images/food.jpg",
                    description: "Complete MSME registration assistance",
                    price: "Contact for price",
                    badge: "BUSINESS"
                }
            ]
        },
        "photo-studio": {
            title: "Photo Studio Services",
            products: [
                {
                    id: "ps1",
                    title: "Passport Photos",
                    image: "images/passport.jpg",
                    description: "Professional passport photos with instant printing",
                    price: "₹100 for 4 copies",
                    badge: "INSTANT"
                },
                {
                    id: "ps2",
                    title: "Portrait Photography",
                    image: "images/portrait.jpg",
                    description: "Professional portrait photography session",
                    price: "Starting from ₹1,000",
                    badge: "POPULAR"
                },
                {
                    id: "ps3",
                    title: "Family Portraits",
                    image: "images/family.jpg",
                    description: "Capture your family moments",
                    price: "Starting from ₹2,000",
                    badge: "FAMILY"
                }
            ]
        },
        "wedding-services": {
            title: "Wedding Photography Services",
            products: [
                {
                    id: "ws1",
                    title: "Basic Wedding Package",
                    image: "images/wedding1.jpg",
                    description: "100 Printed Photos, 1 Wedding Album, 4 Hours Coverage",
                    price: "₹15,000",
                    badge: "BASIC"
                },
                {
                    id: "ws2",
                    title: "Premium Wedding Package",
                    image: "images/wedding2.jpg",
                    description: "200 Printed Photos, 2 Wedding Albums, 8 Hours Coverage",
                    price: "₹25,000",
                    badge: "PREMIUM"
                },
                {
                    id: "ws3",
                    title: "Luxury Wedding Package",
                    image: "images/wedding3.jpg",
                    description: "300 Printed Photos, 3 Wedding Albums, Full Day Coverage",
                    price: "₹35,000",
                    badge: "LUXURY"
                }
            ]
        },
        "personalized-products": {
            title: "Personalized Products",
            products: [
                {
                    id: "pp1",
                    title: "Personalized Photo Mug",
                    image: "images/download.jpeg",
                    description: "Custom printed photo mug with your memories",
                    price: "₹349",
                    badge: "BEST SELLER",
                    rating: "4.5",
                    reviews: "7157"
                },
                {
                    id: "pp2",
                    title: "Custom T-Shirt",
                    image: "images/image4.jpg",
                    description: "Premium quality custom printed t-shirts",
                    price: "₹349",
                    badge: "NEW",
                    rating: "4.3",
                    reviews: "5238"
                }
                // Add more personalized products here
            ]
        }
    }
};

// Make it available globally
window.productData = productData; 