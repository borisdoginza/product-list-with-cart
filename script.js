const template = document.querySelector("#cart-item-template");
const cartItemsContainer = document.querySelector(".cart_items");
const cartCountElement = document.querySelector(".cart_count");
const totalPriceElement = document.querySelector(".total_price");


// const clone = template.content.cloneNode(true);
// cartItemsContainer.appendChild(clone);

// Function for updating the total price in the cart and the quantity of products
function updateCartSummary() {
    let totalCount = 0;
    let totalPrice = 0;

    cards.forEach((card) => {
        const qty = Number(card.dataset.quantity || 0);
        const itemPrice = Number(card.dataset.price);
        totalCount += qty;
        totalPrice += qty * itemPrice;
    });
    cartCountElement.textContent = totalCount;
    totalPriceElement.textContent = totalPrice.toFixed(2);


    const cartEmptyElement = document.querySelector(".cart_empty");
    const cartTotalElement = document.querySelector(".cart_total");
    const cartCarbonNeutral = document.querySelector(".cart_carbon-neutral");
    const cartConfirmButton = document.querySelector(".confirmation_button");
    if (totalCount === 0) {
        cartTotalElement.classList.add("hidden");
        cartCarbonNeutral.classList.add("hidden");
        cartEmptyElement.classList.remove("hidden");
        cartConfirmButton.classList.add("hidden");
    } else {
        cartEmptyElement.classList.add("hidden");
        cartTotalElement.classList.remove("hidden");
        cartCarbonNeutral.classList.remove("hidden");
        cartConfirmButton.classList.remove("hidden");
    }
}

const confirmationButton = document.querySelector(".confirmation_button");
console.log(confirmationButton);
confirmationButton.addEventListener("click", () => {
    renderOrderConfirmedItems();
    document.body.classList.add("modal-open");

    const orderConfirmed = document.querySelector(".order-confirmed");
    orderConfirmed.classList.add("order-confirmed--animate");
    const modalContent = document.querySelector(".order-confirmed");
    modalContent.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    setTimeout(() => {
    smoothScrollToBottom(modalContent, 2000);
    }, 1000);
    
});



const overlay = document.querySelector(".overlay");
const newOrderButton = document.querySelector(".order-confirmed_start-new-order");

newOrderButton.addEventListener("click", () => {
    resetOrder();
    overlay.classList.add("hidden");
    document.body.classList.remove("modal-open");

    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });

    const title = document.querySelector(".desert-list_heading");
    title.classList.remove("page_title--animate");
    void title.offsetWidth;
    title.classList.add("page_title--animate");

    const cart = document.querySelector(".body_cart");
    cart.classList.remove("body_cart--animate");
    void cart.offsetWidth;
    cart.classList.add("body_cart--animate");

    const productItems = document.querySelectorAll(".products_item");
    productItems.forEach((item) => {
        item.classList.remove("product_item--animate");
        void item.offsetWidth;
        item.classList.add("product_item--animate");
    });

    // orderConfirmed.classList.remove("order-confirmed--animate");

});

overlay.addEventListener("click", () => {
    resetOrder();
    overlay.classList.add("hidden");
    document.body.classList.remove("modal-open");

    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });

    const title = document.querySelector(".desert-list_heading");
    title.classList.remove("page_title--animate");
    void title.offsetWidth;
    title.classList.add("page_title--animate");

    const cart = document.querySelector(".body_cart");
    cart.classList.remove("body_cart--animate");
    void cart.offsetWidth;
    cart.classList.add("body_cart--animate");

    const productItems = document.querySelectorAll(".products_item");
    productItems.forEach((item) => {
        item.classList.remove("product_item--animate");
        void item.offsetWidth;
        item.classList.add("product_item--animate");
    });

    // orderConfirmed.classList.remove("order-confirmed--animate");
});


// Function for resetting the shopping cart after clicking the "Start New Order" button


function resetOrder() {
    cards.forEach((card) => {
        card.dataset.quantity = 0;
        const controls = card.querySelector(".item_quantity-controls");
        const addButton = card.querySelector(".item_button");
        const qtyValue = card.querySelector(".qty_value");
        controls.classList.add("hidden");
        addButton.classList.remove("hidden");
        qtyValue.textContent = "";

    
    })
    cartItemsContainer.innerHTML = "";

    const cartEmptyElement = document.querySelector(".cart_empty");
    const cartTotalElement = document.querySelector(".cart_total");
    const cartCarbonNeutral = document.querySelector(".cart_carbon-neutral");
    const cartConfirmButton = document.querySelector(".confirmation_button");
    cartTotalElement.classList.add("hidden");
    cartCarbonNeutral.classList.add("hidden");
    cartEmptyElement.classList.remove("hidden");
    cartConfirmButton.classList.add("hidden");
    cartCountElement.textContent = 0;
}



// Post-confirm modal window
function renderOrderConfirmedItems() {
    const overlay = document.querySelector(".overlay");

    const confirmTemplate = document.querySelector("#order-confirmed_template");
    const confirmContainer = document.querySelector(".order-confirmed_items");
    const confirmTotal = document.querySelector(".order-confirmed_total-price");

    confirmContainer.innerHTML = "";

    cards.forEach((card) => {
        const confirmItemPrice = Number(card.dataset.price);
        const confirmItemQty = Number(card.dataset.quantity || 0);
        const confirmItemImg = card.dataset.image;
        const confirmItemName = card.dataset.name;

        if (confirmItemQty > 0) {
            const clone = confirmTemplate.content.cloneNode(true);
            const confirmItem = clone.querySelector(".confirmation-item");
            confirmItem.querySelector(".product-info_name").textContent = confirmItemName;
            confirmItem.querySelector(".details_qty").textContent = confirmItemQty;
            confirmItem.querySelector(".details_unit-price").textContent = confirmItemPrice.toFixed(2);
            confirmItem.querySelector(".template_total-product-price").textContent = (confirmItemPrice * confirmItemQty).toFixed(2);
            confirmItem.querySelector(".product-info_image").src = confirmItemImg;
            confirmContainer.appendChild(clone);
                

        }
    })

    const confirmTotalPrice = document.querySelector(".order-confirmed_total-price");
    confirmTotalPrice.textContent = totalPriceElement.textContent;

    overlay.classList.remove("hidden");
}


const cards = document.querySelectorAll(".products_item");
cards.forEach((card) => {

    const addButton = card.querySelector(".item_button");
    const controls = card.querySelector(".item_quantity-controls");
    const qtyValue = card.querySelector(".qty_value");
    const btnPlus = card.querySelector(".qty_plus");
    const btnMinus = card.querySelector(".qty_minus");

    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    let quantity = 0;
    card.dataset.quantity = quantity;
    let cartItemElement = null;

    // Function to create an item in the trash and delete it when the delete button is clicked
    function createCartItem() {
        const clone = template.content.cloneNode(true);
        const cartItem = clone.querySelector(".cart_item");
        cartItem.querySelector(".cart_item-name").textContent = name;
        cartItem.querySelector(".cart_item-unit-price").textContent = price.toFixed(2);
        cartItemsContainer.appendChild(clone);
        cartItemElement = cartItemsContainer.lastElementChild;

        const removeButton = cartItemElement.querySelector(".cart_item-remove");
        removeButton.addEventListener("click", () => {
            quantity = 0;
            card.dataset.quantity = quantity;
            controls.classList.add("hidden");
            addButton.classList.remove("hidden");
            cartItemElement.remove();
            cartItemElement = null;
            updateCartSummary();
        });
    }

    // Function to update quantity and price in a cart item
    function updateCartItem() {
        if (!cartItemElement) return;
        const itemQty = cartItemElement.querySelector(".cart_item-qty");
        const itemTotalPrice = cartItemElement.querySelector(".cart_item-total-price");
        itemQty.textContent = quantity;
        itemTotalPrice.textContent = (quantity * price).toFixed(2);
    }
    
    

    


    addButton.addEventListener("click", () => {
        quantity = 1;
        card.dataset.quantity = quantity;

        qtyValue.textContent = quantity;
        addButton.classList.add("hidden");
        controls.classList.remove("hidden");

        createCartItem();
        updateCartItem();
        updateCartSummary();

    });

    btnPlus.addEventListener("click", () => {
        quantity++;
        card.dataset.quantity = quantity;
        qtyValue.textContent = quantity;

        if (!cartItemElement) {
            createCartItem();
        }
        updateCartItem();
        updateCartSummary();

    });

    btnMinus.addEventListener("click", () => {
        quantity--;
        card.dataset.quantity = quantity;

        if (quantity <= 0) {
            quantity = 0;
            card.dataset.quantity = quantity;
            
            controls.classList.add("hidden");
            addButton.classList.remove("hidden");

            if (cartItemElement) {
                cartItemElement.remove();
                cartItemElement = null;
            }
        }
        else {
            qtyValue.textContent = quantity;
            updateCartItem();
        }
        updateCartSummary();
    });
});


// ----------------------------
// Animation
// ----------------------------
function smoothScrollToBottom(element, duration = 2000) {
    let isScrolling = true;

    const start = element.scrollTop;
    const end = element.scrollHeight;
    const distance = end - start;
    const startTime = performance.now();

    function animate(currentTime) {
        if (!isScrolling) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        element.scrollTop = start + distance * ease;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    const stop = () => isScrolling = false;

    element.addEventListener("wheel", stop, { once: true });
    element.addEventListener("touchstart", stop, { once: true });

    requestAnimationFrame(animate);
}
