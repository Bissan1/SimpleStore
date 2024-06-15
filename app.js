// Selecting elements from the DOM
let iconcart = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closecart = document.querySelector('#cart-close');

// Event listener to open the cart when the cart icon is clicked
iconcart.onclick = () => {
    cart.classList.add("active");
};

// Event listener to close the cart when the close button is clicked
closecart.onclick = () => {
    cart.classList.remove("active");
};

// Check if the document is ready and call the ready function
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Main function that sets up event listeners
function ready() {
    // Event listeners for removing items from the cart
    var remove = document.getElementsByClassName('cart-delete');
    console.log(remove);
    for (var i = 0; i < remove.length; i++) {
        var button = remove[i];
        button.addEventListener("click", removeitems);
    }

    // Event listeners for changing item quantities in the cart
    var quantityinputs = document.getElementsByClassName('quantity');
    for (var i = 0; i < quantityinputs.length; i++) {
        var inputs = quantityinputs[i];
        inputs.addEventListener('change', quantitychanged);
    }
    
    // Event listeners for adding items to the cart
    var adding = document.getElementsByClassName('add-cart');
    for (var i = 0; i < adding.length; i++) {
        var button = adding[i];
        button.addEventListener('click', clicktoadd);
    }

    // Event listener for the buy button
    document.getElementsByClassName('button-buy')[0].addEventListener('click', buyButton);
}

// Function to handle buy button click, redirects to login page
function buyButton() {
    window.location.href = 'login.html';
}

// Function to remove items from the cart
function removeitems(event) {
    var clicked = event.target;
    clicked.parentElement.remove();
    updating();
}

// Function to handle changes in item quantity
function quantitychanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updating();
}

// Function to handle adding items to the cart
function clicktoadd(event) {
    var button = event.target;
    var products = button.parentElement;
    var title = products.getElementsByClassName("product-title")[0].innerText;
    var price = products.getElementsByClassName("price")[0].innerText;
    var productimg = products.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productimg);
    showNotification();
    updating();
}

// Function to add products to the cart DOM element
function addProductToCart(title, price, productimg) {
    var Cartshop = document.createElement('div');
    Cartshop.classList.add('cart-box');
    // Check if item is already in the cart and alert if it is
    var CartItems = document.getElementsByClassName('cart-contant')[0];
    var CartItemsNames = CartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < CartItemsNames.length; i++) {
        if (CartItemsNames[i].innerText == title) {
            alert("You Have Already Add This Item To The Cart");
            return;
        }
    }

    var cartboxcontent = `
        <img src="${productimg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="quantity">
        </div>
        <i class='bx bxs-trash-alt cart-delete'></i>
    `;
    Cartshop.innerHTML = cartboxcontent;
    CartItems.append(Cartshop);

    // Adds an animation class when a new item is added to the cart
    Cartshop.classList.add('added');

    // Removes the animation class after the animation duration ends
    setTimeout(() => {
        Cartshop.classList.remove('added');
    }, 500);

    // Adds event listeners to the newly created cart item for delete and quantity change
    Cartshop.getElementsByClassName('cart-delete')[0].addEventListener("click", removeitems);
    Cartshop.getElementsByClassName('quantity')[0].addEventListener("change", quantitychanged);

    // Calls the update function to recalculate the total
    updating();
}

// Function to display a notification
function showNotification() {
    var notififation = document.getElementById('notification');
    // Shows the notification element
    notififation.classList.add('show');
    // Hides the notification after a set time
    setTimeout(function() {
        notififation.classList.remove('show');
    }, 3000);
}

// Function to update the total price of items in the cart
function updating() {
    var contant = document.getElementsByClassName('cart-contant')[0];
    var boxes = contant.getElementsByClassName('cart-box');
    var total = 0;
    // Loops through each cart box to calculate the total price
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        var priceElement = box.getElementsByClassName('cart-price')[0];
        var quantityElement = box.getElementsByClassName('quantity')[0];
        // Parses the price and multiplies by the quantity
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity1 = quantityElement.value;
        total = total + (price * quantity1);
    }
    // Updates the total price text
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}
