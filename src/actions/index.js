import axios from 'axios';
import {LOGIN, FETCH_STACKS, FETCH_STACK_META} from './types';
const users = require('../data/user_data');


export function userLogin(values) {
    console.log(users);
    console.log("values:", values);


}
export function getStack() {
    const request = axios.get(`../data/dummydata.js`);

    return {
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