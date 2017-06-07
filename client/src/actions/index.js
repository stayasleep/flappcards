import axios from 'axios';
import {FETCH_MY_STACK_OVERVIEW, FETCH_MY_COMMUNITY_STACKS, FETCH_STACK_OVERVIEW, FETCH_STACKS, FETCH_CARD, FETCH_USER_META, AUTH_ERROR, AUTH_USER, UNAUTH_USER, DELETE_STACK, DELETE_CARD, EDIT_CARD, SEARCH_STACKS} from './types';
import {FETCH_MY_RECENT_STACKS, COPY_STACK} from './types';
import {CREATE_STACK} from './types';

import {browserHistory} from 'react-router';

const BASE_URL = 'http://localhost:1337/api'; // Uncomment for local testing
// const BASE_URL = '/api'; // Uncomment for live version

export function userLogin(values) {

    return function (dispatch) {
        axios.post(`${BASE_URL}/login`, values).then((response) => {
            // I set response.data to true for the test
            // response.data.success is set to send true if successful
            if (response.data.success) {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
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
    let token = localStorage.getItem('token');
    return function (dispatch) {
        axios.post(`${BASE_URL}/profile`, {'token':token}).then((response) => {
            dispatch({type: FETCH_USER_META, payload: response.data});
        }).catch(err => {
            dispatch({
                type: null,
                error: err.response
            });
        })
    }
}

export function register({name, userName, password, email, birthday}) {
    return function (dispatch) {
        axios.post(`${BASE_URL}/register`, {name, userName, password, email, birthday}).then((resp) => {

            // resp.data.success = true, register the user
            if (resp.data.success) {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', resp.data.token);
                browserHistory.push('/home')
            }

            // added a boolean for userNameTaken
            // Will dispatch an auth error to trigger that the username is taken
            // dispatch a type of AUTH_ERROR, and make the error = to the string of "username"
            if (resp.data.userNameTaken) {
                dispatch({
                    type: AUTH_ERROR,
                    error: "userName"
                });
            }

            // resp.data.success = false => the username was taken
            // Push the user back to the home page
            // if false -> !(false) -> true
            if (!resp.data.success) {
                browserHistory.push('/');

            }

        }).catch(err => {
            dispatch({
                type: AUTH_ERROR,
                error: err.response.data.error
            });
        })
    }
}

export function logout() {
    localStorage.removeItem('token');

    return{
        type: UNAUTH_USER
    }
}


// Accessed by clicking on the 'My Shelf' link of the app drawer
// stack_reducer.js
export function getMyStackOverview() {
    // The queries revolve around knowing the userID, so we'll pass it into the axios call
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/myShelf/`,{'token':token}).then((response) => {
            dispatch({type: FETCH_MY_STACK_OVERVIEW, payload: response.data});
        }).catch(err => {
            dispatch({
                type: FETCH_MY_STACK_OVERVIEW,
                error: err.response
            });
        })
    }
}
// Triggered after hitting view button on list
// Meant to return the cards available after clicking view
export function getStackOverview(stackID) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/stackOverview/${stackID}`,{'token':token, "stackID": stackID}).then((response) => {
            dispatch({type: FETCH_STACK_OVERVIEW, payload: response.data});
        }).catch(err => {
            dispatch({
                type: FETCH_STACK_OVERVIEW,
                error: err.response
            });
        })
    }
}


/**
 * @name - getMyRecentStacksOverview
 * @returns {Function}
 * @description - Loads the recent stacks for the home page
 */
export function getMyRecentStacksOverview() {
    return function(dispatch) {
        let token = localStorage.getItem('token'); // Format the token as an object for the axios post request
        axios.post(`${BASE_URL}/home`,{'token':token}).then((response) => {
            dispatch({type: FETCH_MY_RECENT_STACKS, payload: response.data});
        }).catch(err => {
            dispatch({
                type: FETCH_MY_RECENT_STACKS,
                error: err.response
            });
        })
    }
}

/**
 * @name - deleteStack
 * @param stackID {int}
 * @returns {Function}
 * @description - Fired from myShelf
 */
export function deleteStack(stackID) {
    return function(dispatch) {
        let token = localStorage.getItem('token');
        axios.delete(`${BASE_URL}/myShelf/${stackID}`,{"token": token, "stackID": stackID}).then((response) => {
            dispatch({type: DELETE_STACK, payload: response.data});
        }).catch(err => {
            dispatch({
                type: DELETE_STACK,
                error: err.response
            });
        })
    }
}
/**
 * @name - deleteCard
 * @param cardID {int}
 * @returns {Function}
 */
export function deleteCard(cardID) {
    return function(dispatch) {
        let token = localStorage.getItem('token');
        axios.delete(`${BASE_URL}/stackOverview/${cardID}`, {token: token, cardID: cardID}).then((response) => {
            dispatch({type: DELETE_CARD, payload: response.data});
        }).catch(err => {
            dispatch({
                type: DELETE_CARD,
                error: err.response
            });
        })
    }
}

/**
 * @name - cardEditor
 * @param cardObject -> contains question, answer, and card ID
 * @returns {Function}
 */
export function cardEditor(cardObject) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        let {cardID, question, answer} = cardObject; // cardObject.card_id, cardObject.question, cardObject.answer
        axios.put(`${BASE_URL}/stackOverview/${cardID}`, {'token': token, 'cardQuestion': question, 'cardAnswer':answer} ).then((response) => {
            dispatch({type: EDIT_CARD, payload: response.data});
        }).catch(err => {
            dispatch({
                type: EDIT_CARD,
                error: err.response.data.error
            });
        })
    }
}
/**
 * @name - getCommunityStacksOverview
 * @purpose - Sends request to database to return all card stacks that do not belong to the logged in user.
 * @returns {Function}
 */
export function getCommunityStacksOverview() {
    return function(dispatch) {
        let token = localStorage.getItem('token'); // Format the token as an object for the axios post request
        axios.post(`${BASE_URL}/community`,{'token':token}).then((response) => {
            dispatch({type: FETCH_MY_COMMUNITY_STACKS, payload: response.data});
        }).catch(err => {
            dispatch({
                type: FETCH_MY_COMMUNITY_STACKS,
                error: err.response
            });
        })
    }
}


/**
 * @name - createStack
 * @param stackObject -> contains subject, category, questions, and answers
 * @returns {Function}
 */
export function createStack(stackObject) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/createCards`, {'token': token, "stackObject": stackObject}).then((response) => {
            let stackID = response.data.stackID;
            dispatch({type: CREATE_STACK, payload: response.data});
            browserHistory.push(`stackOverview/${stackID}`);
        }).catch(err => {
            dispatch({
                type: CREATE_STACK,
                error: err.response
            });
        })
    }
}
/**
 * @name - searchStacks
 * @param search  {object | string}
 * @returns {Function}
 */
export function searchStacks(search) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/search`,{'token':token,'query': search}).then((response) => {
            dispatch({type: SEARCH_STACKS, payload: response.data});
        }).catch(err => {
            dispatch({
                type: SEARCH_STACKS,

                error: err.response
            });
        })
    }
}

/**
 * @name - addSingleCard
 * @param cardObject {object}
 * @returns {Function}
 * @description - Used for adding a single card to a stack
 */
export function addSingleCard(cardObject) {
    return function (dispatch) {
        // cardObject contains question and answer
        let stackID = cardObject.stack_id; // So the database knows which card stack to associate this card with
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/stackOverview/${stackID}`, {"token": token, "cardObject": cardObject}).then((response) => {
            dispatch({type: CREATE_STACK, payload: response.data});
        }).catch(err => {
            dispatch({
                type: CREATE_STACK,
                error: err.response
            });
        })
    }
}
/**
 * @name - stackCopy
 * @param stackCopy {object}
 * @returns {Function}
 * @description - Used for copying a stack not owned by a user
 */
export function stackCopy(stackCopy) {
    return function (dispatch){
        let stackID = stackCopy.stack_id;
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/copy/${stackID}`, {"token": token, "stack": stackCopy}).then((response) => {
            let newStackID = response.data.stackID;
            dispatch({type: COPY_STACK, payload: newStackID});
            browserHistory.push(`/myShelf`);
            browserHistory.push(`/stackOverview/${newStackID}`);
        }).catch(err => {
            dispatch({
                type: COPY_STACK,
                error: err.response
            });
        })
    }
}
// JSON is the default expected response type for axios calls
