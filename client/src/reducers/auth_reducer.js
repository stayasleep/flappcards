import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, RESET_PW} from '../actions/types';

const default_state = {authenticated: false, authError: null, authorized: false};

export default function (state = default_state, action) {
    switch (action.type){
        case AUTH_USER:
            console.log('action type',action);
            return {... state, authenticated: true, authError: null, authorized: action.payload};
        case AUTH_ERROR:
            console.log('log err',action.payload);
            return {... state, authenticated: false, authError: action.payload, authorized: false};
        case UNAUTH_USER:
            return default_state;
    }
    return state;
}