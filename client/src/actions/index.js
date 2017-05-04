import axios from 'axios';
import {FETCH_MY_STACK_OVERVIEW, FETCH_STACK_OVERVIEW, FETCH_STACKS, FETCH_CARD, FETCH_USER_META, AUTH_ERROR, AUTH_USER} from './types';
import {FETCH_MY_RECENT_STACKS} from './types';

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
        axios.post(`${BASE_URL}/stackOverview`).then((response) => {
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
    return function (dispatch) {
        axios.post(`${BASE_URL}/stackOverview`).then((response) => {
            dispatch({type: FETCH_CARD, payload: response.data});
        }).catch(err => {
            dispatch({
                type: null,
                error: err.response
            });
        })
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

export function getMyStackOverview() {
    // console.log("getMyStackOverview() called");
    return function (dispatch) {
        axios.post(`${BASE_URL}/myShelf`).then((response) => {
            console.log('myShelf call response:', response);
            dispatch({type: FETCH_MY_STACK_OVERVIEW, payload: response.data});
        }).catch(err => {
            console.log('ERROR:', err);
            dispatch({
                type: FETCH_MY_STACK_OVERVIEW,
                error: err.response
            });
        })
    }
}

export function getStackOverview() {
    return function (dispatch) {
        axios.post(`${BASE_URL}/stackOverview`).then((response) => {
            dispatch({type: FETCH_STACK_OVERVIEW, payload: response});
        }).catch(err => {
            dispatch({
                type: FETCH_STACK_OVERVIEW,
                error: err.response.data.error
            });
        })
    }
}

export function getMyRecentStacksOverview() {
    return function(dispatch) {
        axios.post(`${BASE_URL}/home`).then((response) => {
            console.log("recentStacks", response.data);
            dispatch({type: FETCH_MY_RECENT_STACKS, payload: response.data});
        }).catch(err => {
            dispatch({
                type: FETCH_MY_RECENT_STACKS,
                error: err.response
            });
        })
    }
}

