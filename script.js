
let users = JSON.parse(localStorage.getItem('users')) || [];

function getLoggedInUser() {
    return localStorage.getItem('loggedInUser');
}

let generatedOTP = null;
// let products = JSON.parse(localStorage.getItem('products')) || [];
let products = [
    // 🍎 FRUITS
    { id: 1, name: "Apple", category: "Fruits", weight: "1kg", qty: 10, price: 120, img: "apple.jpg" },
    { id: 2, name: "Banana", category: "Fruits", weight: "1 dozen", qty: 15, price: 60, img: "banana.jpg" },
    { id: 3, name: "Orange", category: "Fruits", weight: "1kg", qty: 12, price: 90, img: "orange.jpg" },
    { id: 4, name: "Mango", category: "Fruits", weight: "1kg", qty: 8, price: 150, img: "mango.jpg" },
    { id: 5, name: "Pineapple", category: "Fruits", weight: "1 piece", qty: 5, price: 80, img: "pineapple.jpg" },

    // 🥕 VEGETABLES
    { id: 6, name: "Carrot", category: "Vegetables", weight: "1kg", qty: 8, price: 60, img: "carrot.jpg" },
    { id: 7, name: "Tomato", category: "Vegetables", weight: "1kg", qty: 20, price: 40, img: "tomato.jpg" },
    { id: 8, name: "Potato", category: "Vegetables", weight: "1kg", qty: 25, price: 30, img: "potato.jpg" },
    { id: 9, name: "Onion", category: "Vegetables", weight: "1kg", qty: 18, price: 35, img: "onion.jpg" },
    { id: 10, name: "Cabbage", category: "Vegetables", weight: "1 piece", qty: 10, price: 25, img: "cabbage.jpg" },

    // 🥛 DAIRY
    { id: 11, name: "Milk", category: "Dairy", weight: "1L", qty: 5, price: 50, img: "milk.jpg" },
    { id: 12, name: "Curd", category: "Dairy", weight: "500g", qty: 10, price: 40, img: "curd.jpg" },
    { id: 13, name: "Butter", category: "Dairy", weight: "200g", qty: 6, price: 120, img: "butter.jpg" },
    { id: 14, name: "Cheese", category: "Dairy", weight: "200g", qty: 7, price: 150, img: "cheese.jpg" },

    // 🌶 SPICES
    { id: 15, name: "Turmeric Powder", category: "Spices", weight: "100g", qty: 20, price: 30, img: "turmeric.jpg" },
    { id: 16, name: "Chilli Powder", category: "Spices", weight: "100g", qty: 18, price: 35, img: "chilli.jpg" },
    { id: 17, name: "Coriander Powder", category: "Spices", weight: "100g", qty: 15, price: 25, img: "coriander.jpg" },

    // 🍫 SNACKS
    { id: 18, name: "Biscuits", category: "Snacks", weight: "200g", qty: 25, price: 20, img: "buiscuit.jpg" },
    { id: 19, name: "Chips", category: "Snacks", weight: "100g", qty: 30, price: 20, img: "chips.jpg" },
    { id: 20, name: "Chocolate", category: "Snacks", weight: "100g", qty: 20, price: 50, img: "chocolates.jpg" },

    // 🥤 BEVERAGES
    { id: 21, name: "Juice", category: "Beverages", weight: "1L", qty: 12, price: 90, img: "juice1.jpg" },
    { id: 22, name: "Soft Drink", category: "Beverages", weight: "1L", qty: 15, price: 80, img: "softdrink.jpg" },
    { id: 23, name: "Tea Powder", category: "Beverages", weight: "250g", qty: 10, price: 120, img: "tea.jpg" },

    // 🌾 PULSES
    { id: 24, name: "Toor Dal", category: "Pulses", weight: "1kg", qty: 10, price: 140, img: "toordall.jpg" },
    { id: 25, name: "Moong Dal", category: "Pulses", weight: "1kg", qty: 12, price: 130, img: "moongdall.jpg" },
    { id: 26, name: "Channa Dal", category: "Pulses", weight: "1kg", qty: 14, price: 110, img: "channa.jpg" }
];

        function showSection(id) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            if(id === 'home') renderItems();
            if(id === 'admin') 
                {
                    renderInventory();
             renderAdminOrders();
         }
            if(id === 'myOrders') renderUserOrders();
            if(id === 'reviewSection') renderReviews(productId);
            if(id === 'wishlist') updateWishUI();
            if(id === 'cart') updateCartUI();
            if(id === 'rewardSec'){
        setTimeout(() => {
            rewardsec();   // 👈 IMPORTANT
        }, 200);
                rewardsec();
            }
        }

        // --- Auth Logic ---
        function registerUser() {
            const name = document.getElementById('rName').value;
            const email = document.getElementById('rEmail').value;
            const pass = document.getElementById('rPass').value;
            if(!name || !email || !pass) return alert("Please fill all fields!");
            users.push({name, email, pass});
            localStorage.setItem('users', JSON.stringify(users));
            alert("Signup Success! Please Login.");
            toggleAuth();
        }

        function sendOTP() {
            const email = document.getElementById('lEmail').value;
            const pass = document.getElementById('lPass').value;
            const user = users.find(u => u.email === email && u.pass === pass);
            
            if(user) {
                generatedOTP = Math.floor(1000 + Math.random() * 9000);
                alert("FRESHBASKET: Your Login OTP is " + generatedOTP);
                document.getElementById('otpArea').style.display = 'block';
            } else {
                alert("Invalid Email or Password!");
            }
        }

        function verifyLogin() {
            const otp = document.getElementById('inOTP').value;
            if(otp == generatedOTP) {
                const email = document.getElementById('lEmail').value;
                const user = users.find(u => u.email === email);
                if(user) {
            localStorage.setItem('loggedInUser', user.email); // store email, not name
            localStorage.setItem('loggedInUserName', user.name);

            // Initialize user-specific storage if not exists
            if(!localStorage.getItem(`${user.email}_cart`)) localStorage.setItem(`${user.email}_cart`, JSON.stringify([]));
            if(!localStorage.getItem(`${user.email}_wishlist`)) localStorage.setItem(`${user.email}_wishlist`, JSON.stringify([]));
            if(!localStorage.getItem(`${user.email}_rewards`)) localStorage.setItem(`${user.email}_rewards`, JSON.stringify(0));
            location.reload();
        }
            } else {
                alert("Wrong OTP! Please check.");
            }
        }

        function adminAccess() {
            if(prompt("Admin Password:") === "123") {
                localStorage.setItem('loggedInUser', 'Admin');
                localStorage.setItem('loggedInRole', 'admin'); 
                location.reload();
            }
        }

        function logout() {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('loggedInRole');
            location.reload();
        }

        // Filter Logic
        function filterProducts(category, btn) {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active-cat'));
            btn.classList.add('active-cat');
            
            if(category === 'All') {
                renderProducts(products);
                document.getElementById('viewTitle').innerText = "Organic Collection";
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
                document.getElementById('viewTitle').innerText = category + " Special";
            }
        }

        function renderProducts(data) {
            const div = document.getElementById('productDisplay');
            const loggedInUser = getLoggedInUser();

    let wishlist = JSON.parse(localStorage.getItem(`${loggedInUser}_wishlist`)) || [];
            if(data.length === 0) {
                div.innerHTML = "<p>No products found in this category.</p>";
                return;
            }
         //     const qty = Number(p.qty);
         // const isOutOfStock = qty <= 0;
            div.innerHTML = data.map(p => `
                <div class="card" style="${p.qty <= 0 ? 'opacity: 0.7;' : 'cursor: pointer;'}" 
             onclick="${p.qty <= 0 ? "alert('This item is currently out of stock!')" : `viewProduct(${p.id})`}">
                       <div class="card-actions">
            <span class="action-icon" onclick="event.stopPropagation(); toggleWishlist('${p.id}')">
                <i class="fa-solid fa-heart" style="color: ${wishlist ? 'var(--primary)' : '#ccc'}"></i>
            </span>
        </div>

                    <span class="cat-tag">${p.category}</span>
                    <img src="${p.img}">
                    <h3>${p.name}</h3>
                    <p style="color:var(--primary); font-weight:bold;">₹${p.price}</p>
                    <button class="btn-add" style="margin-top:10px;" onclick="alert('Added!')">Add to Cart</button>
                </div>
            `).join('');
        }
        // --- Live Search Logic ---
        function handleSearch() {
            const searchTerm = document.getElementById('liveSearch').value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.category.toLowerCase().includes(searchTerm)
            );
            renderProducts(filtered);
            
            // Reset Category Buttons UI when searching
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active-cat'));
            document.querySelector('.cat-btn').classList.add('active-cat'); // Set to 'All'
        }

        // --- Inventory Logic ---
        function addNewProduct() {
            const name = document.getElementById('pName').value;
            const category= document.getElementById('pCategory').value;
            const weight = document.getElementById('pWeight').value;
            const qty = document.getElementById('pQty').value;
            const price = document.getElementById('pPrice').value;
            const img = document.getElementById('pImg').value;
            if(!name || !price) return alert("Fill essential details!");
            products.push({id: Date.now(), name, category, weight, qty, price, img});
            localStorage.setItem('products', JSON.stringify(products));
            renderInventory();
        }

        function renderInventory() {
            const table = document.getElementById('inventoryTable');
            table.innerHTML = products.map(p => `
                <tr>
                    <td><img src="${p.img}" class="inv-img"></td>
                    <td>${p.name}</td>
                    <td>${p.weight}</td>
                    <td> <input type="number" value="${p.qty}" 
                       onchange="updateStock(${p.id}, this.value)" 
                       style="width:60px; padding:5px;"></td>
                    <td>${p.category}</td>
                    <td>₹${p.price}</td>
                    <td><button onclick="deleteProduct(${p.id})" style="background:var(--red); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button></td>
                </tr>
            `).join('');
}
function updateStock(productId, newQty) {
    const productIndex = products.findIndex(p => p.id == productId);
    if (productIndex !== -1) {
        products[productIndex].qty = Number(newQty);
        localStorage.setItem('products', JSON.stringify(products));
        alert("Stock Updated!");
    }
}
            function renderAdminOrders() {
    let allOrders = [];

    // 🔥 collect all users orders
    for (let key in localStorage) {
        if (key.startsWith("orders_")) {
            let orders = JSON.parse(localStorage.getItem(key)) || [];
            allOrders = [...allOrders, ...orders];
        }
    }

    const table = document.getElementById('adminOrderTable');

    if (allOrders.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No orders yet</td></tr>";
        return;
    }

    table.innerHTML = allOrders.map((o, index) => `
        <tr>
            <td>${o.orderId}</td>
            <td>${o.customer}</td>
            <td>${o.items}</td>
            <td>${o.total}</td>

            <td>
                <select onchange="updateOrderStatus('${o.orderId}', this.value)">
                    <option ${o.status === "Ordered" ? "selected" : ""}>Ordered</option>
                    <option ${o.status === "Packed" ? "selected" : ""}>Packed</option>
                    <option ${o.status === "Shipped" ? "selected" : ""}>Shipped</option>
                    <option ${o.status === "Delivered" ? "selected" : ""}>Delivered</option>
                </select>
            </td>
        </tr>
    `).join('');
}

        // update order status
        function updateOrderStatus(orderId, newStatus) {

    for (let key in localStorage) {
        if (key.startsWith("orders_")) {
            let orders = JSON.parse(localStorage.getItem(key)) || [];

            orders.forEach(o => {
                if (o.orderId === orderId) {
                    o.status = newStatus;
                }
            });

            localStorage.setItem(key, JSON.stringify(orders));
        }
    }

    renderAdminOrders();
}

        function deleteProduct(id) {
            products = products.filter(p => p.id !== id);
            localStorage.setItem('products', JSON.stringify(products));
            renderInventory();
        }

function renderItems() {
    const display = document.getElementById('productDisplay');
    // Ensure wishlist is loaded to check icons
    const loggedInUser = getLoggedInUser();
    let wishlist = JSON.parse(localStorage.getItem(`${loggedInUser}_wishlist`)) || [];
    

display.innerHTML = products.map(p => {
        // ஸ்டாக் அளவைச் சரிபார்க்கிறோம் (String ஆக இருந்தாலும் Number ஆக மாற்றும்)
        const qty = Number(p.qty);
        const isOutOfStock = qty <= 0;
const isWish = wishlist.some(item => item && Number(item.id) === Number(p.id));
        return `
        <div class="card" 
             style="${isOutOfStock ? 'opacity: 0.7;' : 'cursor: pointer;'}" 
             onclick="${isOutOfStock ? "alert('This item is currently out of stock!')" : `viewProduct(${p.id})`}">
            <div class="card-actions">
                    <span class="action-icon" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
                        <i class="fa-solid fa-heart" style="color: ${isWish ? 'var(--primary)' : '#ccc'}"></i>
                    </span>
                </div>
            <img src="${p.img}" style="${isOutOfStock ? 'filter: grayscale(1);' : ''}">
            ${isOutOfStock ? '<span style="position:absolute; top:10px; right:10px; background:red; color:white; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:bold;">OUT OF STOCK</span>' : ''}
            
            <h3>${p.name}</h3>
            <p style="color:var(--primary); font-weight:bold; margin: 5px 0;">₹${p.price}</p>
            <p style="font-size:11px; color:#666;">Weight: ${p.weight}</p>
            
            <div style="margin-top: 10px;">
                ${isOutOfStock 
                    ? `<button class="btn-add" style="background: #ccc; cursor: not-allowed; width:100%;" disabled>Unavailable</button>`
                    : `<button class="btn-add" style="width:100%;" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>`
                }
            </div>
            
            ${!isOutOfStock && qty < 5 ? `<p style="color:orange; font-size:10px; margin-top:5px; font-weight:bold;">Only ${qty} left!</p>` : ''}
        </div>`;
    }).join("");


    display.innerHTML = products.map(p => {
               const isWish = wishlist.some(item => item && Number(item.id) === Number(p.id));
        return `
            <div class="card" onclick="viewProduct(${p.id})">
                <div class="card-actions">
                    <span class="action-icon" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
                        <i class="fa-solid fa-heart" style="color: ${isWish ? 'var(--primary)' : '#ccc'}"></i>
                    </span>
                </div>
                <img src="${p.img}">
                <div class="card-info">${p.weight || ''} | Stock: ${p.qty || 0}</div>
                <h3>${p.name}</h3>

                <p style="color:var(--primary); font-weight:bold;">₹${p.price}</p>
                <button class="btn-add" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    }).join('');
    
    display.innerHTML = products.map(p => {

 const qty = Number(p.qty);
        const isOutOfStock = qty <= 0;
const isWish = wishlist.some(item => item && Number(item.id) === Number(p.id));

    return `
        <div class="card"  style="${isOutOfStock ? 'opacity: 0.5;' : 'cursor: pointer;'}" 
             onclick="${isOutOfStock ? "alert('This item is currently out of stock!')" : `viewProduct(${p.id})`}">
            <div class="card-actions">
                <span class="action-icon" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
                    <i class="fa-solid fa-heart" style="color: ${isWish ? 'var(--primary)' : '#ccc'}"></i>
                </span>
            </div>

            <img src="${p.img}">
            <h3>${p.name}</h3>

            <p style="color:var(--primary); font-weight:bold;">₹${p.price}</p>

            <!-- 🔥 NEW LIVE INFO -->
            <p style="font-size:12px; color:#e74c3c;">
                Only ${p.qty} left!
            </p>

            <button class="btn-add" onclick="event.stopPropagation(); addToCart(${p.id})">
                Add to Cart
            </button>
        </div>
    `;
}).join('');
}
// Show user orders
    function renderUserOrders() {
    const user = getLoggedInUser();
    const orders = JSON.parse(localStorage.getItem("orders_" + user)) || [];

    const container = document.getElementById('userOrders');

    if (orders.length === 0) {
        container.innerHTML = "<p>No orders yet.</p>";
        return;
    }

    container.innerHTML = orders.map(o => `
        <div class="admin-card">
            <h4>${o.orderId}</h4>
            <p>${o.items}</p>
            <p><b>${o.total}</b></p>

            <!-- TRACKING -->
            <div style="margin-top:10px;">
                ${getTrackingUI(o.status)}
            </div>
        </div>
    `).join('');
}  

// Tracking UI
function getTrackingUI(status) {

    const steps = ["Ordered", "Packed", "Shipped", "Delivered"];

    return `
        <div style="display:flex; gap:10px; font-size:12px;">
            ${steps.map(step => `
                <div style="
                    padding:5px 10px;
                    border-radius:10px;
                    background:${steps.indexOf(step) <= steps.indexOf(status) ? '#27ae60' : '#ccc'};
                    color:white;
                ">
                    ${step}
                </div>
            `).join('')}
        </div>
    `;
}



        // --- Recently Viewed Logic ---
        function addToRecentlyViewed(product) {
            let recent = JSON.parse(localStorage.getItem('recentViewed')) || [];
            
            // Remove if already exists and add to start
            recent = recent.filter(p => p.id !== product.id);
            recent.unshift(product);
            
            if (recent.length > 8) recent.pop(); //8 products
    
    localStorage.setItem('recentViewed', JSON.stringify(recent));
    renderRecent(); 
            }

        function renderRecent(id) {
            const recent = JSON.parse(localStorage.getItem('recentViewed')) || [];
            const container = document.getElementById('recentList');
            const section = document.getElementById('recentSection');

            if (recent.length === 0) {
                section.style.display = 'none';
                return;
            }

            section.style.display = 'block';
            container.innerHTML = recent.map(p => `
                <div class="recent-item" onclick="viewProduct('${p.id}')">
                    <img src="${p.img}">
                    <p>${p.name}</p>
                </div>
            `).join('');
        }

        // View Action
        function viewProduct(id) {
            const product = products.find(p => p.id == id);
            const stockText = document.getElementById('detStock');
            if (product) {
                addToRecentlyViewed(product);
             const imgElement = document.getElementById('detImg');
   
        if (imgElement) {
            imgElement.src = product.img;
        }
        document.getElementById('detName').innerText = product.name;
        document.getElementById('detPrice').innerText = "₹" + product.price;
        document.getElementById('detWeight').innerText = "Weight: " + product.weight;

        const stockText = document.createElement('p');
stockText.style.color = '#e74c3c';

                 if (Number(product.qty) <= 0) {
    stockText.innerText = "Out of Stock!";
    stockText.style.color = "red";
    // ஆர்டர் பட்டனை மறைக்க
    document.querySelector('#productDetail .btn-add').style.display = 'none';
} else {
    stockText.innerText = "In Stock: " + product.qty;
    stockText.style.color = "green";
    document.querySelector('#productDetail .btn-add').style.display = 'block';
}

document.getElementById('detWeight').appendChild(stockText);
        renderReviews(id);
        showSection('productDetail');
            }
         }
// whishlist and favourite
        function toggleWishlist(id, event) {
    if(event) event.stopPropagation(); 
    
    const user = getLoggedInUser();

    if(!user) {
        alert("Please Login to add items to Wishlist!");
        showSection('login');
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem(user + "_wishlist")) || [];
    const productId = Number(id);

    const index = wishlist.findIndex(item => item && item.id === productId);

    if (index === -1) {
        const product = products.find(p => p && Number(p.id) === productId);
        if(product) {
            wishlist.push(product);
            alert("Added to Wishlist ❤️");
        }
    } else {
        wishlist.splice(index, 1);
        alert("Removed from Wishlist 💔");
    }

    localStorage.setItem(user + "_wishlist", JSON.stringify(wishlist));

    renderItems();

    if(document.getElementById('wishlist').classList.contains('active')) {
        updateWishUI();
    }
}

// 2. Update Navbar Count and Wishlist Page
function updateWishUI() {
    const user = getLoggedInUser();
    let currentWish = JSON.parse(localStorage.getItem(user + "_wishlist")) || [];

    const display = document.getElementById('wishlistDisplay');

    if (currentWish.length === 0) {
        display.innerHTML = "<p style='text-align:center; width:100%; padding:50px;'>Your Wishlist is empty!</p>";
        return;
    }

    display.innerHTML = currentWish.map(p => `
        <div class="card">
            <div class="card-actions">
                <span class="action-icon" onclick="toggleWishlist(${p.id})">
                    <i class="fa-solid fa-heart" style="color: var(--primary)"></i>
                </span>
            </div>

            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p style="color:var(--primary); font-weight:bold;">₹${p.price}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}
// review section
        let currentSelectedRating = 0;
let activeProductId = null;

// Review and Rating page
//Ratting star colouring
function setRating(n) {
    currentSelectedRating = n;
    const stars = document.getElementById('starInput').children;
    for (let i = 0; i < 5; i++) {
        stars[i].style.color = i < n ? "#f1c40f" : "#ccc";
    }
}

// comment section
function submitReview() {
    const user = getLoggedInUser();
    if(!user) {
        alert("Please login to submit review!");
        return;
    }

    const comment = document.getElementById('reviewText').value;

    if (currentSelectedRating === 0 || comment.trim() === "") {
        alert("Please provide both rating and comment!");
        return;
    }

    const key = user + "_reviews";
    const reviews = JSON.parse(localStorage.getItem(key)) || {};

    if (!reviews[activeProductId]) reviews[activeProductId] = [];

    const newReview = {
        rating: currentSelectedRating,
        text: comment,
        date: new Date().toLocaleDateString(),
        user: user
    };

    reviews[activeProductId].unshift(newReview);
    localStorage.setItem(key, JSON.stringify(reviews));

    document.getElementById('reviewText').value = "";
    setRating(0);
    renderReviews(activeProductId);
}

// view product comment
function renderReviews(productId) {
    activeProductId = productId;

    const user = getLoggedInUser();
    const key = user + "_reviews";

    const allReviews = JSON.parse(localStorage.getItem(key)) || {};
    const productReviews = allReviews[productId] || [];

    const container = document.getElementById('commentsList');

    if (productReviews.length === 0) {
        container.innerHTML = "<p style='color: #888;'>No reviews yet. Be the first to review!</p>";
        return;
    }

    container.innerHTML = productReviews.map(r => `
        <div style="border-bottom: 1px solid #eee; padding: 15px 0;">
            <div style="color: #f1c40f;">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
            <p style="margin: 5px 0;">${r.text}</p>
            <small style="color: #999;">${r.user} • ${r.date}</small>
        </div>
    `).join('');
}
        // right side drawyer by clicking user name
        function openDrawer() {
    const user = getLoggedInUser();
    if (user) {
        document.getElementById('drawerUserName').innerText = user;
        document.getElementById('userDrawer').classList.add('open');
        document.getElementById('drawerOverlay').style.display = 'block';
        updateDrawerContent();
    }
    else {
        alert("Please login to see your profile!");
        showSection('login');
    }
}

function closeDrawer() {
    document.getElementById('userDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').style.display = 'none';
}
function updateDrawerContent() {
    const user = getLoggedInUser();
    const cart = JSON.parse(localStorage.getItem('cart_' + user)) || [];

    const cartContainer = document.getElementById('drawerCartItems');

    if(cart.length === 0) {
        cartContainer.innerHTML = "No items in cart.";
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div>• ${item.name} (x${item.qtyInCart || 1})</div>
    `).join('');
}


function addToCart(id) {
    const user = getLoggedInUser();
    if (!user) {
        alert("Please login first!");
        showSection('login');
        return;
    }
    const product = products.find(p => p.id == id);
    
    // ஸ்டாக் இல்லையென்றால் தடுக்க
    if (!product || Number(product.qty) <= 0) {
        alert("Sorry, this item is Out of Stock!");
        return;
    }
    let cart = JSON.parse(localStorage.getItem('cart_' + user)) || [];
    // const product = products.find(p => p.id == id);

    if (product) {
        let existing = cart.find(item => item.id == id);

        if (existing) {
            existing.qtyInCart = (existing.qtyInCart || 1) + 1;
        } else {
            cart.push({ ...product, qtyInCart: 1 });
        }

        localStorage.setItem('cart_' + user, JSON.stringify(cart));
        updateCartUI();
        updateDrawerContent();
        alert("Product added to cart!");
    }
}
// update cart
function updateCartUI() {
    const user = getLoggedInUser();
    const cart = JSON.parse(localStorage.getItem('cart_' + user)) || [];

    const cartCountElement = document.getElementById('cCount');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }

    const cartDisplay = document.getElementById('cartDisplay');
    const totalElement = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartDisplay.innerHTML = "<p style='text-align:center; padding:50px;'>Your cart is empty!</p>";
        totalElement.innerText = "₹0";
        return;
    }

    let total = 0;

    cartDisplay.innerHTML = cart.map((item, index) => {
        let qty = item.qtyInCart || 1;
        let subtotal = Number(item.price) * qty;
        total += subtotal;

        return `
        <div class="admin-card" style="display: flex; gap: 20px; align-items: center; padding: 15px;">
            <img src="${item.img}" style="width: 80px;">
            <div style="flex: 1;">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <small>Subtotal: ₹${subtotal}</small>
            </div>
            <div>
                <button onclick="changeQty(${index}, -1)">-</button>
                <span>${qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${index})">❌</button>
        </div>`;
    }).join('');

    totalElement.innerText = "₹" + total;
}
// 2. Quantity Change Logic
function changeQty(index, delta) {
    const user = getLoggedInUser();
    let cart = JSON.parse(localStorage.getItem('cart_' + user)) || [];

    cart[index].qtyInCart = (cart[index].qtyInCart || 1) + delta;

    if (cart[index].qtyInCart < 1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart_' + user, JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(index) {
    const user = getLoggedInUser();
    let cart = JSON.parse(localStorage.getItem('cart_' + user)) || [];

    cart.splice(index, 1);

    localStorage.setItem('cart_' + user, JSON.stringify(cart));
    updateCartUI();
}

// 3. Place Order Logic
function placeOrder() {
    const user = getLoggedInUser();
    const address = document.getElementById('deliveryAddress').value;
    const cart = JSON.parse(localStorage.getItem('cart_' + user ))|| [];

    if (cart.length === 0) return alert("Your cart is empty!");
    if (!address.trim()) return alert("Please enter a delivery address!");

    document.getElementById('displayAddress').innerText = address;

    calculateSummary();
    showSection('checkout');
}

// 2. calculate total summary
function calculateSummary() {
    const user = getLoggedInUser();
    let cart = JSON.parse(localStorage.getItem('cart_' + user)) || [];

    let basePrice = cart.reduce((total, item) => 
        total + (Number(item.price) * (item.qtyInCart || 1)), 0
    );

    let gst = Math.round(basePrice * 0.12);
    let deliveryFee = 200;

    let luckyReward = JSON.parse(localStorage.getItem('reward_' + user)) || null;
    let discount = 0;

    if (luckyReward) {
        discount = Number(luckyReward.amt);
        document.getElementById('couponRow').style.display = 'flex';
        document.getElementById('summaryDiscount').innerText = "-₹" + discount;
    } else {
        document.getElementById('couponRow').style.display = 'none';
    }

    let grandTotal = (basePrice + gst + deliveryFee) - discount;

    document.getElementById('summaryBase').innerText = "₹" + basePrice;
    document.getElementById('summaryGST').innerText = "₹" + gst;
    document.getElementById('summaryGrandTotal').innerText = "₹" + grandTotal;
}


function confirmFinalOrder() {
    const user = getLoggedInUser();
    if (!user) return;

    const cart = JSON.parse(localStorage.getItem(`${user}_cart`)) || [];
    const total = document.getElementById('summaryGrandTotal').innerText;
    
    const newOrder = {
        orderId: 'ORD' + Date.now(),
        customer: user,
        items: cart.map(item => item.name).join(", "),
        total: total,
        status: "Ordered",
        date: new Date().toISOString().split('T')[0] // இன்றைய தேதியை சேமிக்க
    };

    // User-ன் ஆர்டர் ஹிஸ்டரியில் சேமிக்க
    let userOrders = JSON.parse(localStorage.getItem("orders_" + user)) || [];
    userOrders.push(newOrder);
    localStorage.setItem("orders_" + user, JSON.stringify(userOrders));
       // ஸ்டாக் அளவைக் குறைக்கும் லாஜிக்
    cart.forEach(cartItem => {
        const productIndex = products.findIndex(p => p.id == cartItem.id);
        if (productIndex !== -1) {
            // தயாரிப்பின் அளவைக் குறைக்கவும்
            products[productIndex].qty = Number(products[productIndex].qty) - 1;
        }
    });

    // புதிய ஸ்டாக் அளவைச் சேமிக்கவும்
    localStorage.setItem('products', JSON.stringify(products));
    
    // கார்ட்டை காலி செய்ய
    localStorage.setItem(`${user}_cart`, JSON.stringify([]));
    alert("Order Placed Successfully!");
    showSection('myOrders');
}

function rewardsec() {

    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const couponDiv = document.getElementById('coupon-details');
    const msgDiv = document.getElementById('status-msg');

    const user = getLoggedInUser();
    if (!user) {
        alert("Login to get reward!");
        return;
    }

    const todayDate = new Date().toISOString().split('T')[0];

    const saved = JSON.parse(localStorage.getItem('reward_' + user));
    const lastClaimedDate = localStorage.getItem('last_reward_date_' + user);

    // 🎨 INIT CANVAS
    function initCanvas() {
        canvas.style.display = 'block';
        canvas.style.pointerEvents = 'auto';

        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#cccccc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#000';
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2);
    }

    // 🎁 UPDATE UI AFTER SCRATCH
    function updateUI(amt, code, expiry) {
        document.getElementById('amt-text').innerText = "₹" + amt;
        document.getElementById('code-text').innerText = code;

        couponDiv.style.display = 'block';
        canvas.style.display = 'none';

        msgDiv.innerHTML = "Click code to copy.<br>Use it at checkout.";

        startTimer(expiry);
    }

    // ⏳ TIMER
    function startTimer(expiry) {
        const timerInterval = setInterval(() => {
            const diff = expiry - new Date().getTime();

            if (diff <= 0) {
                localStorage.removeItem('reward_' + user);
                clearInterval(timerInterval);
                location.reload();
                return;
            }

            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);

            document.getElementById('clock').innerText = `${h}h ${m}m ${s}s`;

        }, 1000);
    }

    // 📋 COPY CODE
    window.copyCode = function () {
        const code = document.getElementById('code-text').innerText;
        navigator.clipboard.writeText(code);
        alert("Code Copied: " + code);
    }

    // ✍️ SCRATCH LOGIC
    let isDrawing = false;

    const getXY = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        return { x, y };
    };

    const scratch = (e) => {
        if (!isDrawing) return;
        const { x, y } = getXY(e);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    };

    canvas.onmousedown = () => isDrawing = true;
    canvas.ontouchstart = () => isDrawing = true;

    canvas.onmousemove = scratch;
    canvas.ontouchmove = scratch;

    canvas.onmouseup = finishScratch;
    canvas.ontouchend = finishScratch;

    function finishScratch() {
        isDrawing = false;

        if (lastClaimedDate === todayDate) {
            alert("Already claimed today! Come tomorrow.");
            return;
        }

        if (!localStorage.getItem('reward_' + user)) {

            const amt = Math.floor(Math.random() * 91) + 10;
            const code = "WIN" + amt + "EXTRA";
            const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);

            localStorage.setItem('reward_' + user, JSON.stringify({ amt, code, expiry }));
            localStorage.setItem('last_reward_date_' + user, todayDate);

            updateUI(amt, code, expiry);

            canvas.style.pointerEvents = 'none';
        }
    }

    // 🔁 INITIAL LOAD LOGIC
    if (lastClaimedDate === todayDate && !saved) {
        canvas.style.display = 'none';
        msgDiv.innerHTML = "<b>Come back tomorrow!</b>";

    } else if (saved && new Date().getTime() < saved.expiry) {
        updateUI(saved.amt, saved.code, saved.expiry);

    } else {
        setTimeout(() => {
            initCanvas();   // 👈 FINAL CALL
        }, 100);
    }
}


        window.onload = () => {
            const userName = localStorage.getItem('loggedInUserName');

            const user = getLoggedInUser();
            if(user) {
                document.getElementById('loginNavBtn').style.display = 'none';
                document.getElementById('loginNavBtn1').style.display = 'none';
                document.getElementById('userProfile').style.display = 'flex';
                document.getElementById('uName').innerText = userName;
                if(user === 'Admin') showSection('admin');
            }
            renderItems();
            renderRecent();
            renderProducts(products);
            updateCartUI();
            updateDrawerContent();
            updateWishUI();
        };
