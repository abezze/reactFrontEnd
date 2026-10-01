function Home() {

    return (
        <div>
            <h1>Bike Shop</h1>

            <p>
                Benvenuto nella dashboard del Bike Shop.
            </p>

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h2>🚲 Biciclette</h2>
                    <p>Gestisci il catalogo delle biciclette.</p>
                </div>

                <div className="dashboard-card">
                    <h2>📦 Ordini</h2>
                    <p>Visualizza e gestisci gli ordini.</p>
                </div>

                <div className="dashboard-card">
                    <h2>🏭 Produttori</h2>
                    <p>Gestisci i produttori.</p>
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