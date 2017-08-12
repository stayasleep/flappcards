import {
    FETCH_STACKS,
    FETCH_CARD,
    FETCH_MY_STACK_OVERVIEW,
    FETCH_MY_RECENT_STACKS,
    FETCH_STACK_OVERVIEW,
    FETCH_MY_COMMUNITY_STACKS,
    FETCH_FEATURED_STACKS,
    FETCH_FEATURED_ERR,
    CREATE_STACK,
    SEARCH_STACKS,
    AUTOCOMPLETE_SEARCH_STACKS,
    COPY_STACK,
    DELETE_CARD
} from '../actions/types';
const default_state ={
    all: [],
    subj: "",
    course: "",
    creator: "",
    number: "",
    single: [],
    stacks: [],
    card: 0
};

/**
 *
 * @param state
 * @param action
 * @returns {*}
 * @description -   The switch statement catches an action dispatched from an action creator
 *                  (see actions/index.js) then returns an updated state containing the data from
 *                  the Axios call.
 */
export default function (state = default_state, action) {
    switch (action.type){
        case(FETCH_STACKS):
            return{...state,
                all: action.payload.cards,
                subj: action.payload.subject,
                course: action.payload.category,
                creator: action.payload.createdBy,
                number: action.payload.totalCards};
        case(FETCH_CARD):
            return{...state, single: action.payload.cards};
        case FETCH_MY_STACK_OVERVIEW:
            console.log('fetch stack ov',action);
            return{...state, stacks: action.payload};
        case (FETCH_MY_RECENT_STACKS):
            return {...state, recentStacks: action.payload};
        case (FETCH_MY_COMMUNITY_STACKS):
            return {...state,
                communityStacks: action.payload};
        case FETCH_STACK_OVERVIEW:
            console.log('reducer for clicking eyeball on stack',action);
            return {...state, stackCards: action.payload};
        case CREATE_STACK:
            console.log('create stack',action);
            return {...state};
        case (AUTOCOMPLETE_SEARCH_STACKS):
            return {...state, autoCompleteSuggestions: action.payload};
        case (SEARCH_STACKS):
            return {...state, stacks: action.payload};
        case (COPY_STACK):
            return {...state, newStackID: action.payload};
        case (FETCH_FEATURED_STACKS):
            return {...state,featStack:action.payload};
        case (FETCH_FEATURED_ERR):
            return {...state,featErr: action.payload};
        case (DELETE_CARD):
            return {...state}

    }
    return state;
}

// Added recentStacks to the props of the React app