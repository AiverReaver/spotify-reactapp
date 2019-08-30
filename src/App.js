import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import './index.css';
import Spotify from './api';
import Header from './components/Header/component';
import Sidenav from './components/Sidenav/component';
import Playlist from './components/Playlist/component';
import Playbar from './components/Playbar/component';
import {
    fetchPlaylists,
    fetchUser,
    fetchPlaylistTracks,
    fetchCurrentlyPlayingTrack
} from './actions';

class App extends React.Component {
    state = {
        playlists: [],
        selectedPlaylist: null,
        display_name: '',
        currentTrack: null,
        backgroundColor: { r: 0, g: 0, b: 0 }
    };

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        let hashParams = {};
        let e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        if (!hashParams.access_token) {
            window.location.href =
                'https://accounts.spotify.com/authorize?client_id=12b51ca6bc4a4076b9081ef3a7f784ca&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
        } else {
            localStorage.setItem('token', hashParams.access_token);
        }

        this.props.fetchUser();
        this.props.fetchPlaylists();
        this.props.fetchCurrentlyPlayingTrack();
    }

    getCurrentlyPlayingTrack = async () => {
        const { data } = await Spotify.get('/me/player/currently-playing');

        if (data.is_playing) {
            this.setState({ currentTrack: data.item });
        }
    };

    onPlaylistSelected = async selectedPlaylist => {
        await this.props.fetchPlaylistTracks(selectedPlaylist);
        selectedPlaylist.fetchedTracks = this.props.playlistTracks;
        this.setState({
            selectedPlaylist: selectedPlaylist
        });
    };

    setBackgrounColor = color => {
        this.containerRef.current.style.backgroundColor = color.hexa;
    };

    render() {
        return (
            <div>
                <div className="container" ref={this.containerRef}>
                    <Header display_name={this.props.user} />
                    <Sidenav
                        onPlaylistSelected={this.onPlaylistSelected}
                        playlists={this.props.playlists}
                    />
                    <Playlist
                        setBackgrounColor={this.setBackgrounColor}
                        playlist={this.state.selectedPlaylist}
                    />

                    <Playbar track={this.props.currentTrack} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ playlists, user, playlistTracks, currentTrack }) => {
    return { playlists, user, playlistTracks, currentTrack };
};

export default connect(
    mapStateToProps,
    {
        fetchPlaylists,
        fetchUser,
        fetchPlaylistTracks,
        fetchCurrentlyPlayingTrack
    }
)(App);
