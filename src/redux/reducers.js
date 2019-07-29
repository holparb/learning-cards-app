import {FETCH_SUCCESS, ADD_CARD, EDIT_CARD, DELETE_CARD, BEGIN_FETCH} from "./actions";

const initialState = {
    cards: [
        /*
        {_id: "01", question: "What the fuck?", answer: "The actual fuck"},
        {_id: "02", question: "What is the answer?", answer: "Answer"},
        {_id: "03", question: "What the fuck again?", answer: "Yep, it's fuck"},
        */
    ],
    isFetching: false,
};

// The card related reducer functions belong together so it doesn't make sense to split the reducer
function rootReducer(state = initialState, action) {
    switch(action.type) {
        case BEGIN_FETCH:
            return Object.assign({}, state, {
                isFetching: true
            });      

        case FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                cards: action.payload
            });

        case ADD_CARD:
            return Object.assign({}, state, {
                cards: [
                    ...state.cards,
                    action.payload
                ]
            });

        case EDIT_CARD:
            return Object.assign({}, state, {
                cards: state.cards.map(item => (item._id === action.payload._id ? action.payload : item))
            });

        case DELETE_CARD:
            return Object.assign({}, state, {
                cards: state.cards.filter(item => item._id !== action.payload._id)
            });

        default: return state;
    }
}

export default rootReducer;