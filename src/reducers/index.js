import { combineReducers } from 'redux';

import playlistsReducer from './playlistsReducer';
import userReducer from './userReducer';
import tracksReducer from './tracksReducer';
import currentTrackReducer from './currentTrackReducer';

export default combineReducers({
    playlists: playlistsReducer,
    user: userReducer,
    playlistTracks: tracksReducer,
    currentTrack: currentTrackReducer
});
