//Too few action types to place in a different files, in case of a more complex logic and more types, a separate file makes sense
export const SET_CARDS = "SET_CARDS";
export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DELETE_CARD = "DELETE_CARD";

export function setCards(cards) {
    return{
        type: SET_CARDS,
        payload: cards
    };
}

export function addCard(card) {
    return{
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

