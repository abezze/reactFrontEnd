import { useEffect, useState } from "react";

function ManufacturerForm({
    produttore,
    onClose,
    onSave,
    onDelete
}) {

    const isEdit = produttore != null;

    const [form, setForm] = useState({
        marchio: "",
        nomeAzienda: "",
        codiceFiscale: "",
        partitaIva: ""
    });

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (produttore) {

            setForm({
                marchio: produttore.marchio || "",
                nomeAzienda: produttore.nomeAzienda || "",
                codiceFiscale: produttore.codiceFiscale || "",
                partitaIva: produttore.partitaIva || ""
            });

        } else {

            setForm({
                marchio: "",
                nomeAzienda: "",
                codiceFiscale: "",
                partitaIva: ""
            });
        }

    }, [produttore]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!form.marchio.trim()) {
            setError("Il marchio è obbligatorio");
            return;
        }

        if (!form.nomeAzienda.trim()) {
            setError("Il nome azienda è obbligatorio");
            return;
        }

        if (!form.codiceFiscale.trim()) {
            setError("Il codice fiscale è obbligatorio");
            return;
        }

        if (!form.partitaIva.trim()) {
            setError("La partita IVA è obbligatoria");
            return;
        }

        try {

            setSaving(true);

            const body = {
                ...form
            };

            if (isEdit) {
                body.id = produttore.id;
            }

            await onSave(body);

        } catch (err) {

            console.error(err);

            setError(err.message || "Errore durante il salvataggio");

        } finally {

            setSaving(false);
        }
    };

    const handleDelete = async () => {

        if (!isEdit) {
            return;
        }

        const confirmed = window.confirm(
            "Sicuro di voler cancellare questo produttore?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            setSaving(true);

            await onDelete(produttore.id);

        } catch (err) {

            console.error(err);

            setError(err.message || "Errore durante la cancellazione");

        } finally {

            setSaving(false);
        }
    };

    return (
        <div className="manufacturer-modal-overlay">

            <div className="manufacturer-form-modal">

                <div className="manufacturer-form-header">

                    <h2>
                        {isEdit
                            ? `Modifica produttore di ${produttore.nomeAzienda}`
                            : "Aggiungi Produttore"
                        }
                    </h2>

                    <button
                        type="button"
                        className="manufacturer-close-button"
                        onClick={onClose}
                        disabled={saving}
                    >
                        ×
                    </button>

                </div>

                <hr />

                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="marchio">
                                Marchio
                            </label>

                            <input
                                id="marchio"
                                name="marchio"
                                type="text"
                                value={form.marchio}
                                onChange={handleChange}
                                disabled={saving}
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="nomeAzienda">
                                Nome Azienda
                            </label>

                            <input
                                id="nomeAzienda"
                                name="nomeAzienda"
                                type="text"
                                value={form.nomeAzienda}
                                onChange={handleChange}
                                disabled={saving}
                            />

                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="codiceFiscale">
                                Codice Fiscale
                            </label>

                            <input
                                id="codiceFiscale"
                                name="codiceFiscale"
                                type="text"
                                value={form.codiceFiscale}
                                onChange={handleChange}
                                disabled={saving}
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="partitaIva">
                                Partita IVA
                            </label>

                            <input
                                id="partitaIva"
                                name="partitaIva"
                                type="text"
                                value={form.partitaIva}
                                onChange={handleChange}
                                disabled={saving}
                            />

                        </div>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="manufacturer-form-actions">

                        {isEdit && (
                            <button
                                type="button"
                                className="manufacturer-delete-button"
                                onClick={handleDelete}
                                disabled={saving}
                            >
                                Elimina
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Annulla
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Salvataggio..."
                                : isEdit
                                    ? "Modifica"
                                    : "Crea"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ManufacturerForm;