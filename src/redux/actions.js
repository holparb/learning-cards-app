// Too few action types to place in a different files, in case of a more complex logic and more types, a separate file makes sense
export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const BEGIN_FETCH = "BEGIN_FETCH";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export function beginFetch() {
    return {
        type: BEGIN_FETCH,
    }
}

export function fetchSuccess(cards) {
    return {
        type: FETCH_SUCCESS,
        payload: cards
    };
}

export function addCard(card) {
    return {
        type: ADD_CARD,
        payload: card
    };
}

export function editCard(card) {
    return {
        type: EDIT_CARD,
        payload: card
    };
}

export function deleteCard(card) {
    return {
        type: DELETE_CARD,
        payload: card
    };
}

/********* thunks *********/

export function fetchCards() {
    return dispatch => {
        dispatch(beginFetch());
        console.log("starting fetch...");
        fetch("http://10.217.240.136:3000/cards/list", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            console.log("response: ", res);
            dispatch(fetchSuccess(res));
            return res.products;
        })
        .catch(error => {
            console.log("Fetch error:", error);
        })
    }
}