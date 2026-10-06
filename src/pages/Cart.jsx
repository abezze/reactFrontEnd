import { useCart } from "../context/CartContext";


function Cart() {

    const {
        cart,
        cartCount,
        cartTotal,
        removeFromCart,
        decreaseQuantity,
        addToCart,
        emptyCart
    } = useCart();


    if (cart.length === 0) {

        return (
            <div className="cart-page">

                <h1>Carrello</h1>

                <p>
                    Il carrello è vuoto.
                </p>

            </div>
        );
    }


    return (

        <div className="cart-page">

            <h1>Carrello</h1>

            <p>
                Articoli: {cartCount}
            </p>


            <div className="cart-items">

                {cart.map(item => (

                    <div
                        key={item.productCode}
                        className="cart-item"
                    >

                        <div>

                            <h3>
                                {item.descrizione}
                            </h3>

                            <p>
                                Codice:
                                {" "}
                                {item.productCode}
                            </p>

                            <p>
                                Prezzo:
                                {" "}
                                {Number(
                                    item.prezzo ?? 0
                                ).toLocaleString(
                                    "it-IT",
                                    {
                                        style: "currency",
                                        currency: "EUR"
                                    }
                                )}
                            </p>

                        </div>


                        <div className="cart-quantity">

                            <button
                                type="button"
                                onClick={() =>
                                    decreaseQuantity(
                                        item.productCode
                                    )
                                }
                            >
                                −
                            </button>

                            <span>
                                {item.quantity}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    addToCart(item)
                                }
                            >
                                +
                            </button>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                removeFromCart(
                                    item.productCode
                                )
                            }
                        >
                            🗑️
                        </button>

                    </div>

                ))}

            </div>


            <div className="cart-summary">

                <h2>
                    Totale:{" "}
                    {cartTotal.toLocaleString(
                        "it-IT",
                        {
                            style: "currency",
                            currency: "EUR"
                        }
                    )}
                </h2>


                <button
                    type="button"
                    onClick={emptyCart}
                >
                    Svuota carrello
                </button>

            </div>

        </div>
    );
}


export default Cart;