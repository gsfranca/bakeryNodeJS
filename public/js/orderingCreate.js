let cart = {};  // Object to store items in the cart with their quantities and prices

function updateItemQuantity(itemName, itemPrice, change) {
    // Initialize item in cart if it doesn't exist
    if (!cart[itemName]) {
        cart[itemName] = {
            quantity: 0,
            price: itemPrice
        };

    }

    // Update item quantity
    cart[itemName].quantity += change;

    // Prevent negative quantity
    if (cart[itemName].quantity < 0) {
        cart[itemName].quantity = 0;
    }

    // Update quantity display
    document.getElementById(`quantity_${itemName}`).innerText = cart[itemName].quantity;

    // Update cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    let itemsList = document.querySelector('.itemsList');
    itemsList.innerHTML = '';  // Clear current items list

    let totalQuantity = 0;
    let totalPrice = 0;

    // Iterate over cart items
    for (let itemName in cart) {
        if (cart[itemName].quantity > 0) {
            // Create item ordered display
            let itemDisplay = document.createElement('p');
            itemDisplay.classList.add('itemsOrdered');
            itemDisplay.innerHTML = `<text class="quantity_itemOrdered">${cart[itemName].quantity}</text>
                                     <text class="name_itemOrdered">${itemName}</text>
                                     <text class="price_itemOrdered">${(cart[itemName].quantity * cart[itemName].price).toFixed(2)}</text>`;
            itemsList.appendChild(itemDisplay);

            // Update total quantity and price
            totalQuantity += cart[itemName].quantity;
            totalPrice += cart[itemName].quantity * cart[itemName].price;
        }
    }

    // Update total display
    document.getElementById('total_ordering').innerText = totalPrice.toFixed(2);
}

function prepareOrderData() {
    const cartDataInput = document.getElementById('cartData');
    const totalOrderingInput = document.getElementById('totalOrderingInput');

    // Calculate the total price
    let totalPrice = 0;
    for (let itemName in cart) {
        totalPrice += cart[itemName].quantity * cart[itemName].price;
    }

    // Set the cart data and total price in hidden inputs
    cartDataInput.value = JSON.stringify(cart);
    totalOrderingInput.value = totalPrice.toFixed(2);
}

// Rendering items dynamically
items.forEach(item => {
    let itemCard = `
    <div class="col cardItem">
        <img src="${item.Imagem}" alt="${item.Nome}" class="picture_itemToChoose">
        <h3 class="name_itemToChoose">${item.Nome}</h3>
        <p class="description_itemToChoose">${item.Descricao}</p>
        <p class="price_itemToChoose" data-price="${item.Valor}">
            <text>${item.Valor}</text>
            <text>/Unidade</text>
        </p>
        <div class="row row-cols-3 addCol">
            <button class="col addButtons" onclick="updateItemQuantity('${item.Nome}', ${item.Valor}, -1)"><text>-</text></button>
            <p class="col numberAddButton" id="quantity_${item.Nome}">0</p>
            <button class="col addButtons" onclick="updateItemQuantity('${item.Nome}', ${item.Valor}, 1)"><text>+</text></button>
        </div>
    </div>`;
    document.querySelector('.row-cols-4').innerHTML += itemCard;
});
