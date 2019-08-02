import * as CardActions from "../actions/cardActions";
import * as CardRest from "../../network/cardRest";

// helper function to send messages using Toast for both iOS and Android
function sendToastMessage(message, dispatch) {
    dispatch(CardActions.showToast(message));
    setTimeout(() => dispatch(CardActions.hideToast()), 2500);
}

// async/await could also be used here instead of Promise callbacks

export function fetchCards() {
    return dispatch => {
        dispatch(CardActions.beginFetch());
        CardRest.getCards()
        .then(res => res.json())
        .then(res => {
            if(!res.isSuccessful) {
                // dispatch fetchFailure to make the spinner disappear in case the cards cannot be loaded from the server
                dispatch(CardActions.fetchFailure());
                sendToastMessage("Unable to fetch cards!", dispatch);
                return false;
            }
            dispatch(CardActions.fetchSuccess(res));
            return res.products;
        })
        .catch(error => {
            console.log("GET error:", error);
            dispatch(CardActions.fetchFailure());
            sendToastMessage("Unable to fetch cards!", dispatch);
        })
    }
}

export function uploadCard(card) {
    return dispatch => {
        // call uploadOrUpdateBegin action to make sure that the invalid answer text is not displayed in case of a network error
        dispatch(CardActions.uploadOrUpdateBegin());
        CardRest.postCard(card)
        .then(res => res.json())
        .then(res => {
            if(!res.isSuccessful) {
                if(res.error === "INVALID_ANSWER_LENGTH") {
                    dispatch(CardActions.invalidAnswer(true));
                }
                else {
                    sendToastMessage("Could not upload card, try again", dispatch);
                }
                return false;
            }
            // construct new card object - get the id from the upload response
            let newCard = { _id: res.id, question: card.question, answer: card.answer }
            dispatch(CardActions.uploadSuccess(newCard));
            sendToastMessage("Successfully added card!", dispatch);
            return true;
        })
        .catch(error => {
            console.log("POST error:", error);
            sendToastMessage("Could not upload card, try again", dispatch);
        })
    }
}

export function updateCard(card) {
    return dispatch => {
        // call uploadOrUpdateBegin action to make sure that the invalid answer text is not displayed in case of a network error
        dispatch(CardActions.uploadOrUpdateBegin());
        CardRest.patchCard(card)
        .then(res => res.json())
        .then(res => {
            if(!res.isSuccessful) {
                sendToastMessage("Could not update card, try again", dispatch);
                return false;
            }
            dispatch(CardActions.updateSuccess(card));
            sendToastMessage("Successfully updated card!", dispatch);
            return true;
        })
        .catch(error => {
            console.log("PATCH error:", error);
            sendToastMessage("Could not update card, try again", dispatch);
        })
    }
}

export function deleteCard(card) {
    return dispatch => {
        CardRest.deleteCard(card)
        .then(res => res.json())
        .then(res => {
            if(!res.isSuccessful) {
                sendToastMessage("Could not delete card, try again", dispatch);
                return false;
            }
            dispatch(CardActions.deleteSuccess(card));
            sendToastMessage("Successfully deleted card!", dispatch);
            return true;
        })
        .catch(error => {
            console.log("PATCH error:", error);
            sendToastMessage("Could not delete card, try again", dispatch);
        })
    }
}
