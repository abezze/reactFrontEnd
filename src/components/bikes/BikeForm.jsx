import { useEffect, useState } from "react";

import {
    createBike,
    updateBike
} from "../../services/bikeService";

import {
    uploadImage,
    getImageUrl
} from "../../services/uploadService";

function BikeForm({
    bike,
    categories,
    manufacturers,
    onClose,
    onDelete
}) {

    const isEdit = bike !== null;

    const [form, setForm] = useState({
        descrizione: "",
        productCode: "",
        colore: "",
        taglia: "",
        peso: "",
        quantita: "",
        idCategoria: "",
        idProduttore: "",
        prezzo: ""
    });

    const [image, setImage] = useState(
        bike?.image || null
    );

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [error, setError] = useState("");

    const [saving, setSaving] = useState(false);

    

    useEffect(() => {

        if (bike) {

            setForm({
                descrizione: bike.descrizione ?? "",
                productCode: bike.productCode ?? "",
                colore: bike.colore ?? "",
                taglia: bike.taglia ?? "",
                peso: bike.peso ?? "",
                quantita: bike.quantita ?? "",
                idCategoria: bike.categoria?.id ?? "",
                idProduttore: bike.produttore?.id ?? "",
                prezzo: bike.prezzo ?? ""
            });

            setImage(bike.image || null);
            setSelectedFile(null);
        } else {

            setForm({
                descrizione: "",
                productCode: "",
                colore: "",
                taglia: "",
                peso: "",
                quantita: "",
                idCategoria: "",
                idProduttore: "",
                prezzo: ""
            });

            setImage(null);
            setSelectedFile(null);
        }

    }, [bike]);

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleFileSelected = (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);

        // Anteprima immediata
        const previewUrl = URL.createObjectURL(file);

        setImage(previewUrl);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        try {

            setSaving(true);


            const body = {
                descrizione: form.descrizione,
                productCode: Number(form.productCode),
                colore: form.colore,
                taglia: form.taglia,
                peso: Number(form.peso),
                quantita: Number(form.quantita),
                prezzo: Number(form.prezzo),
                idCategoria: Number(form.idCategoria),
                idProduttore: Number(form.idProduttore)
            };


            if (isEdit) {

                await updateBike(body);

            } else {

                await createBike(body);

            }


            /*
            * Upload della foto solamente
            * se l'utente ne ha selezionata una.
            */
            if (selectedFile) {
                console.log("FILE:", selectedFile);
                console.log("PRODUCT CODE:", form.productCode);
                await uploadImage(
                    selectedFile,
                    form.productCode
                );

            }



        } catch (err) {

            console.error(err);

            setError(
                err.message || "Errore durante il salvataggio"
            );

        } finally {

            setSaving(false);

        }
    };

    return (
        <div className="modal-overlay">

            <div className="bike-form-modal">

                <button
                    type="button"
                    className="modal-close"
                    onClick={() => onClose(false)}
                >
                    ×
                </button>

                <h2>
                    {isEdit
                        ? `Modifica prodotto di ${bike.descrizione} ${bike.colore ?? ""}`
                        : "Aggiungi Prodotto"
                    }
                </h2>

                <div className="image-section">

                    <h3>Immagine</h3>

                    {image ? (

                        <img
                            src={image}
                            alt="Uploaded"
                            className="bike-form-image"
                        />

                    ) : (

                        <img
                            src="/no_image.png"
                            alt="Uploaded"
                            className="bike-form-image"
                        />

                    )}

                    <label className="file-button">

                        Scegli immagine

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelected}
                            hidden
                        />

                    </label>

                    {selectedFile && (
                        <span>
                            Caricata: {selectedFile.name}
                        </span>
                    )}

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <div className="form-field">

                            <label>
                                Categoria
                            </label>

                            <select
                                name="idCategoria"
                                value={form.idCategoria}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Seleziona categoria
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

                        </div>

                        <div className="form-field">

                            <label>
                                Produttore
                            </label>

                            <select
                                name="idProduttore"
                                value={form.idProduttore}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Seleziona produttore
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

                        </div>

                        <div className="form-field">

                            <label>
                                Codice Prodotto
                            </label>

                            <input
                                type="number"
                                name="productCode"
                                value={form.productCode}
                                onChange={handleChange}
                                disabled={isEdit}
                                required
                            />

                        </div>

                        <div className="form-field">

                            <label>
                                Descrizione
                            </label>

                            <input
                                type="text"
                                name="descrizione"
                                value={form.descrizione}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-field">

                            <label>
                                Taglia
                            </label>

                            <input
                                type="text"
                                name="taglia"
                                value={form.taglia}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-field">

                            <label>
                                Peso
                            </label>

                            <input
                                type="number"
                                step="any"
                                name="peso"
                                value={form.peso}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-field">

                            <label>
                                Quantità
                            </label>

                            <input
                                type="number"
                                name="quantita"
                                value={form.quantita}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-field">

                            <label>
                                Colore
                            </label>

                            <input
                                type="text"
                                name="colore"
                                value={form.colore}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-field">

                            <label>
                                Prezzo
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="prezzo"
                                value={form.prezzo}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-buttons">

                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Salvataggio..."
                                : isEdit
                                    ? "Aggiorna il prodotto"
                                    : "Crea nuovo prodotto"
                            }
                        </button>

                        {isEdit && (
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() =>
                                    onDelete(bike.productCode)
                                }
                            >
                                Elimina il prodotto
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => onClose(false)}
                        >
                            Annulla
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default BikeForm;