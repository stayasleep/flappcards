import {
    FETCH_STACKS,
    FETCH_CARD,
    FETCH_MY_STACK_OVERVIEW,
    FETCH_MY_RECENT_STACKS,
    FETCH_STACK_OVERVIEW,
    FETCH_STACK_OVERVIEW_TITLES,
    FETCH_MY_COMMUNITY_STACKS,
    FETCH_FEATURED_STACKS,
    FETCH_FEATURED_ERR,
    CREATE_STACK,
    SEARCH_STACKS,
    STACK_UNAVAILABLE,
    STACK_UNAVAILABLE_RESET,
    AUTOCOMPLETE_SEARCH_STACKS,
    COPY_STACK,
    DELETE_CARD,
    RESET_SEARCH,
    RESET_STACKCARDS

} from '../actions/types';
const default_state ={
    all: [],
    subj: "",
    course: "",
    creator: "",
    number: "",
    single: [],
    stacks: null,
    searched: null,
    card: 0,
    unavailable: false,
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
            // console.log("fetch_stacks");
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
            return {...state,unavailable: false, stackCards: action.payload, subj:action.payload[0].subject, course: action.payload[0].category};
        case FETCH_STACK_OVERVIEW_TITLES:
            return {...state, subj: action.payload.subject, course: action.payload.category};
        case CREATE_STACK:
            console.log('create stack',action);
            return {...state};
        case (AUTOCOMPLETE_SEARCH_STACKS):
            return {...state, autoCompleteSuggestions: action.payload};
        case (SEARCH_STACKS):
            return {...state, searched: action.payload};
        case STACK_UNAVAILABLE:
            return{...state, unavailable: action.payload};
        case STACK_UNAVAILABLE_RESET:
            return {...state, unavailable: action.payload};
        case (COPY_STACK):
            return {...state, newStackID: action.payload};
        case (FETCH_FEATURED_STACKS):
            return {...state,featStack:action.payload};
        case (FETCH_FEATURED_ERR):
            return {...state,featErr: action.payload};
        case (DELETE_CARD):
            return {...state};
        case RESET_SEARCH:
            return {...state, searched: action.payload};
        case RESET_STACKCARDS:
            console.log('reducer for reset stackcards');
            return {...state, stackCards: action.payload};

    }
    return state;
}

// Added recentStacks to the props of the React app