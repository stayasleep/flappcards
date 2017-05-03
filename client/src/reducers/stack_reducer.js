import {FETCH_STACKS, FETCH_CARD} from '../actions/types'

const default_state ={
    all: [],
    subj: "",
    course: "",
    creator: "",
    number: "",
    single: []
};

export default function (state = default_state, action) {
    switch (action.type){
        case(FETCH_STACKS):
            return{...state, all: action.payload.overview.cards, subj: action.payload.overview.subject, course: action.payload.overview.category, creator: action.payload.overview.createdBy, number: action.payload.overview.totalCards};
        case(FETCH_CARD):
            return{...state, single: action.payload.overview.cards}
    }
    return state;
}