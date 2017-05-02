import axios from 'axios';
import {LOGIN, FETCH_STACKS, FETCH_STACK_META} from './types';
const users = require('../data/user_data');
const BASE_URL = 'http://localhost:8081/';
export function userLogin(values) {
    let usersString = JSON.stringify(values);
    console.log("userLogin function");
    let response = axios.post(`${BASE_URL}`, values);
    console.log("response.data", );
    return {
        type: LOGIN,
        payload: response.data
    }
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