import {AUTH_USER, AUTH_ERROR, AUTH_REC_ERROR, UNAUTH_USER, RESET_PW} from '../actions/types';

const default_state = {authenticated: false, authError: null, authRecError: null, authorized: false};

export default function (state = default_state, action) {
    switch (action.type){
        case AUTH_USER:
            return {... state, authenticated: true, authError: null, authRecError: null, authorized: action.payload};
        case AUTH_ERROR:
            return {... state, authError: action.payload, authorized: false};
        case AUTH_REC_ERROR:
            return {...state, authRecError: action.payload};
        case UNAUTH_USER:
            return default_state;
    }
    return state;
}