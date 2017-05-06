import {FETCH_USER_META} from '../actions/types';

const default_state ={
    userName: "",
    email: "",
    birthday: ""
};

export default function (state = default_state, action) {
    switch (action.type){
        case(FETCH_USER_META):
            return {
                ...state,
                userName: action.payload.userName,
                email: action.payload.email,
                birthday: action.payload.birthday
            }
    }
    return state;
}