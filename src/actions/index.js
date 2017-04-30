import axios from 'axios';
import {LOGIN, FETCH_STACKS, FETCH_STACK_META} from './types';
export function userLogin() {
    console.log("userLogin() called");
    const request = axios.get('../data/user_data.js');
    return {
        type: LOGIN,
        payload: request
    }
}
export function getStack() {
    const request = axios.get(`../data/dummydata.js`);

    return{
        type: FETCH_STACKS,
        payload: request
    }
}

export function getStackMeta() {
    const request = axios.get(`../data/dummydata.js`);

    return{
        type: FETCH_STACK_META,
        payload: request
    }
}