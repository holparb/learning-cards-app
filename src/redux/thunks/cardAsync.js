import * as CardActions from "../actions/cardActions";
import * as CardRest from "../../network/cardRest";

/* Async await could also be used here instead of Promise callbacks */

export function fetchCards() {
    return dispatch => {
        dispatch(CardActions.beginFetch());
        console.log("starting fetch...");
        CardRest.getCards()
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                dispatch(CardActions.fetchFailure());
            }
            dispatch(CardActions.fetchSuccess(res));
            return res.products;
        })
        .catch(error => {
            console.log("GET error:", error);
        })
    }
}

export function uploadCard(card) {
    return dispatch => {
        CardRest.postCard(card)
        .then(res => res.json())
        .then(res => {
            if(!res.isSuccessful) {
                if(error === "INVALID_ANSWER_LENGTH") {
                    dispatch(CardActions.invalidAnswer());
                }
                else {
                    dispatch(CardActions.uploadFailure());
                }
                return;
            }
            // construct new card object - get the id from the upload response
            let newCard = { _id: res.id, question: card.question, answer: card.answer }
            console.log("Card added", newCard);
            dispatch(CardActions.uploadSuccess(newCard));
        })
        .catch(error => {
            console.log("POST error:", error);
        })
    }
}

export function updateCard(card) {
    return dispatch => {
        CardRest.patchCard(card)
        .then(res => res.json())
        .then(res => {
            if(!res.isSuccessful) {
                dispatch(CardActions.updateFailure());
                return;
            }
            console.log("Card updated", card);
            dispatch(CardActions.updateSuccess(card));
        })
        .catch(error => {
            console.log("PATCH error:", error);
        })
    }
}

export function deleteCard(card) {
    return dispatch => {
        CardRest.deleteCard(card)
        .then(res => res.json())
        .then(res => {
            if(!res.isSuccessful) {
                dispatch(CardActions.deleteFailure());
                return;
            }
            console.log("Card deleted", card);
            dispatch(CardActions.deleteSuccess(card));
        })
        .catch(error => {
            console.log("PATCH error:", error);
        })
    }
}
