import {
    FETCH_USER_META,
    UPDATE_USER_META,
    UPDATE_USER_ERRORS,
    UPDATE_USER_PASS,
    UPDATE_USER_PASS_ERROR,
    UPDATE_USER_PASS_CLEAR,

} from '../actions/types';

const default_state ={
    username: "",
    email: "",
    birthday: "",
    name: '',
    joinDate: '',
    avatar: '',
    update: false,
    errorText: {error: false}
};

export default function (state = default_state, action) {
    switch (action.type){
        case(FETCH_USER_META):
            return {
                ...state,
                username: action.payload[0].username,
                email: action.payload[0].user_email,
                birthday: action.payload[0].user_bday,
                name: action.payload[0].fullname,
                joinDate: action.payload[0].user_join,
                avatar: action.payload[0].avatar
            };
        case UPDATE_USER_META:
            return {...state, name: action.payload[0].fullname, email: action.payload[0].user_email, birthday: action.payload[0].user_bday};
        case UPDATE_USER_PASS:
            return {...state, update: action.payload};
        case UPDATE_USER_PASS_CLEAR:
            return {...state, update: action.payload, errorText:{error: false}};
        case UPDATE_USER_PASS_ERROR:
            return {...state, errorText: {message: action.payload, error: true}};
    }
    return state;
}