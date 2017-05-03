import axios from 'axios';
import {FETCH_STACKS, FETCH_CARD, FETCH_USER_META, AUTH_ERROR, AUTH_USER} from './types';

import {browserHistory} from 'react-router';

const BASE_URL = 'http://localhost:8081/test'; // For test purposes, listening on 8081 and listening on port 8081

import stack2 from '../data/stackoverviewCB3';

export function userLogin(values) {

    return function (dispatch) {
        axios.post(`${BASE_URL}/login`, values).then((response) => {
            // I set response.data to true for the test
            if (response.data) {
                dispatch({type: AUTH_USER});
                browserHistory.push('/home')
            }
        }).catch(err => {
            dispatch({
                type: AUTH_ERROR,
                error: err.response
            });
        })
    }
}
export function getStack() {
    return function (dispatch) {
        axios.get(`${BASE_URL}/home`).then((response) => {
            console.log("actions index", response.data);
            dispatch({type: FETCH_STACKS, payload: response.data});
        }).catch(err => {
            dispatch({
                type: null,
                error: err.response
            });
        })
    }
}

export function getCard() {
    const request = stack2;

    return{
        type: FETCH_CARD,
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

export function register({name, userName, password, email, birthday}) {
    const base_url = "http://scottbowlerdev.com/api";
    return function (dispatch) {
        axios.post(`${base_url}/register`, {name, userName, password, email, birthday}).then((resp) => {

            dispatch({type: AUTH_USER});

            localStorage.setItem('token', resp.data.token);

            browserHistory.push('/home')
        }).catch(err => {
            dispatch({
                type: AUTH_ERROR,
                error: err.response.data.error
            });
        })
    }
}
