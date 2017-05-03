import {FETCH_STACKS} from '../actions/types'

const default_state ={
    all: [],
    subj: "",
    course: "",
    creator: "",
    number: ""
};

export default function (state = default_state, action) {
    switch (action.type){
        case(FETCH_STACKS):
            return{...state, all: action.payload.overview.cards, subj: action.payload.overview.subject, course: action.payload.overview.category, creator: action.payload.overview.createdBy, number: action.payload.overview.totalCards};
    }
    return state;
}