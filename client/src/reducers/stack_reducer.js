import {FETCH_STACKS, FETCH_CARD} from '../actions/types';

const default_state ={
    all: [],
    subj: "",
    course: "",
    creator: "",
    number: "",
    single: []
};


export default function (state = default_state, action) {
    console.log("stack_reducer", action);
    switch (action.type){

        case(FETCH_STACKS):

            return{...state,

                all: action.payload.cards,
                subj: action.payload.subject,
                course: action.payload.category,
                creator: action.payload.createdBy,
                number: action.payload.totalCards};
        case(FETCH_CARD):
            return{...state, single: action.payload.overview.cards}
    }
    return state;
}