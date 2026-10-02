import { useEffect, useState } from "react";

import {
    listManufacturers
} from "../../services/bikeService";

import {
    createManufacturer,
    updateManufacturer,
    deleteManufacturer
} from "../../services/manufacturerService";

import ManufacturerForm from "../../components/bikes/ManufacturerForm";


function ManufacturerManagement() {

    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {

        loadInitialData();

    }, []);


    const loadInitialData = async () => {

        try {

            setLoading(true);
            setError("");

            const manufacturersData = await listManufacturers();

            setManufacturers(manufacturersData);

        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setLoading(false);

        }
    };


    const handleNewManufacturer = () => {

        setSelectedManufacturer(null);
        setShowForm(true);

    };


    const handleEditManufacturer = (produttore) => {

        setSelectedManufacturer(produttore);
        setShowForm(true);

    };


    const handleSaveManufacturer = async (produttore) => {

        try {

            setError("");

            if (produttore.id) {

                // MODIFICA
                await updateManufacturer(produttore);

            } else {

                // CREAZIONE
                await createManufacturer(produttore);

            }

            // Ricarica la lista dal backend
            await loadInitialData();

            // Chiude il form
            setShowForm(false);
            setSelectedManufacturer(null);

        } catch (err) {

            console.error(err);

            throw err;
        }
    };


    const handleDeleteManufacturer = async (id) => {

        try {

            setError("");

            await deleteManufacturer(id);

            // Ricarica la lista
            await loadInitialData();

            // Chiude il form
            setShowForm(false);
            setSelectedManufacturer(null);

        } catch (err) {

            console.error(err);

            throw err;
        }
    };


    const handleFormClose = () => {

        setShowForm(false);
        setSelectedManufacturer(null);

    };


    return (
        <div className="manufacturer-management">

            <div className="bike-card">

                <div className="bike-header">

                    <h1>Elenco Produttori</h1>

                    <button
                        type="button"
                        onClick={handleNewManufacturer}
                    >
                        Nuovo Produttore
                    </button>

                </div>

                <hr />


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
                                    <th>Marchio</th>
                                    <th>Nome Azienda</th>
                                    <th>Codice Fiscale</th>
                                    <th>Partita IVA</th>
                                </tr>

                            </thead>


                            <tbody>

                                {manufacturers.map(produttore => (

                                    <tr
                                        key={produttore.id}
                                        className="clickable-row"
                                        onClick={() =>
                                            handleEditManufacturer(produttore)
                                        }
                                    >

                                        <td>
                                            {produttore.marchio}
                                        </td>

                                        <td>
                                            {produttore.nomeAzienda}
                                        </td>

                                        <td>
                                            {produttore.codiceFiscale}
                                        </td>

                                        <td>
                                            {produttore.partitaIva}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {showForm && (

                <ManufacturerForm
                    produttore={selectedManufacturer}
                    onClose={handleFormClose}
                    onSave={handleSaveManufacturer}
                    onDelete={handleDeleteManufacturer}
                />

            )}

        </div>
    );
}


export default ManufacturerManagement;