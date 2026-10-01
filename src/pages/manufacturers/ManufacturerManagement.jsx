import { useEffect, useState } from "react";

import {
    listManufacturers
} from "../../services/bikeService";


function ManufacturerManagement() {

    const [manufacturers, setManufacturers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        loadInitialData();

    }, []);

    const loadInitialData = async () => {
    
            try {
    
                setLoading(true);
                setError("");
    
                const [
                    manufacturersData
                ] = await Promise.all([
                    listManufacturers()
                ]);
    
                setManufacturers(manufacturersData);
    
            } catch (err) {
    
                console.error(err);
    
                setError(err.message);
    
            } finally {
    
                setLoading(false);
            }
        };

    const handleNewManufacturer = () => {

        
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
                                    <th></th>
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
                                            handleEditBike(produttore)
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

            

        </div>
    );





}

export default ManufacturerManagement;