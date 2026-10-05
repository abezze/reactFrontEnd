import { useEffect, useState } from "react";

import {
    listUsers,
    getTipoIndirizzo,
    getRuoli,
    deleteUser
} from "../../services/userService";

import UserRegistrationDialog from "./UserRegistrationDialog";


function UserManagement() {

    const [users, setUsers] = useState([]);
    const [tipiIndirizzo, setTipiIndirizzo] = useState([]);
    const [ruoli, setRuoli] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [showDialog, setShowDialog] = useState(false);

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
                usersData,
                tipiData,
                ruoliData
            ] = await Promise.all([
                listUsers(),
                getTipoIndirizzo(),
                getRuoli()
            ]);

            setUsers(usersData);
            setTipiIndirizzo(tipiData);
            setRuoli(ruoliData);

        } catch (err) {

            console.error(err);
            setError(err.message);

        } finally {

            setLoading(false);
        }
    };


    const reloadUsers = async () => {

        try {

            setError("");

            const data = await listUsers();

            setUsers(data);

        } catch (err) {

            console.error(err);
            setError(err.message);
        }
    };


    const handleNewUser = () => {

        setSelectedUser(null);
        setShowDialog(true);
    };


    const handleEditUser = (user) => {

        setSelectedUser(user);
        setShowDialog(true);
    };


    const handleDeleteUser = async (userName) => {

        const confirmed = window.confirm(
            `Sicuro di voler cancellare l'utente "${userName}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deleteUser(userName);

            await reloadUsers();

        } catch (err) {

            console.error(err);
            setError(err.message);
        }
    };


    const handleDialogClose = async (reload = false) => {

        setShowDialog(false);
        setSelectedUser(null);

        if (reload) {
            await reloadUsers();
        }
    };


    return (
        <div className="user-management">

            <div className="user-card">

                <div className="user-header">

                    <h1>Gestione Utenti</h1>

                    <button
                        type="button"
                        onClick={handleNewUser}
                    >
                        Nuovo Utente
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

                        <table className="user-table">

                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Nome</th>
                                    <th>Cognome</th>
                                    <th>Email</th>
                                    <th>Ruolo</th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.map(user => (

                                    <tr
                                        key={user.userName}
                                        className="clickable-row"
                                        onClick={() =>
                                            handleEditUser(user)
                                        }
                                    >

                                        <td>
                                            {user.userName}
                                        </td>

                                        <td>
                                            {user.nome}
                                        </td>

                                        <td>
                                            {user.cognome}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.role}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {showDialog && (
                <UserRegistrationDialog
                    account={selectedUser}
                    mode={selectedUser ? "U" : "C"}
                    tipiIndirizzo={tipiIndirizzo}
                    ruoli={ruoli}
                    onClose={handleDialogClose}
                    onDeleteUser={handleDeleteUser}
                />
            )}

        </div>
    );
}


export default UserManagement;