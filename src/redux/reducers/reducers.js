import * as ActionTypes from "../actions/actionTypes";

const initialState = {
    cards: [],
    isFetching: false,
    isAnswerInvalid: false,
    fetchError: false,
    uploadError: false,
    deleteError: false
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.BEGIN_FETCH:
            return Object.assign({}, state, {
                isFetching: true,
                fetchError: false
            });      

        case ActionTypes.FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                fetchError: false,
                cards: action.payload
            });

        case ActionTypes.FETCH_FAILURE:
            return Object.assign({}, state, {
                fetchError: true,
                isFetching: false  
            });     

        case ActionTypes.UPLOAD_SUCCESS:
            return Object.assign({}, state, {
                cards: [
                    ...state.cards,
                    action.payload
                ],
                isAnswerInvalid: false,
                uploadError: false     
            });
            
        case ActionTypes.UPLOAD_FAILURE:
            return Object.assign({}, state, {
                isAnswerInvalid: false,
                uploadError: true     
            });
            
        case ActionTypes.INVALID_ANSWER:
            return Object.assign({}, state, {
                isAnswerInvalid: true,
                uploadError: false     
            });


        case ActionTypes.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                cards: state.cards.map(item => (item._id === action.payload._id ? action.payload : item)),
                uploadError: false     
            });

        case ActionTypes.UPDATE_FAILURE:
            return Object.assign({}, state, {
                uploadError: true     
            });

        case ActionTypes.DELETE_SUCCESS:
            return Object.assign({}, state, {
                cards: state.cards.filter(item => item._id !== action.payload._id),
                deleteError: false
            });
        
        case ActionTypes.DELETE_FAILURE:
            return Object.assign({}, state, {
                deleteError: true
            });

        default: return state;
    }
}

export default rootReducer;