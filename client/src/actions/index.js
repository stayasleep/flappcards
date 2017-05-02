import axios from 'axios';
import {LOGIN, FETCH_STACKS, FETCH_STACK_META, FETCH_USER_META, AUTH_ERROR, AUTH_USER} from './types';
const users = require('../data/user_data');
const BASE_URL = 'http://localhost:8081/';
export function userLogin(values) {
    let usersString = JSON.stringify(values);
    console.log("userLogin function");
    let response = axios.post(`${BASE_URL}`, values);
    console.log("response.data", response.data);
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
export function getUserData() {
    const request = axios.get(`../data/dummydata.js`);

    return{
        type: FETCH_USER_META,
        payload: request
    }
}

export function register({email, password}) {
    const base_url = "http://scottbowlerdev.com/api";
    return function (dispatch) {
        axios.post(`${base_url}/signup`, {email, password}).then((resp) => {

            dispatch({type: AUTH_USER});

            localStorage.setItem('token', resp.data.token);

            browserHistory.push('/feature')
        }).catch(err =>{
            dispatch({
                type: AUTH_ERROR,
                error: err.response.data.error
            });
        })
    }
}