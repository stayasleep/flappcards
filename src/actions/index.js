import axios from 'axios'; // import axios to perform server calls
import {LOGIN} from './types'; // import login action


export function userLogin() {
    console.log("userLogin() called");
    const request = axios.get('../data/user_data.js');
    return {
        type: LOGIN,
        payload: request
    }
}