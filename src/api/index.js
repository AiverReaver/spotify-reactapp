import axios from 'axios';

const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
});

console.log('hello');

export default spotify;
