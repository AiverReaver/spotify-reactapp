import React from 'react';
import FastAverageColor from 'fast-average-color';

import './Playlist.css';

class Playlist extends React.Component {
    setbackgroundColor = event => {
        const { setBackgrounColor } = this.props;

        const fac = new FastAverageColor();
        setBackgrounColor(fac.getColor(event.target));
    };

    render() {
        const { playlist } = this.props;
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
                <li className="user-song-item" key={track.id}>
                    <div className="play-song">
                        <a href="#a" className="btn btn-ghost">
                            <i className="material-icons">play_arrow</i>
                        </a>
                    </div>
                    <p className="add-song">
                        <i className="material-icons">favorite_border</i>
                    </p>
                    <div className="song-title">
                        <p>{track.name}</p>
                    </div>
                    <div className="song-artist">
                        <p>{artists}</p>
                    </div>
                    <div className="song-album">
                        <p>{track.album.name}</p>
                    </div>
                    <div className="song-added">
                        <p>2019-07-18</p>
                    </div>
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
                                onLoad={this.setbackgroundColor}
                                crossOrigin="anonymous"
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
                                &nbsp;{playlist.tracks.total}&nbsp; songs, 1 hr
                                30 mins
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

                <div className="row user-song-playlist-row">
                    <div className="song-header-container">
                        <div className="song-title-header">
                            <p>TITLE</p>
                        </div>
                        <div className="song-artist-header">
                            <p>ARTIST</p>
                        </div>
                        <div className="song-album-header">
                            <p>ALBUM</p>
                        </div>
                        <div className="song-added-header">
                            <i className="material-icons"> calendar_today </i>
                        </div>
                    </div>
                    {tracks}
                </div>
            </section>
        );
    }
}

export default Playlist;
