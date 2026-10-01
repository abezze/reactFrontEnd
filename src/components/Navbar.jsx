import { Link, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const {
        isLogged,
        userId,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-left">

                <span className="menu-icon">
                    ☰
                </span>

                <Link to="/dash/home" className="logo">
                    Bike Shop
                </Link>

            </div>

            <div className="navbar-center">

                {isLogged && (
                    <span>
                        Ciao {userId}
                    </span>
                )}

            </div>

            <div className="navbar-right">

                <Link to="/dash/home" title="Home">
                    🏠
                </Link>

                {isLogged && (
                    <>
                        <CartIcon />

                        <Link to="/profile" title="Profilo">
                            👤
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="icon-button"
                            title="Logout"
                        >
                            🚪
                        </button>
                    </>
                )}

                {!isLogged && (
                    <Link to="/login" title="Login">
                        🔑
                    </Link>
                )}

            </div>

        </nav>
    );
}

export default Navbar;