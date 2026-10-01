import { Link } from "react-router-dom";

function CartIcon() {

    return (
        <Link to="/dash/cart" title="Carrello">
            🛒
        </Link>
    );
}

export default CartIcon;