const USER_URL = "http://localhost:9080/rest/utente";
const ANAGRAFICA_URL = "http://localhost:9080/rest/anagrafica";


async function handleResponse(response) {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.msg || "Errore durante la comunicazione con il server"
        );
    }

    return data;
}


export async function listUsers() {
    const response = await fetch(`${USER_URL}/list`);

    return handleResponse(response);
}


export async function getUserAnags(userName) {
    const params = new URLSearchParams({
        userName
    });

    const response = await fetch(
        `${USER_URL}/findByUserName?${params.toString()}`
    );

    return handleResponse(response);
}


export async function getTipoIndirizzo() {
    const response = await fetch(
        `${ANAGRAFICA_URL}/listTipoIndirizzo`
    );

    return handleResponse(response);
}


export async function getRuoli() {
    const response = await fetch(
        `${USER_URL}/listRuoli`
    );

    return handleResponse(response);
}


export async function createUser(body) {
    const response = await fetch(
        `${ANAGRAFICA_URL}/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    return handleResponse(response);
}


export async function updateUser(body) {
    const response = await fetch(
        `${ANAGRAFICA_URL}/update`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    return handleResponse(response);
}


export async function deleteUser(userName) {
    const response = await fetch(
        `${USER_URL}/delete/${encodeURIComponent(userName)}`,
        {
            method: "DELETE"
        }
    );

    return handleResponse(response);
}


export async function deleteAddress(id) {
    const response = await fetch(
        `${ANAGRAFICA_URL}/delete/${id}`,
        {
            method: "DELETE"
        }
    );

    return handleResponse(response);
}


export async function updateRole(body) {
    const response = await fetch(
        `${USER_URL}/updateRole`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    return handleResponse(response);
}


export async function changePassword(body) {
    const response = await fetch(
        `${USER_URL}/changePwd`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    return handleResponse(response);
}