const SERVER_ADDRESS = "http://192.168.1.101:3000";

export function getCards() {
    return fetch(SERVER_ADDRESS + "/cards/list", { 
        method: "GET" 
    });
}

export function postCard(card) {
    console.log(JSON.parse(JSON.stringify(card)));
    return fetch(SERVER_ADDRESS + "/cards/add", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
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
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
    });
}
