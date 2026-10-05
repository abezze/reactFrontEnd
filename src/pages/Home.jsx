import { Link } from "react-router-dom";


import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";



import UserManagement from "../pages/users/UserManagement";
import BikeManagement from "../pages/bikes/BikeManagement";
import ManufacturerManagement from "../pages/manufacturers/ManufacturerManagement";

function Home() {

    return (
        <div>
            <h1>Bike Shop</h1>

            <p>
                Benvenuto nella dashboard del Bike Shop.
            </p>

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    
                    <Link
                        to="/dash/bike"
                        className="dashboard-card">
                        <h2>📦 Biciclette</h2>
                        <p>Catalogo biciclette.</p>
                    </Link>
                </div>

                <div className="dashboard-card">
                    <h2>📦 Ordini</h2>
                    <p>Visualizza e gestisci gli ordini.</p>
                </div>

                <div className="dashboard-card">
                    <Link
                        to="/dash/produttori"
                        className="dashboard-card">
                        <h2>📦 Produttori</h2>
                        <p>Visualizza e gestisci i produttori.</p>
                    </Link>
                </div>

                <div className="dashboard-card">
                    <h2>🛒 Carrello</h2>
                    <p>Visualizza il contenuto del carrello.</p>
                </div>

            </div>
        </div>
    );
}

export default Home;