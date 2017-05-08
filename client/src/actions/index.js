import axios from 'axios';
import {FETCH_MY_STACK_OVERVIEW, FETCH_MY_COMMUNITY_STACKS, FETCH_STACK_OVERVIEW, FETCH_STACKS, FETCH_CARD, FETCH_USER_META, AUTH_ERROR, AUTH_USER, UNAUTH_USER, DELETE_STACK, DELETE_CARD, EDIT_CARD, SEARCH_STACKS} from './types';
import {FETCH_MY_RECENT_STACKS} from './types';
import {CREATE_STACK} from './types';

import {browserHistory} from 'react-router';

const BASE_URL = 'http://localhost:1337/users'; // For test purposes, listening on 8081 and listening on port 8081


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

// Returns the data necessary for viewing the cards within a single stack
export function getStack() {
    return function (dispatch) {
        let stackID = 3; // Need to add this to the button to send the stackID with the request
        axios.post(`${BASE_URL}/stackOverview/${stackID}`).then((response) => {
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

export function logout() {
    localStorage.removeItem('token');

    return{
        type: UNAUTH_USER
    }
}


// Accessed by clicking on the 'My Shelf' link of the app drawer
// stack_reducer.js
export function getMyStackOverview() {
    console.log("getMyStackOverview() called");
    // The queries revolve around knowing the userID, so we'll pass it into the axios call
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/myshelf/`,{'token':token}).then((response) => {
            console.log("getMyStackOverview response", response);
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
// Triggered after hitting view button on list
// Meant to return the cards available after clicking view
export function getStackOverview(stackID) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/stackOverview/${stackID}`,{'token':token, "stackID": stackID}).then((response) => {
            console.log("getStackOverview", response.data);
            dispatch({type: FETCH_STACK_OVERVIEW, payload: response.data});
        }).catch(err => {
            dispatch({
                type: FETCH_STACK_OVERVIEW,
                error: err.response
            });
        })
    }
}


// Loads the recent stacks for when you get to the home page
// Associated reducer is in stack_reducer.js
//TODO check what the getMyRecentStacksOverview query logic requires
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

export function deleteStack() {
    return function(dispatch) {
        axios.delete(`${BASE_URL}/myShelf`).then((response) => {
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
 * @param cardID
 * @returns {Function}
 */
export function deleteCard(cardID) {
    return function(dispatch) {
        let token = localStorage.getItem('token');
        console.log("deleteCardID function", cardID);
        axios.delete(`${BASE_URL}/stack/${cardID}`, {token: 'token'}).then((response) => {
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
        console.log("cardEditor function called");
        let {cardID, question, answer} = cardObject; // cardObject.card_id, cardObject.question, cardObject.answer
        console.log("cardObject in cardEditor", cardObject);
        console.log("question", question);
        console.log("cardID", cardID);
        axios.put(`${BASE_URL}/stack/${cardID}`, {'token': token, 'cardQuestion': question, 'cardAnswer':answer} ).then((response) => {
            console.log("getStackOverview", response.data);
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
    console.log("createStack called; stackObject", stackObject);
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/createCards`, {'token': token, "stackObject": stackObject}).then((response) => {
            dispatch({type: CREATE_STACK, payload: response.data});
        }).catch(err => {
            dispatch({
                type: CREATE_STACK,
                error: err.response
            });
        })
    }
}
export function searchStacks(search) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/search/${search}`,{'token':token}).then((response) => {
            console.log("Search: ", response.data);
            dispatch({type: SEARCH_STACKS, payload: response.data});
        }).catch(err => {
            dispatch({
                type: SEARCH_STACKS,

                error: err.response
            });
        })
    }
}
// JSON is the default expected response type for axios calls