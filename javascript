document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Simple login validation
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('store-page').style.display = 'block';
    } else {
        alert("Please enter valid credentials.");
    }
});

let basket = [];
let totalAmount = 0;

document.querySelectorAll('.add-to-basket').forEach(function (button) {
    button.addEventListener('click', function () {
        let item = button.getAttribute('data-item');
        let price = parseFloat(button.getAttribute('data-price'));

        basket.push({ item, price });
        updateBasket();
    });
});

function updateBasket() {
    let basketList = document.getElementById('basket-items');
    basketList.innerHTML = '';
    totalAmount = 0;

    basket.forEach(function (product, index) {
        let listItem = document.createElement('li');
        listItem.textContent = product.item + " - $" + product.price;
        let removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.style.marginLeft = "10px";
        removeBtn.addEventListener('click', function () {
            basket.splice(index, 1);
            updateBasket();
        });
        listItem.appendChild(removeBtn);
        basketList.appendChild(listItem);
        totalAmount += product.price;
    });

    document.getElementById('checkout-btn').style.display = basket.length ? 'block' : 'none';
}

document.getElementById('checkout-btn').addEventListener('click', function () {
    document.getElementById('store-page').style.display = 'none';
    document.getElementById('payment-page').style.display = 'block';
    document.getElementById('amount').value = totalAmount;
});

document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let pin = document.getElementById('pin').value;
    let paymentMethod = document.getElementById('payment-method').value;

    alert(`Order placed successfully!
    Name: ${name}
    Phone: ${phone}
    Address: ${address}
    PIN: ${pin}
    Amount: $${totalAmount}
    Payment Method: ${paymentMethod}`);

    // Reset everything after order
    basket = [];
    totalAmount = 0;
    document.getElementById('basket-items').innerHTML = '';
    document.getElementById('store-page').style.display = 'none';
    document.getElementById('payment-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
});
