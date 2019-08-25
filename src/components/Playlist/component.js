import React from 'react';

import './Playlist.css';

const Playlist = ({ playlist, setBackgrounColor }) => {
    if (!playlist) {
        return (
            <section className="main">
                <h2>Please select playlist</h2>
            </section>
        );
    }

    const tracks = playlist.fetchedTracks.map(({ track }) => {
        const artists = track.artists.map(artist => artist.name).join(', ');

        return (
            <li key={track.id}>
                {track.name} {artists} {track.album.name}
            </li>
        );
    });

    return (
        <section className="main">
            <div className="row playlist-row">
                <div className="col">
                    <div className="playlist-image">
                        <img
                            id="playlist-image"
                            src={playlist.images[0].url}
                            alt={playlist.name}
                        />
                    </div>
                </div>
                <div className="col span-2-of-3">
                    <div className="playlist-detail">
                        <h6 className="playlist-heading">PLAYLIST</h6>
                        <h1 className="platlist-name">{playlist.name}</h1>
                        <p className="playlist-detailed">
                            Created by
                            <span> {playlist.owner.display_name} </span> .
                            &nbsp;{playlist.tracks.total}&nbsp; songs, 1 hr 30
                            mins
                        </p>
                    </div>
                    <div className="playlist-container">
                        <div className="playlist-control">
                            <a href="#a" className="btn btn-full">
                                PLAY
                            </a>
                            <a href="#a" className="btn btn-ghost">
                                <i className="material-icons">favorite</i>
                            </a>
                            <a href="#a" className="btn btn-ghost">
                                <i className="material-icons">more_horiz</i>
                            </a>
                        </div>
                        <div className="playlist-follower">
                            <h6>FOLLOWERS</h6>
                            <h6>59,166</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <ul>{tracks}</ul>
            </div>
        </section>
    );
};

export default Playlist;
