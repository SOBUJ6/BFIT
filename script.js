// কার্ট স্টেট হ্যান্ডেল করার জন্য ভ্যারিয়েবল
let cart = [];

// কার্ট স্লাইডবার খোলা বা বন্ধ করার ফাংশন
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// কার্টে প্রোডাক্ট যোগ করার ফাংশন
function addToCart(name, price) {
    // চেক করা হচ্ছে প্রোডাক্টটি অলরেডি কার্টে আছে কিনা
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCartUI();
}

// কার্টের ইন্টারফেস আপডেট করার ফাংশন
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // কার্ট আইকন কাউন্ট আপডেট
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // কার্ট আইটেমের লিস্ট তৈরি
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <small>৳${item.price} x ${item.quantity}</small>
                </div>
                <strong>৳${item.price * item.quantity}</strong>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // মোট টাকা হিসাব
    let totalMoney = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = totalMoney;
}

// অর্ডার করার ফাংশন (যা সরাসরি হোয়াটসঅ্যাপে মেসেজ পাঠাবে)
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let phoneNumber = "01607713897"; // এখানে আপনার সঠিক হোয়াটসঅ্যাপ নাম্বারটি দিন (যেমন: 8801700000000)
    let message = "Hello Trendy Wear, I want to order:\n\n";

    cart.forEach(item => {
        message += `- ${item.name} (Qty: ${item.quantity}) - ৳${item.price * item.quantity}\n`;
    });

    let totalMoney = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal Amount: ৳${totalMoney}\nPlease confirm my order.`;

    // ইউআরএল এনকোড করে হোয়াটসঅ্যাপে পাঠানো
    let whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
}
