import {
    FETCH_USER_META,
    UPDATE_USER_META,
    UPDATE_USER_ERRORS,
    UPDATE_USER_PASS,
    UPDATE_USER_PASS_ERROR,
} from '../actions/types';

const default_state ={
    userName: "",
    email: "",
    birthday: "",
    name: '',
    joinDate: '',
    avatar: ''
};

export default function (state = default_state, action) {
    console.log('profile action',action);
    switch (action.type){
        case(FETCH_USER_META):
            return {
                ...state,
                userName: action.payload[0].username,
                email: action.payload[0].user_email,
                birthday: action.payload[0].user_bday,
                name: action.payload[0].fullname,
                joinDate: action.payload[0].user_join,
                avatar: action.payload[0].avatar
            };
        case UPDATE_USER_META:
            return {...state, name: action.payload[0].fullname, email: action.payload[0].user_email, birthday: action.payload[0].user_bday};
    }
    return state;
}