import * as ActionTypes from "../actions/actionTypes";

const initialState = {
    cards: [],
    isFetching: false,
    isAnswerInvalid: false,
    toastVisible: false,
    toastMessage: ""
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.BEGIN_FETCH:
            return Object.assign({}, state, {
                isFetching: true,
            });      

        case ActionTypes.FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                cards: action.payload
            });

        case ActionTypes.FETCH_FAILURE:
            return Object.assign({}, state, {
                isFetching: false  
            });     

        case ActionTypes.UPLOAD_OR_UPDATE_BEGIN:
            return Object.assign({}, state, {
                isAnswerInvalid: false  
            });

        case ActionTypes.UPLOAD_SUCCESS:
            return Object.assign({}, state, {
                cards: [
                    ...state.cards,
                    action.payload
                ]
            });
            
        case ActionTypes.INVALID_ANSWER:
            return Object.assign({}, state, {
                isAnswerInvalid: action.payload
            });

        case ActionTypes.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                cards: state.cards.map(item => (item._id === action.payload._id ? action.payload : item))   
            });

        case ActionTypes.DELETE_SUCCESS:
            return Object.assign({}, state, {
                cards: state.cards.filter(item => item._id !== action.payload._id)
            });
         
        case ActionTypes.SHOW_TOAST:
            return Object.assign({}, state, {
                toastVisible: true,
                toastMessage: action.payload
            });

        case ActionTypes.HIDE_TOAST:
            return Object.assign({}, state, {
                toastVisible: false,
                toastMessage: ""
            });

        default: return state;
    }
}

export default rootReducer;