import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

import {
    listBikes,
    listCategories,
    listManufacturers,
    deleteBike
} from "../../services/bikeService";

import BikeForm from "../../components/bikes/BikeForm";

function BikeManagement() {

    const [bikes, setBikes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);

    const [selectedBike, setSelectedBike] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isAdmin = localStorage.getItem("isAdmin") === "1";

    const { addToCart } = useCart();

    useEffect(() => {

        loadInitialData();

    }, []);

    const handleAddToCart = (bike) => {

        addToCart(bike);

    };

    const { addItemToCart } = useCart();

    const loadInitialData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                bikesData,
                categoriesData,
                manufacturersData
            ] = await Promise.all([
                listBikes(),
                listCategories(),
                listManufacturers()
            ]);

            setBikes(bikesData);
            setCategories(categoriesData);
            setManufacturers(manufacturersData);

        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };

    const search = async (
        category = selectedCategory,
        manufacturer = selectedManufacturer
    ) => {

        try {

            setLoading(true);
            setError("");

            const data = await listBikes(
                category?.id ?? null,
                manufacturer?.id ?? null
            );

            setBikes(data);

        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };

    const handleCategoryChange = (event) => {

        const value = event.target.value;

        const category = value
            ? categories.find(
                item => String(item.id) === value
            )
            : null;

        setSelectedCategory(category);

        search(category, selectedManufacturer);
    };

    const handleManufacturerChange = (event) => {

        const value = event.target.value;

        const manufacturer = value
            ? manufacturers.find(
                item => String(item.id) === value
            )
            : null;

        setSelectedManufacturer(manufacturer);

        search(selectedCategory, manufacturer);
    };

    const clearCategory = () => {

        setSelectedCategory(null);

        search(null, selectedManufacturer);
    };

    const clearManufacturer = () => {

        setSelectedManufacturer(null);

        search(selectedCategory, null);
    };

    const handleNewBike = () => {

        setSelectedBike(null);
        setShowForm(true);
    };

    const handleEditBike = (bike) => {

        setSelectedBike(bike);
        setShowForm(true);
    };

    const handleDeleteBike = async (productCode) => {

        const confirmed = window.confirm(
            "Sicuro di voler cancellare questo prodotto?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deleteBike(productCode);

            await search();

        } catch (err) {

            console.error(err);

            setError(err.message);
        }
    };

    const handleFormClose = async (reload = false) => {

        setShowForm(false);
        setSelectedBike(null);

        if (reload) {
            await search();
        }
    };

    return (
        <div className="bike-management">

            <div className="bike-card">

                <div className="bike-header">

                    <h1>Elenco Biciclette</h1>

                    {isAdmin && (
                        <button
                            type="button"
                            onClick={handleNewBike}
                        >
                            Nuovo Prodotto
                        </button>
                    )}

                </div>

                <hr />

                <div className="bike-filters">

                    <div className="filter">

                        <label htmlFor="category">
                            Categoria
                        </label>

                        <select
                            id="category"
                            value={selectedCategory?.id ?? ""}
                            onChange={handleCategoryChange}
                        >

                            <option value="">
                                Tutte
                            </option>

                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.descrizione}
                                </option>
                            ))}

                        </select>

                        {selectedCategory && (
                            <button
                                type="button"
                                onClick={clearCategory}
                                title="Cancella"
                            >
                                ×
                            </button>
                        )}

                    </div>

                    <div className="filter">

                        <label htmlFor="manufacturer">
                            Produttori
                        </label>

                        <select
                            id="manufacturer"
                            value={selectedManufacturer?.id ?? ""}
                            onChange={handleManufacturerChange}
                        >

                            <option value="">
                                Tutti
                            </option>

                            {manufacturers.map(manufacturer => (
                                <option
                                    key={manufacturer.id}
                                    value={manufacturer.id}
                                >
                                    {manufacturer.nomeAzienda}
                                </option>
                            ))}

                        </select>

                        {selectedManufacturer && (
                            <button
                                type="button"
                                onClick={clearManufacturer}
                                title="Cancella"
                            >
                                ×
                            </button>
                        )}

                    </div>

                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {loading ? (
                    <p>Caricamento...</p>
                ) : (

                    <div className="table-container">

                        <table className="bike-table">

                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Descrizione</th>
                                    <th>Colore</th>
                                    <th>Marca</th>
                                    <th>Taglia</th>
                                    <th>Quantità</th>
                                    <th>Codice Prodotto</th>
                                    <th>Prezzo</th>
                                </tr>
                            </thead>

                            <tbody>

                                {bikes.map(bike => (

                                    <tr
                                        key={bike.productCode}
                                        className="clickable-row"
                                        onClick={() =>
                                            handleEditBike(bike)
                                        }
                                    >

                                        <td
                                            onClick={(event) =>
                                                event.stopPropagation()
                                            }
                                        >

                                            {bike.image ? (

                                                <img
                                                    src={bike.image}
                                                    alt="Bike preview"
                                                    className="bike-image"
                                                    onClick={() =>
                                                        window.open(
                                                            bike.image,
                                                            "_blank"
                                                        )
                                                    }
                                                />

                                            ) : (

                                                <img
                                                    src="/no_image.png"
                                                    alt="Bike preview"
                                                    className="bike-image"
                                                />

                                            )}

                                        </td>

                                        <td>
                                            {bike.descrizione}
                                        </td>

                                        <td>
                                            {bike.colore}
                                        </td>

                                        <td>
                                            {bike.produttore?.marchio}
                                        </td>

                                        <td>
                                            {bike.taglia}
                                        </td>

                                        <td>
                                            {bike.quantita}
                                        </td>

                                        <td>
                                            {bike.productCode}
                                        </td>

                                        <td>
                                            {Number(
                                                bike.prezzo
                                            ).toLocaleString(
                                                "it-IT",
                                                {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }
                                            )}
                                        </td>

                                        <td onClick={(event) => event.stopPropagation()}>
                                            <button
                                                type="button"
                                                onClick={() => handleAddToCart(bike)}
                                                title="Aggiungi al carrello"
                                            >
                                                🛒
                                            </button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {showForm && (
                <BikeForm
                    bike={selectedBike}
                    categories={categories}
                    manufacturers={manufacturers}
                    onClose={handleFormClose}
                    onDelete={handleDeleteBike}
                />
            )}

        </div>
    );
}

export default BikeManagement;