import spotify from '../api';

export const fetchPlaylists = () => async dispatch => {
    const { data } = await spotify.get('/me/playlists');
    dispatch({
        type: 'FETCH_PLAYLISTS',
        payload: data.items
    });
};

export const fetchPlaylistTracks = playlist => async dispatch => {
    const { data } = await spotify.get(`/playlists/${playlist.id}/tracks`);

    dispatch({
        type: 'FETCH_PLAYLIST_TRACKS',
        payload: data.items
    });
};

export const fetchUser = () => async dispatch => {
    const { data } = await spotify.get('/me');

    dispatch({
        type: 'FETCH_USER',
        payload: data.display_name
    });
};

export const fetchCurrentlyPlayingTrack = () => async dispatch => {
    const { data } = await spotify.get('/me/player/currently-playing');

    if (data.is_playing) {
        dispatch({
            type: 'FETCH_CURRENT_TRACK',
            payload: data.item
        });
    } else {
        dispatch({
            type: 'NO_TRACK'
        });
    }
};

export const startOrResumePlayer = () => async dispatch => {
    await spotify.put('/me/player/play');
};

export const pausePlayer = () => async dispatch => {
    await spotify.put('/me/player/pause');
};

export const playNextPlayer = () => async dispatch => {
    await spotify.post('/me/player/next');
};

export const playPreviousPlayer = () => async dispatch => {
    await spotify.post('/me/player/previous');
};
