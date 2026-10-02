const UPLOAD_URL = "http://localhost:9080/rest/upload";


export async function uploadImage(file, id) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("id", id);


    const response = await fetch(`${UPLOAD_URL}/image`, {
        method: "POST",
        body: formData
    });


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.msg || "Errore durante il caricamento dell'immagine"
        );

    }


    return data;
}


export async function getImageUrl(filename) {

    const params = new URLSearchParams({
        filename: filename
    });


    const response = await fetch(
        `${UPLOAD_URL}/getUrl?${params.toString()}`
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.msg || "Errore nel recupero dell'immagine"
        );

    }


    return data;
}