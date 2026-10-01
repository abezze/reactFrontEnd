const API_URL = "http://localhost:9080/rest/prodotto";
const CATEGORY_URL = "http://localhost:9080/rest/categoria";
const MANUFACTURER_URL = "http://localhost:9080/rest/produttore";

export async function listBikes(categoria = null, produttore = null) {

    const params = new URLSearchParams();

    if (categoria !== null && categoria !== undefined) {
        params.append("categoria", categoria);
    }

    if (produttore !== null && produttore !== undefined) {
        params.append("produttore", produttore);
    }

    const query = params.toString();

    const url = query
        ? `${API_URL}/list?${query}`
        : `${API_URL}/list`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Errore nel caricamento delle biciclette");
    }

    return response.json();
}

export async function listCategories() {

    const response = await fetch(`${CATEGORY_URL}/list`);

    if (!response.ok) {
        throw new Error("Errore nel caricamento delle categorie");
    }

    return response.json();
}

export async function listManufacturers() {

    const response = await fetch(`${MANUFACTURER_URL}/list`);

    if (!response.ok) {
        throw new Error("Errore nel caricamento dei produttori");
    }

    return response.json();
}

export async function createBike(bike) {

    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bike)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.msg || "Errore nella creazione della bicicletta"
        );
    }

    return data;
}

export async function updateBike(bike) {

    const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bike)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.msg || "Errore nella modifica della bicicletta"
        );
    }

    return data;
}

export async function deleteBike(productCode) {

    const response = await fetch(
        `${API_URL}/delete/${productCode}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.msg || "Errore nella cancellazione della bicicletta"
        );
    }

    return data;
}

export async function findBike(productCode) {

    const params = new URLSearchParams({
        productCode: productCode
    });

    const response = await fetch(
        `${API_URL}/findByProductCode?${params}`
    );

    if (!response.ok) {
        throw new Error(
            "Errore nel caricamento della bicicletta"
        );
    }

    return response.json();
}