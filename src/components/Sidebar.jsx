import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const { isLogged, isAdmin } = useAuth();

    if (!isLogged) {
        return null;
    }

    return (
        <aside className="sidebar">

            <NavLink
                to="/dash/home"
                className={({ isActive }) =>
                    isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                }
            >
                Home
            </NavLink>

            {isAdmin && (
                <>
                    <NavLink
                        to="/dash/user"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        Gestione utenti
                    </NavLink>

                    <NavLink
                        to="/dash/bike"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        Gestione biciclette
                    </NavLink>

                    <NavLink
                        to="/dash/produttori"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        Gestione produttori
                    </NavLink>

                    <NavLink
                        to="/dash/visualizzaordini"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        Gestione ordini
                    </NavLink>
                </>
            )}

        </aside>
    );
}

export default Sidebar;