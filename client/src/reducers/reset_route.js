import {
    CLEAR_RESET_PW,
    RESET_PW,
    RESET_PW_ERROR,
    VALIDATE_ROUTE
} from '../actions/types';

const default_state={isValid:null, resetPW: false, resetErr: null};

export default function(state = default_state,action){
    switch (action.type){
        case CLEAR_RESET_PW:
            return {...state, resetPW: action.payload, resetErr: null};
        case RESET_PW:
            return {...state, resetPW: action.payload};
        case RESET_PW_ERROR:
            return {...state, resetErr: action.payload};
        case VALIDATE_ROUTE:
            return{...state,isValid: action.payload};
    }
    return state;
}