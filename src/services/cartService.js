const CART_KEY = "cart";


export const getCart = () => {

    const cart = localStorage.getItem(CART_KEY);

    return cart
        ? JSON.parse(cart)
        : [];
};


export const saveCart = (cart) => {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
    console.log("saveCart ", cart);
    return cart;
};


export const addItemToCart = (bike) => {

    const cart = getCart();

    const existingItem = cart.find(
        item =>
            item.productCode === bike.productCode
    );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...bike,
            quantity: 1
        });
    }


    return saveCart(cart);
};


export const removeItemFromCart = (productCode) => {

    const cart = getCart();

    const updatedCart = cart.filter(
        item =>
            item.productCode !== productCode
    );

    return saveCart(updatedCart);
};


export const decreaseItemQuantity = (productCode) => {

    const cart = getCart();

    const item = cart.find(
        item =>
            item.productCode === productCode
    );


    if (!item) {
        console.log("return cart", productCode);
        return cart;
    }


    if (item.quantity > 1) {

        console.log("item.quantity > 1", item.quantity);
        item.quantity -= 1;
        console.log("item.quantity ", item.quantity);
        return saveCart(cart);
    }


    return removeItemFromCart(productCode);
};


export const clearCart = () => {

    localStorage.removeItem(CART_KEY);
};