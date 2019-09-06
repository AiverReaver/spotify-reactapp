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
                        selectedPlaylist={this.state.selectedPlaylist}
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
