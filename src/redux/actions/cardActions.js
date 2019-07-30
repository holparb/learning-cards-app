import * as ActionTypes from "./actionTypes";

// action creators for cards

export function beginFetch() {
    return {
        type: ActionTypes.BEGIN_FETCH,
    }
}

export function fetchSuccess(cards) {
    return {
        type: ActionTypes.FETCH_SUCCESS,
        payload: cards
    };
}

export function fetchFailure() {
    return {
        type: ActionTypes.FETCH_FAILURE
    }
}

export function uploadSuccess(card) {
    return {
        type: ActionTypes.UPLOAD_SUCCESS,
        payload: card
    }
}

export function uploadFailure() {
    return {
        type: ActionTypes.UPLOAD_FAILURE
    }
}

export function invalidAnswer(value) {
    return {
        type: ActionTypes.INVALID_ANSWER,
        payload: value
    }
}

export function updateSuccess(card) {
    return {
        type: ActionTypes.UPDATE_SUCCESS,
        payload: card
    }
}

export function updateFailure() {
    return {
        type: ActionTypes.UPDATE_FAILURE
    }
}

export function deleteSuccess(card) {
    return {
        type: ActionTypes.DELETE_SUCCESS,
        payload: card
    }
} 

export function deleteFailure() {
    return {
        type: ActionTypes.DELETE_FAILURE
    }
}