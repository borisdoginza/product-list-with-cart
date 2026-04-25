# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)




## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Links

- Solution URL: https://github.com/borisdoginza/product-list-with-cart
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

- Learned how to manage state for cart items individually
- Better understanding of event handling in JavaScript
- Learned how to use animations and scroll using JS
- Leadned how to clone and use templates


```js
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
```

### Continued development

I want to master understanding of clonning the templates

## Author

- Frontend Mentor - [@borisdoginza](https://www.frontendmentor.io/profile/borisdoginza)

