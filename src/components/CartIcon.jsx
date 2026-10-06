import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function CartIcon() {

    const { cartCount } = useCart();


    return (

        <Link
            to="/cart"
            className="cart-icon"
        >

            🛒

            {cartCount > 0 && (
                <span className="cart-count">
                    {cartCount}
                </span>
            )}

        </Link>
    );
}


export default CartIcon;