import {VALIDATE_ROUTE} from '../actions/types';

const default_state={isValid:null};

export default function(state = default_state,action){
    switch (action.type){
        case VALIDATE_ROUTE:
            return{...state,isValid: action.payload};
    }
    return state;
}