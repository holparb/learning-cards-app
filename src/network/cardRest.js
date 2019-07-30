const SERVER_ADDRESS = "http://192.168.70.140:3000";

export function getCards() {
    return fetch(SERVER_ADDRESS + "/cards/list", { 
        method: "GET" 
    });
}

export function postCard(card) {
    return fetch(SERVER_ADDRESS + "/cards/add", {
        method: "POST",
        body: JSON.stringify(card)
    });
}

export function deleteCard(card) {
    return fetch(SERVER_ADDRESS + "/cards/delete/" + card._id, { 
        method: "DELETE" 
    });
}

export function patchCard(card) {
    return fetch(SERVER_ADDRESS + "/cards/update/" + card._id, { 
        method: "PATCH",
        body: JSON.stringify(card)
    });
}
