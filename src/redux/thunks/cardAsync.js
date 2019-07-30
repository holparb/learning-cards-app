import * as CardActions from "../actions/cardActions";
import * as CardRest from "../../network/cardRest";

/* Async await could also be used here instead of Promise callbacks */

export function fetchCards() {
    return dispatch => {
        dispatch(CardActions.beginFetch());
        CardRest.getCards()
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                dispatch(CardActions.fetchFailure());
                return false;
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
                if(res.error === "INVALID_ANSWER_LENGTH") {
                    dispatch(CardActions.invalidAnswer(true));
                }
                else {
                    dispatch(CardActions.uploadFailure());
                }
                return false;
            }
            // construct new card object - get the id from the upload response
            let newCard = { _id: res.id, question: card.question, answer: card.answer }
            dispatch(CardActions.uploadSuccess(newCard));
            return true;
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
                return false;
            }
            dispatch(CardActions.updateSuccess(card));
            return true;
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
                return false;
            }
            dispatch(CardActions.deleteSuccess(card));
            return true;
        })
        .catch(error => {
            console.log("PATCH error:", error);
        })
    }
}
