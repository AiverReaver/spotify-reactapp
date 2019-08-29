import React from 'react';

import './Playbar.css';

const Playbar = ({ track }) => {
    let songdetails = '';

    if (track) {
        const artists = track.artists.map(artist => artist.name).join(', ');
        songdetails = (
            <div className="song-detail">
                <img src={track.album.images[0].url} alt="" />
                <div className="song-name-artist">
                    <p className="song-name">{track.name}</p>
                    <p className="artist-name"> {artists}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="playbar-container">
            {songdetails}
            <div className="song-controls">
                <div className="reverse-song">
                    <i className="material-icons">skip_previous</i>
                </div>
                <div className="play-btn">
                    <a href="#a" className="btn btn-ghost">
                        <i className="material-icons">play_arrow</i>
                    </a>
                </div>
                <div className="next-song">
                    <i className="material-icons">skip_next</i>
                </div>
            </div>
            <div className="song-progress-container">
                <p className="timer-start">0:02</p>
                <div className="song-progress">
                    <div
                        className="song-expired"
                        style={{ width: '33px' }}
                    ></div>
                </div>
                <p className="timer-end">0:28</p>
            </div>
        </section>
    );
};

export default Playbar;
