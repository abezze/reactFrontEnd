const MANUFACTURER_URL = "http://localhost:9080/rest/produttore";

export async function createManufacturer(manufacturer) {

    const response = await fetch(`${MANUFACTURER_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manufacturer)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.msg || "Errore nella creazione del produttore"
        );
    }

    return data;
}


export async function updateManufacturer(manufacturer) {

    const response = await fetch(`${MANUFACTURER_URL}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manufacturer)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.msg || "Errore nella modifica del produttore"
        );
    }

    return data;
}


export async function deleteManufacturer(id) {

    const response = await fetch(
        `${MANUFACTURER_URL}/delete/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.msg || "Errore nella cancellazione del produttore"
        );
    }

    return data;
}