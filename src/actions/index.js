import axios from 'axios';
export function getDummyData() {
    const request = axios.get(`../data/dummydata.js`)
}