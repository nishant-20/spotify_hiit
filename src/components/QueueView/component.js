import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./QueueView.css";

class QueueView extends Component {

    msToMinutesAndSeconds(ms) {
        const mins = Math.floor(ms/60000);
        const secs = ((ms%60000)/1000).toFixed(0);
        return mins + ":" + (secs<10 ? "0" : "") + secs;
    }

    handlePlayClick(song) {
        this.props.audioControl(song);
    }

    renderSongs() {
        return this.props.songs.map((song,i) => {
            const buttonClass = (song.track.id === this.props.songId) && !this.props.songPaused ? "fa-pause-circle-o" : "fa-play-circle-o";

            return (
                <li key={i}
                    className={ (song.track.id === this.props.songId) ? "user-song-item active" : "user-song-item"}>
                    <div
                        onClick={() => {
                            (song.track.id === this.props.songId
                            && !this.props.songPlaying
                            && this.props.songPaused)
                            ? this.props.resumeSong()
                            : (song.track.id === this.props.songId
                                && this.props.songPlaying
                                && !this.props.songPaused)
                                ? this.props.pauseSong()
                                : this.handlePlayClick(song)
                        }}
                        className={ (song.track.id === this.props.songId) ? "play-song active" : "play-song"}>
                        <i className={`fa ${buttonClass} play-btn`} aria-hidden="true"></i>
                    </div>
                    <div className="song-title">
                        <p>{song.track.name}</p>
                    </div>
                    <div className="song-artist">
                        <p>{song.track.artists[0].name}</p>
                    </div>
                    <div className="song-album">
                        <p>{song.track.album.name}</p>
                    </div>
                    <div className="song-added">
                        <p>{moment(song.added_at).format("YYYY-MM-DD")}</p>
                    </div>
                    <div className="song-length">
                        <p>{this.msToMinutesAndSeconds(song.track.duration_ms)}</p>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="song-header-container">
                    <div className="song-title-header">
                        <p>Title</p>
                    </div>
                    <div className="song-artist-header">
                        <p>Artist</p>
                    </div>
                    <div className="song-album-header">
                        <p>Album</p>
                    </div>
                    <div className="song-added-header">
                        <i className="fa fa-calendar-plus-o" aria-hidden="true" />
                    </div>
                    <div className="song-length-header">
                        <p>
                            <i className="fa fa-clock-o" aria-hidden="true" />
                        </p>
                    </div>
                </div>
                {
                    this.props.songs &&
                    this.renderSongs()
                }
            </div>
        );
    }
}

// Add the members passed on directly to the component
QueueView.propTypes = {
    songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    songId: PropTypes.string,
    songPlaying: PropTypes.bool,
    songPaused: PropTypes.bool,
    viewType: PropTypes.string,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    audioControl: PropTypes.func,
}

export default QueueView;