import React from 'react';

import './App.css';
import './index.css';
import Header from './components/Header/component';
import Sidenav from './components/Sidenav/component';
import Playlist from './components/Playlist/component';

import Spotify from './api';

class App extends React.Component {
    state = {
        playlists: [],
        selectedPlaylist: null,
        display_name: '',
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

        this.getCurrentUserPlaylist();
        this.getCurrentUser(hashParams.access_token);
    }

    getCurrentUserPlaylist = async () => {
        const { data } = await Spotify.get('/me/playlists');
        this.setState({ playlists: data.items });
    };

    getPlaylistTracks = async playlist => {
        if (playlist) {
            const { data } = await Spotify.get(
                `/playlists/${playlist.id}/tracks`
            );

            return data;
        }

        return null;
    };

    getCurrentUser = async token => {
        const { data } = await Spotify.get('/me');

        this.setState({ display_name: data.display_name });
    };

    onPlaylistSelected = async selectedPlaylist => {
        const { items } = await this.getPlaylistTracks(selectedPlaylist);
        selectedPlaylist.fetchedTracks = items;
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
                    <Header display_name={this.state.display_name} />
                    <Sidenav
                        onPlaylistSelected={this.onPlaylistSelected}
                        playlists={this.state.playlists}
                    />
                    <Playlist
                        setBackgrounColor={this.setBackgrounColor}
                        playlist={this.state.selectedPlaylist}
                    />
                </div>
            </div>
        );
    }
}

export default App;
