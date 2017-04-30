import axios from 'axios';
import {LOGIN, FETCH_STACKS, FETCH_STACK_META} from './types';
import {user} from '../data/user_data';
import connection from '../data/config_data';
export function userLogin(values) {
    console.log("values:", values);
    console.log("connection", connection);
    let result = connection.query('SELECT * FROM `users`', (error,results,fields)=> {
        if (error) {throw error};
        console.log("Query results" , results[0]);
    });
    console.log("result", result);
    return result;


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