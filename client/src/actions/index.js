import axios from 'axios';
import {
    FETCH_MY_STACK_OVERVIEW,
    FETCH_MY_COMMUNITY_STACKS,
    FETCH_FEATURED_STACKS,
    FETCH_FEATURED_ERR,
    FETCH_STACK_OVERVIEW,
    FETCH_STACK_OVERVIEW_TITLES,
    FETCH_CARD,
    FETCH_USER_META,
    AUTH_ERROR,
    AUTH_REC_ERROR,
    AUTH_USER,
    UNAUTH_USER,
    DELETE_STACK,
    DELETE_CARD,
    EDIT_CARD,
    AUTOCOMPLETE_SEARCH_STACKS,
    SEARCH_STACKS,
    VALIDATE_ROUTE,
    RESET_PW,
    RESET_PW_ERROR,
    CLEAR_RESET_PW,
    RESET_SEARCH,
    RECOVER_PW,
    STACK_UNAVAILABLE,
    STACK_UNAVAILABLE_RESET,
    UPDATE_USER_META,
    UPDATE_USER_ERRORS,
    UPDATE_USER_PASS,
    UPDATE_USER_PASS_ERROR,
    UPDATE_USER_PASS_CLEAR,

    INITIATE_GUEST_BROWSING
} from './types';
import {FETCH_MY_RECENT_STACKS, COPY_STACK} from './types';
import {CREATE_STACK} from './types';

import {browserHistory} from 'react-router';

// const BASE_URL = 'http://localhost:1337/api'; // Uncomment for local testing
const BASE_URL = '/api'; // Uncomment for live version

export function userLogin(values) {
    return function (dispatch) {
        axios.post(`${BASE_URL}/login`, values).then((response) => {
            // I set response.data to true for the test
            // response.data.success is set to send true if successful
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('guest',false);
                dispatch({type: AUTH_USER, payload: true}); //added payload true..this can become obj resp from server if works
                browserHistory.push('/home')
            } else {
                console.log('error in auth',response);
                dispatch({
                    type: AUTH_ERROR,
                    payload: "Username/Password Incorrect"
                });

            }
        }).catch(err => {
            console.log('log err',err);
            dispatch({
                type: AUTH_ERROR,
                error: err.response
            });
        })
    }
}
/**
 * @name resetAuthError
 * @description resets authError state and clears any displayed messages
 * @returns { Function }
 * */
export function resetAuthError(){
    return function(dispatch){
        dispatch({
            type: AUTH_ERROR,
            payload: null,
        })
    }
}
/**
 * @name initiateGuestBrowsing
 * @description initiates guest browsing by checking to see if token already exists, if it doesnt then user is given one
 * @param {String} location - accepts a location so the user can continue [[may not actually need]]
 * */
export function initiateGuestBrowsing(location) {
    return function(dispatch) {
        console.log('about to initiate');
        // hit some back end endpoint for generating guest tokens
        axios.post(`${BASE_URL}/guest`, {'guestToken':true}).then((response) => {
            console.log('axios guest',response);
            localStorage.setItem('token',response.data.token); //token is coming from server upon hitting the landing page
            localStorage.setItem('guest',true);
            dispatch({type: AUTH_USER, payload: false}); //added payload false, this can become obj response from server
            browserHistory.push(location); // May not actually need to push them anywhere, but just as a placeholder/rough draft

        }).catch(err =>{
            dispatch({
                type: AUTH_ERROR,
                error: err.response,
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

export function updateUserData(info){
    console.log('axios orofile',info);
    let token = localStorage.getItem("token");
    info = {...info, "token":token};
    console.log('after', info);
    return function (dispatch){
        axios.put(`${BASE_URL}/profile`,{"token": token, "name": info.name, "email": info.email, "birthday": info.birthday}).then((response) => {
            console.log('res update profile', response);
            if(response.data.success) {
                dispatch({
                    type: UPDATE_USER_META,
                    payload: response.data.results,
                })
            }else{
                dispatch({
                    type: UPDATE_USER_ERRORS,
                    payload: response.data.message,
                })
            }
        }).catch( err => {
            //handle errors
        })
    }
}
export function updateUserPassword(password){
    let token = localStorage.getItem("token");
    return function (dispatch){
        axios.post(`${BASE_URL}/profile/change-password`,{"token": token, pass: password.password, confirm: password.passwordConfirm}).then((response) => {
            console.log('return change pw', response);
            if(response.data.success === false){
                console.log('false pw',response);
                dispatch({
                    type: UPDATE_USER_PASS_ERROR,
                    payload: response.data.message,
                })
            }else {
                dispatch({
                    type: UPDATE_USER_PASS,
                    payload: true,
                })
            }
        }).catch ( err => {
            console.log('err',err);
            dispatch({
                type: UPDATE_USER_PASS_ERROR,
                payload: false,
            });
            //handle errors
        })
    }
}
export function clearUserPasswordNotice(){
    return function (dispatch){
        dispatch({
            type: UPDATE_USER_PASS_CLEAR,
            payload: false,
        })
    }
}

export function register({name, userName, password, email, birthday}) {
    return function (dispatch) {
        axios.post(`${BASE_URL}/register`, {name, userName, password, email, birthday}).then((resp) => {

            // resp.data.success = true, register the user
            if (resp.data.success) {
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('guest',false);
                dispatch({type: AUTH_USER, payload: true}); //added this for guest testing
                browserHistory.push('/home')
            }

            // added a boolean for userNameTaken
            // Will dispatch an auth error to trigger that the username is taken
            // dispatch a type of AUTH_ERROR, and make the error = to the string of "username"
            if (resp.data.userNameTaken) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: "userName"
                });
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
    localStorage.removeItem('guest');

    return{
        type: UNAUTH_USER
    }
}


// Accessed by clicking on the 'My Shelf' link of the app drawer
export function getMyStackOverview() {
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
    console.log('getStackOV before axios');
    return function (dispatch) {
        let token = localStorage.getItem('token');
        // ternary for response.data.length addresses "infinite load times" for empty stacks
        axios.get(`${BASE_URL}/stackOverview/${stackID}`,{headers:{"x-access-token":token}}).then((response) => {
            console.log('inside the dispatch', response);
            // (response.data.length === 0) ? (browserHistory.push('/myShelf/')) : dispatch({type: FETCH_STACK_OVERVIEW, payload: response.data});
            if(response.data.unavailable){
                //stack does not exist
                dispatch({type: STACK_UNAVAILABLE, payload: true});
            }else{
                dispatch({type: FETCH_STACK_OVERVIEW, payload: response.data});
            }

        }).catch(err => {
            console.log('stack OV DNW',err);
            dispatch({
                type: FETCH_STACK_OVERVIEW,
                error: err.response
            });
        })
    }
}
export function getStackAvailable(){
    return function (dispatch){
        dispatch({
            type: STACK_UNAVAILABLE_RESET,
            payload: false,
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
            console.log('new user home axios call',response);
            dispatch({type: FETCH_MY_RECENT_STACKS, payload: response.data});
        }).catch(err => {
            console.log('catch for home axios',err);
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
        axios.delete(`${BASE_URL}/myShelf/${stackID}`,{headers: {"x-access-token": token, "stackID": stackID}}).then((response) => {
            axios.post(`${BASE_URL}/myShelf/`,{'token':token}).then((response) => {
                dispatch({type: FETCH_MY_STACK_OVERVIEW, payload: response.data});
            }).catch(err => {
                dispatch({
                    type: FETCH_MY_STACK_OVERVIEW,
                    error: err.response
                });
            });
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
 * @param cardObj {int}
 * @returns {Function}
 */
export function deleteCard(cardObj) {
    return function(dispatch) {
        let token = localStorage.getItem('token');
        axios.delete(`${BASE_URL}/stackOverview/${cardObj.stackID}/${cardObj.cardID}`, {headers: {"x-access-token": token, "stackID":cardObj.stackID, "cardID": cardObj.cardID}}).then((response) => {
            dispatch({type: DELETE_CARD, payload: null});
            if(response.data.redirect){
                //no more cards in the stack
                browserHistory.push('/myShelf');
            }else{
                axios.get(`${BASE_URL}/stackOverview/${cardObj.stackID}`,{headers:{"x-access-token":token}}).then((response) => {
                    dispatch({type: FETCH_STACK_OVERVIEW, payload: response.data});
                }).catch(err => {
                    dispatch({
                        type: FETCH_STACK_OVERVIEW,
                        error: err.response
                    });
                })
            }
        }).catch(err => {
            dispatch({
                type: DELETE_CARD,
                error: err.response
            });
        });

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
        let {stackID, cardID, editQ, editA} = cardObject; // cardObject.stack_id, cardObject.card_id, cardObject.question, cardObject.answer
        axios.put(`${BASE_URL}/stackOverview/${cardID}`, {'token': token, 'cardQuestion': editQ, 'cardAnswer': editA} ).then((response) => {
            dispatch({type: EDIT_CARD, payload: response.data});
            axios.get(`${BASE_URL}/stackOverview/${stackID}`,{headers:{"x-access-token":token}}).then((response) => {
                dispatch({type: FETCH_STACK_OVERVIEW, payload: response.data});
            }).catch(err => {
                dispatch({
                    type: FETCH_STACK_OVERVIEW,
                    error: err.response
                });
            })
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
        console.log('community axios start');
        let token = localStorage.getItem('token'); // Format the token as an object for the axios post request
        axios.post(`${BASE_URL}/community`,{'token':token}).then((response) => {
            console.log('comm axios resp',response);
            dispatch({type: FETCH_MY_COMMUNITY_STACKS, payload: response.data});
        }).catch(err => {
            console.log('community catch',err.response);
            dispatch({
                type: FETCH_MY_COMMUNITY_STACKS,
                error: err.response
            });
        })
    }
}
export function getFeaturedStackOverview(){
    return function(dispatch){
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/community/featured`,{"token":token}).then((response)=>{
            console.log('featured disp',response);
            dispatch({type:FETCH_FEATURED_STACKS, payload: response.data});
        }).catch(err =>{
            console.log('feat stack err',err);
            dispatch({
                type: FETCH_FEATURED_ERR,
                error:err.response
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
        axios.post(`${BASE_URL}/createCards`, {'token': token, "stackObject": stackObject}).then((response) => {
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
 * @name - unmountSearch
 * @description upon unmount, function resets the search state to begin anew
 * @returns { Function }
 * **/
export function unmountSearch(){
    return function (dispatch){
        dispatch({
            type: RESET_SEARCH,
            payload: null,
        })
    }
}
/**
 * @name - editStackHeaders
 * @description - allows user to change the stack Subject and/or Category in the overview page
 * @param {Object} headerObj - function takes in an object containing both the subject and category values
 * @returns {Function}
 * */
export function editStackHeaders(headerObj){
    return function (dispatch){
        let token = localStorage.getItem("token");
        let stackID = headerObj.stackID;
        axios.put(`${BASE_URL}/stackOverview/${stackID}/headers`,{"token": token, "subject": headerObj.subject, "category":headerObj.category}).then((response) => {
            console.log('header response', response.data.results[0]);
            if(response.data.success){
                dispatch({
                    type: FETCH_STACK_OVERVIEW_TITLES,
                    payload: response.data.results[0],
                })
            }else{
                //handle success false here eventually
                //maybe with a dialog saying task cannot be completed right now
            }

        }).catch( err => {
            //handle error
        })
    }
}


/**
 * @name - addSingleCard
 * @description - Used for adding a single card to a stack
 * @param cardObject {object}
 * @returns {Function}
 */
export function addSingleCard(cardObject) {
    return function (dispatch) {
        // cardObject contains question and answer
        let stackID = cardObject.stack_id; // So the database knows which card stack to associate this card with
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/stackOverview/${stackID}`, {"token": token, "cardObject": cardObject}).then((response) => {
            console.log('added card axios disp',response);
            // dispatch({type: CREATE_STACK, payload: response.data});
            axios.get(`${BASE_URL}/stackOverview/${stackID}`,{headers:{"x-access-token":token}}).then((response) => {
                console.log('inside the dispatch');
                (response.data.length === 0) ? (browserHistory.push('/myShelf')) : dispatch({type: FETCH_STACK_OVERVIEW, payload: response.data});
            }).catch(err => {
                dispatch({
                    type: FETCH_STACK_OVERVIEW,
                    error: err.response
                });
            })
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
 * @description - Used for copying a stack not owned by a user
 * @param stackCopy {object}
 * @returns {Function}
 */
export function stackCopy(stackCopy) {
    return function (dispatch){
        let stackID = stackCopy.stack_id;
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/copy/${stackID}`, {"token": token, "stack": stackCopy}).then((response) => {
            let newStackID = response.data.stackID;
            dispatch({type: COPY_STACK, payload: newStackID});
            browserHistory.push(`/myShelf`); //one day we will figure this one out
            browserHistory.push(`/stackOverview/${newStackID}`); //maybe in the respons we get ID of last insert, and do axios
        }).catch(err => {
            dispatch({
                type: COPY_STACK,
                error: err.response
            });
        })
    }
}

/**
 * @name - populateAutoComplete
 * @description - Populates the autocomplete suggestions from data returned by the server
 * @returns {Function}
 */
export function populateAutoComplete() {
    let token = localStorage.getItem('token');
    return function(dispatch) {
        axios.post(`${BASE_URL}/search/autocomplete`, {"token": token}).then((response) => {
            // response.data = an array of strings
            dispatch({type: AUTOCOMPLETE_SEARCH_STACKS, payload: response.data});
        }).catch(err => {
            dispatch({
                type: AUTOCOMPLETE_SEARCH_STACKS,
                payload: [{"Issue": "There was a problem populating suggestions"}]
            }); // The reducer does not have an error case for auto complete
        })
    }
}
/**
 * @name - isRouteValid
 * @description - Verifies whether or not the reset link is still valid before the page loads and displays view accordingly
 * @param {Object} token
 */
export function isRouteValid(token){
    return function(dispatch){
        console.log('reset isroutevalid axios');
        axios.get(`${BASE_URL}/reset/${token}`,{headers: {"x-access-token": token}}).then((response)=>{
            console.log('route valid resp',response);
            if(response.data.success) {
                dispatch({type: VALIDATE_ROUTE, payload: true});
            }else{
                dispatch({type: VALIDATE_ROUTE,payload: false});
            }
        }).catch(err =>{
            console.log('route error',err);
            dispatch({
                type: VALIDATE_ROUTE,
                error: err.response
            });
        })
    }
}

/**
 * @name - submitResetPw
 * @param {Object} data - takes in user token as the argument
 * @description - Completes the password reset request and redirects to the login
 */
export function submitResetPw(data){
    return function(dispatch){
        let {token} = data;
        axios.post(`${BASE_URL}/reset/${token}`,{"token":token,"resetPw": data.vals.resetPw, "passwordConfirm":data.vals.passwordConfirm}).then((response)=>{
            console.log('axios response',response);
            if(response.data.success){
                dispatch({type: RESET_PW, payload: true});
                //browserHistory.push('/');
            }else{
                //if error with link validation, let them know to try again
                dispatch({
                    type: RESET_PW_ERROR,
                    payload:"This page has expired! Please try the password reset process again."
                });
            }
        }).catch(err =>{
            console.log('errr',err);
            dispatch({
                type: AUTH_ERROR,
                error: err.response.data.error
            })
        })
    }
}
/**
 * @name clearResetPW
 * @description - clears the password reset states upon component unmounting
 * @returns { Function }
 * **/
export function clearResetPW(){
    return function(dispatch){
        dispatch({
            type: CLEAR_RESET_PW,
            payload: false,
        })
    }
}
/**
 * @name recoverPW
 * @description - success: match is found and user will be sent email, error: un/email not found
 * @param {Object} userInfo - user info object to validate the request
 */
export function recoverPw(userInfo){
    return function(dispatch){
        axios.post(`${BASE_URL}/recovery`,{userName: userInfo.userName, userEmail: userInfo.userEmail}).then((response)=>{
            if(response.data.success){
                dispatch({type: RECOVER_PW, payload: true});
                //browserHistory.push('/home');
            }
            if (response.data.noMatchFound){
                dispatch({
                    type: AUTH_REC_ERROR,
                    payload: "Username/Email combination not found!"
                });
            }
        }).catch(err =>{
            dispatch({
                type: AUTH_REC_ERROR,
                error: err.response.data.error
            })
        })
    }
}
/**
 * @name resetAuthRecovery
 * @description resets the auth recovery state and clears the error msg upon dialog closing
 * @returns { Function }
 * */
export function resetAuthRecovery(){
    return function(dispatch){
        dispatch({
            type: AUTH_REC_ERROR,
            payload: null,
        })
    }
}