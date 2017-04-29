import axios from 'axios';
import {FETCH_STACKS, FETCH_STACK_META} from './types';

export function getStack() {
    const request = axios.get(`../data/dummydata.js`);

    return{
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