import {
    createContext,
    useContext,
    useState
} from "react";

import {
    getCart,
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
    clearCart
} from "../services/cartService";


const CartContext = createContext(null);


export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => getCart());


    const addToCart = (bike) => {

        const updatedCart = addItemToCart(bike);

        setCart(updatedCart);
    };


    const removeFromCart = (bikeId) => {

        const updatedCart =
            removeItemFromCart(bikeId);

        setCart(updatedCart);
    };


    const decreaseQuantity = (bikeId) => {
        console.log("decreaseQuantity", bikeId);
        const updatedCart =
            decreaseItemQuantity(bikeId);

        setCart(updatedCart);
    };


    const emptyCart = () => {

        clearCart();

        setCart([]);
    };


    const cartCount = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    const cartTotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.prezzo ?? 0) *
            item.quantity,
        0
    );


    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                cartTotal,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                emptyCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {

        throw new Error(
            "useCart deve essere utilizzato dentro CartProvider"
        );
    }

    return context;
};