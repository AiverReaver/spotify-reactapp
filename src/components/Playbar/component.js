import React from 'react';
import { connect } from 'react-redux';

import './Playbar.css';
import {
    startOrResumePlayer,
    pausePlayer,
    playNextPlayer,
    playPreviousPlayer
} from '../../actions';

class Playbar extends React.Component {
    startOrResumePlayer = () => {
        this.props.startOrResumePlayer();
    };

    pausePlayer = () => {
        this.props.pausePlayer();
    };

    render() {
        const { track } = this.props;

        let songdetails = '';
        let playPauseButton;

        if (track.artists !== undefined) {
            const artists = track.artists.map(artist => artist.name).join(', ');
            playPauseButton = (
                <button onClick={this.pausePlayer} className="btn btn-ghost">
                    <i className="material-icons">pause</i>
                </button>
            );
            songdetails = (
                <div className="song-detail">
                    <img src={track.album.images[0].url} alt="" />
                    <div className="song-name-artist">
                        <p className="song-name">{track.name}</p>
                        <p className="artist-name"> {artists}</p>
                    </div>
                </div>
            );
        } else {
            playPauseButton = (
                <button
                    onClick={this.startOrResumePlayer}
                    className="btn btn-ghost"
                >
                    <i className="material-icons">play_arrow</i>
                </button>
            );
        }

        return (
            <section className="playbar-container">
                {songdetails}
                <div className="song-controls">
                    <div
                        className="reverse-song"
                        onClick={this.props.playPreviousPlayer}
                    >
                        <i className="material-icons">skip_previous</i>
                    </div>
                    <div className="play-btn">{playPauseButton}</div>
                    <div
                        className="next-song"
                        onClick={this.props.playNextPlayer}
                    >
                        <i className="material-icons">skip_next</i>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(
    null,
    { startOrResumePlayer, pausePlayer, playNextPlayer, playPreviousPlayer }
)(Playbar);
