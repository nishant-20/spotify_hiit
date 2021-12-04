import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./SongList.css";

class SongList extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.token !== ""
            && !nextProps.fetchSongsError
            && nextProps.fetchSongsPending
            && nextProps.viewType === "songs") {
            this.props.fetchSongs(nextProps.token);
        }
    }

    msToMinutesAndSeconds(ms) {
        const mins = Math.floor(ms/60000);
        const secs = ((ms%60000)/1000).toFixed(0);
        return mins + ":" + (secs<10 ? "0" : "") + secs;
    }

    renderSongs() {
        return this.props.songs.map((song,i) => {
            const buttonClass = "fa-play-circle-o";

            return (
                <li key={i}
                    className="user-song-item">
                    <div
                        className="play-song">
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
                    !this.props.fetchPlaylistSongsPending &&
                    this.renderSongs()
                }
            </div>
        );
    }
}

SongList.propTypes = {
    token: PropTypes.string,
    fetchPlaylistSongsPending: PropTypes.bool,
    songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    viewType: PropTypes.string,
    fetchSongs: PropTypes.func,
    fetchSongsError: PropTypes.bool,
    fetchSongsPending: PropTypes.bool
}

export default SongList;