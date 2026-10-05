import { useEffect, useState } from "react";

import {
    getUserAnags,
    createUser,
    updateUser,
    deleteAddress
} from "../../services/userService";


function UserRegistrationDialog({
    account,
    mode: initialMode,
    tipiIndirizzo,
    ruoli,
    onClose,
    onDeleteUser
}) {

    const [accountData, setAccountData] = useState(account);

    const [mode, setMode] = useState(initialMode);

    const [form, setForm] = useState({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        via: "",
        citta: "",
        cap: "",
        codiceFiscale: "",
        partitaIva: "",
        userName: "",
        password: "",
        passwordControl: "",
        nazione: "",
        tipoIndirizzo: "PRINCIPALE"
    });

    const [msg, setMsg] = useState("");
    const [saving, setSaving] = useState(false);


    /*
     * In creazione il tipo indirizzo è PRINCIPALE
     */

    useEffect(() => {

        const loadAccount = async () => {

            if (initialMode === "C") {

                setMode("C");

                setForm(prev => ({
                    ...prev,
                    tipoIndirizzo: "PRINCIPALE"
                }));

                return;
            }


            if (initialMode === "U" && account?.userName) {

                try {

                    setMsg("");

                    const response = await getUserAnags(
                        account.userName
                    );

                    const anagraficaPrincipale =
                        response.anagrafiche?.find(
                            item =>
                                item.tipoIndirizzo === "PRINCIPALE"
                        );


                    if (anagraficaPrincipale) {

                        const newAccount = {

                            ...account,

                            email:
                                response.email ??
                                account.email,

                            userName:
                                response.userName ??
                                account.userName,

                            role:
                                response.role ??
                                account.role,

                            nome:
                                anagraficaPrincipale.nome,

                            cognome:
                                anagraficaPrincipale.cognome,

                            telefono:
                                anagraficaPrincipale.telefono,

                            via:
                                anagraficaPrincipale.via,

                            citta:
                                anagraficaPrincipale.citta,

                            cap:
                                anagraficaPrincipale.cap,

                            codiceFiscale:
                                anagraficaPrincipale.codiceFiscale,

                            partitaIva:
                                anagraficaPrincipale.partitaIva,

                            nazione:
                                anagraficaPrincipale.nazione,

                            tipoIndirizzo:
                                anagraficaPrincipale.tipoIndirizzo,

                            id:
                                anagraficaPrincipale.id
                        };


                        setAccountData(newAccount);

                        setForm({

                            nome:
                                anagraficaPrincipale.nome ?? "",

                            cognome:
                                anagraficaPrincipale.cognome ?? "",

                            email:
                                response.email ??
                                account.email ??
                                "",

                            telefono:
                                anagraficaPrincipale.telefono ?? "",

                            via:
                                anagraficaPrincipale.via ?? "",

                            citta:
                                anagraficaPrincipale.citta ?? "",

                            cap:
                                anagraficaPrincipale.cap ?? "",

                            codiceFiscale:
                                anagraficaPrincipale.codiceFiscale ?? "",

                            partitaIva:
                                anagraficaPrincipale.partitaIva ?? "",

                            userName:
                                response.userName ??
                                account.userName ??
                                "",

                            password: "",

                            passwordControl: "",

                            nazione:
                                anagraficaPrincipale.nazione ?? "",

                            tipoIndirizzo:
                                "PRINCIPALE"
                        });

                        setMode("U");

                    } else {

                        /*
                        * Utente esistente ma senza anagrafica PRINCIPALE.
                        * Manteniamo comunque i dati disponibili dell'utente.
                        */
                        setAccountData(account);

                        setForm(prev => ({

                            ...prev,

                            nome: account.nome ?? "",
                            cognome: account.cognome ?? "",
                            email: account.email ?? "",
                            telefono: account.telefono ?? "",
                            via: account.via ?? "",
                            citta: account.citta ?? "",
                            cap: account.cap ?? "",
                            codiceFiscale:
                                account.codiceFiscale ?? "",
                            partitaIva:
                                account.partitaIva ?? "",
                            userName:
                                account.userName ?? "",
                            nazione:
                                account.nazione ?? "",
                            tipoIndirizzo:
                                "PRINCIPALE"
                        }));

                        setMode("U");
                    }

                } catch (err) {

                    console.error(
                        "Errore caricamento anagrafica principale:",
                        err
                    );

                    /*
                    * In caso di errore manteniamo il comportamento
                    * precedente usando i dati ricevuti da account.
                    */
                    setAccountData(account);

                    setForm({

                        nome: account.nome ?? "",
                        cognome: account.cognome ?? "",
                        email: account.email ?? "",
                        telefono: account.telefono ?? "",
                        via: account.via ?? "",
                        citta: account.citta ?? "",
                        cap: account.cap ?? "",
                        codiceFiscale:
                            account.codiceFiscale ?? "",
                        partitaIva:
                            account.partitaIva ?? "",
                        userName:
                            account.userName ?? "",
                        password: "",
                        passwordControl: "",
                        nazione:
                            account.nazione ?? "",
                        tipoIndirizzo:
                            "PRINCIPALE"
                    });

                    setMode("U");
                }
            }
        };


        loadAccount();

    }, [initialMode, account]);




    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

        setMsg("");
    };


    /*
     * Equivalente di changeTipoIndirizzo()
     */
    const handleTipoIndirizzoChange = async (event) => {

        const tipo = event.target.value;

        if (!accountData?.userName) {
            return;
        }

        try {

            setMsg("");

            const response = await getUserAnags(
                accountData.userName
            );

            let trovato = false;
            let anagrafica = null;


            for (const item of response.anagrafiche ?? []) {

                if (item.tipoIndirizzo === tipo) {

                    trovato = true;
                    anagrafica = item;
                    break;
                }
            }


            if (trovato) {

                const newAccount = {
                    email: response.email,
                    userName: response.userName,
                    password: response.password,
                    role: response.role,

                    nome: anagrafica.nome,
                    cognome: anagrafica.cognome,
                    telefono: anagrafica.telefono,
                    via: anagrafica.via,
                    citta: anagrafica.citta,
                    cap: anagrafica.cap,
                    codiceFiscale: anagrafica.codiceFiscale,
                    partitaIva: anagrafica.partitaIva,
                    nazione: anagrafica.nazione,
                    tipoIndirizzo: anagrafica.tipoIndirizzo,
                    id: anagrafica.id
                };

                setAccountData(newAccount);

                setForm({
                    nome: anagrafica.nome ?? "",
                    cognome: anagrafica.cognome ?? "",
                    email: response.email ?? "",
                    telefono: anagrafica.telefono ?? "",
                    via: anagrafica.via ?? "",
                    citta: anagrafica.citta ?? "",
                    cap: anagrafica.cap ?? "",
                    codiceFiscale:
                        anagrafica.codiceFiscale ?? "",
                    partitaIva:
                        anagrafica.partitaIva ?? "",
                    userName: response.userName ?? "",
                    password: "",
                    passwordControl: "",
                    nazione: anagrafica.nazione ?? "",
                    tipoIndirizzo: tipo
                });

                setMode("U");

            } else {

                /*
                 * Nuovo indirizzo per un utente esistente
                 */
                setForm(prev => ({
                    ...prev,
                    nome: "",
                    cognome: "",
                    email: response.email ?? "",
                    telefono: "",
                    via: "",
                    citta: "",
                    cap: "",
                    codiceFiscale: "",
                    partitaIva: "",
                    userName: response.userName ?? "",
                    password: response.password ?? "",
                    passwordControl: "",
                    nazione: "",
                    tipoIndirizzo: tipo
                }));

                setAccountData({
                    ...response,
                    userName: response.userName
                });

                setMode("CI");
            }

        } catch (err) {

            console.error(err);

            setMode("C");
        }
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setMsg("");

        if (mode === "C") {
            await handleCreate();
        }

        if (mode === "CI") {
            await handleCreateAddress();
        }

        if (mode === "U") {
            await handleUpdate();
        }
    };


    const handleCreate = async () => {

        if (form.password !== form.passwordControl) {

            setMsg("password non coincidenti");
            return;
        }

        await createAnagrafica(form.userName);
    };


    const handleCreateAddress = async () => {

        await createAnagrafica(
            accountData.userName
        );
    };


    const createAnagrafica = async (userName) => {

        try {

            setSaving(true);
            setMsg("");

            await createUser({

                nome: form.nome,
                cognome: form.cognome,
                email: form.email,
                telefono: form.telefono,
                via: form.via,
                citta: form.citta,
                cap: form.cap,

                userName,

                password: form.password,

                nazione: form.nazione,

                partitaIva: form.partitaIva,

                codiceFiscale:
                    form.codiceFiscale,

                role:
                    accountData?.role ??
                    "USER",

                tipoIndirizzo:
                    form.tipoIndirizzo ??
                    "PRINCIPALE"
            });

            onClose(true);

        } catch (err) {

            console.error(err);

            setMsg(err.message);

        } finally {

            setSaving(false);
        }
    };


    const handleUpdate = async () => {

        try {

            setSaving(true);
            setMsg("");

            const updateBody = {
                id: accountData.id,

                nome: form.nome,
                cognome: form.cognome,
                email: form.email,
                telefono: form.telefono,
                via: form.via,
                citta: form.citta,
                cap: form.cap,
                codiceFiscale: form.codiceFiscale,
                partitaIva: form.partitaIva,
                nazione: form.nazione,
                tipoIndirizzo: form.tipoIndirizzo
            };

            await updateUser(updateBody);

            onClose(true);

        } catch (err) {

            console.error(err);

            setMsg(err.message);

        } finally {

            setSaving(false);
        }
    };


    const handleDeleteAddress = async () => {

        const confirmed = window.confirm(
            "Sicuro di voler eliminare l'indirizzo corrente?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setSaving(true);
            setMsg("");

            await deleteAddress(accountData.id);

            onClose(true);

        } catch (err) {

            console.error(err);

            setMsg(err.message);

        } finally {

            setSaving(false);
        }
    };


    const currentUser =
        localStorage.getItem("userId");


    const isCurrentUser =
        accountData?.userName === currentUser;


    return (
        <div className="dialog-overlay">

            <div className="user-dialog">

                <button
                    type="button"
                    className="dialog-close"
                    onClick={() => onClose(false)}
                >
                    ×
                </button>


                <div className="user-dialog-header">

                    <h2>
                        {mode === "C"
                            ? "Creazione nuovo utente"
                            : `Profilo di ${accountData?.userName ?? ""} ${accountData?.nome ?? ""} ${accountData?.cognome ?? ""}`
                        }
                    </h2>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="user-form"
                >

                    <div className="form-field">

                        <label>
                            Tipo Indirizzo
                        </label>

                        <select
                            name="tipoIndirizzo"
                            value={form.tipoIndirizzo}
                            onChange={handleTipoIndirizzoChange}
                            disabled={mode === "C"}
                        >

                            {tipiIndirizzo.map(tipo => (

                                <option
                                    key={tipo}
                                    value={tipo}
                                >
                                    {tipo}
                                </option>

                            ))}

                        </select>

                    </div>


                    <div className="form-field">
                        <label>Nome</label>
                        <input
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Cognome</label>
                        <input
                            name="cognome"
                            value={form.cognome}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Telefono</label>
                        <input
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Via</label>
                        <input
                            name="via"
                            value={form.via}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Città</label>
                        <input
                            name="citta"
                            value={form.citta}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Nazione</label>
                        <input
                            name="nazione"
                            value={form.nazione}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>CAP</label>
                        <input
                            name="cap"
                            value={form.cap}
                            onChange={handleChange}
                            maxLength={5}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Codice Fiscale</label>
                        <input
                            name="codiceFiscale"
                            value={form.codiceFiscale}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-field">
                        <label>Partita IVA</label>
                        <input
                            name="partitaIva"
                            value={form.partitaIva}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-field">
                        <label>Username</label>

                        <input
                            name="userName"
                            value={form.userName}
                            onChange={handleChange}
                            disabled={mode === "U"}
                        />

                    </div>


                    <div className="form-field">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required={mode === "C"}
                        />

                    </div>


                    {mode === "C" && (

                        <div className="form-field">

                            <label>
                                Retype Password
                            </label>

                            <input
                                type="password"
                                name="passwordControl"
                                value={form.passwordControl}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    )}


                    {msg && (
                        <div className="form-error">
                            {msg}
                        </div>
                    )}


                    <div className="user-dialog-buttons">

                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {mode === "C"
                                ? "Crea nuovo utente"
                                : "Aggiorna il profilo"
                            }
                        </button>


                        {mode === "U" &&
                            form.tipoIndirizzo !== "PRINCIPALE" && (

                                <button
                                    type="button"
                                    className="danger"
                                    onClick={handleDeleteAddress}
                                    disabled={saving}
                                >
                                    Elimina indirizzo corrente
                                </button>

                            )}


                        {!isCurrentUser &&
                            mode !== "C" && (

                                <button
                                    type="button"
                                    className="danger"
                                    onClick={() =>
                                        onDeleteUser(
                                            accountData.userName
                                        )
                                    }
                                    disabled={saving}
                                >
                                    Elimina utente
                                </button>

                            )}

                    </div>

                </form>

            </div>

        </div>
    );
}


export default UserRegistrationDialog;