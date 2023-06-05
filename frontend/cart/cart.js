function order()
{
    debugger
    const button = document.querySelector('.button')
    const cart = document.getElementById('cart')
    const order = document.querySelector('.order')
    const final_price = document.querySelector('.final_price')

    if (button) {
        // Search for parnt's element
        var parent = button.parentNode;
        var products = cart.parentNode;
        products.removeChild(cart)
        // Remove element from paren's element
       localStorage.removeItem('cartItems')
        parent.removeChild(button);
        final_price.textContent = `0$`
        order.innerHTML = 'Thanks for choosing us'
        window.scrollTo(0, 0);
    }
   
}