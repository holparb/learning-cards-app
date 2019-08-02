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

export function uploadOrUpdateBegin() {
    return {
        type: ActionTypes.UPLOAD_OR_UPDATE_BEGIN
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

export function deleteSuccess(card) {
    return {
        type: ActionTypes.DELETE_SUCCESS,
        payload: card
    }
} 

export function showToast(message) {
    return {
        type: ActionTypes.SHOW_TOAST,
        payload: message
    }
}

export function hideToast() {
    return {
        type: ActionTypes.HIDE_TOAST
    }
}