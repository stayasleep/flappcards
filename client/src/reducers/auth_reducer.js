import {
    AUTH_USER,
    AUTH_ERROR,
    AUTH_REC_ERROR,
    RECOVER_PW,
    UNAUTH_USER,
    AUTH_SESSION_EXP,
    AUTH_SESSION_RESET,
} from '../actions/types';

const default_state = {authenticated: false, authError: null, authRecError: null, authorized: false, recoverPW: false, sessionExp: false};

export default function (state = default_state, action) {
    switch (action.type){
        case AUTH_USER:
            return {... state, authenticated: true, authError: null, authRecError: null, authorized: action.payload.success, id: action.payload.id};
        case AUTH_ERROR:
            return {... state, authError: action.payload, authorized: false};
        case AUTH_REC_ERROR:
            return {...state, authRecError: action.payload, recoverPW: null};
        case AUTH_SESSION_EXP:
            return {...state, sessionExp: true, authenticated: false, authError: null, authRecError: null, authorized: false, recoverPW: false};
        case AUTH_SESSION_RESET:
            return {...state, sessionExp: false};
        case RECOVER_PW:
            return {...state, recoverPW: action.payload, authRecError: null};

        case UNAUTH_USER:
            return default_state;
    }
    return state;
}