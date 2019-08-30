import axios from 'axios';

let hashParams = {};
let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
}

let expireTime;
const loginUrl =
    'https://accounts.spotify.com/authorize?client_id=<your client id past here>=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';

if (!hashParams.access_token) {
    window.location.href = loginUrl;
}

const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        Authorization: 'Bearer ' + hashParams.access_token
    }
});

spotify.interceptors.request.use(config => {
    expireTime =
        (new Date() - new Date(localStorage.getItem('token_expire'))) / 1000;

    if (expireTime >= hashParams.expires_in) {
        localStorage.setItem('token_expire', new Date());
        window.location.href = loginUrl;
    }

    return config;
});

export default spotify;
