import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./SongList.css";

class SongList extends Component {
    componentDidMount() {
        if(this.props.songs !== "") {
            return;
        }

        if(this.props.token !== ""
            && !this.props.fetchSongsError
            && this.props.fetchSongsPending
            && this.props.viewType === "songs") {
            this.props.fetchSongs(this.props.token);

            // Fetching available genres and top artists for a user for recommendations
            this.props.fetchAvailableGenres(this.props.token);
            this.props.fetchTopArtists(this.props.token);
        }
    }

    msToMinutesAndSeconds(ms) {
        const mins = Math.floor(ms/60000);
        const secs = ((ms%60000)/1000).toFixed(0);
        return mins + ":" + (secs<10 ? "0" : "") + secs;
    }

    handlePlayClick(song) {
        this.props.audioControl(song);
        this.props.setQueue();
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
                    !this.props.fetchPlaylistSongsPending &&
                    this.renderSongs()
                }
            </div>
        );
    }
}

SongList.propTypes = {
    token: PropTypes.string,
    songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fetchSongsError: PropTypes.bool,
    fetchSongsPending: PropTypes.bool,
    fetchPlaylistSongsPending: PropTypes.bool,
    songPlaying: PropTypes.bool,
    songPaused: PropTypes.bool,
    songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    viewType: PropTypes.string,
    fetchSongs: PropTypes.func,
    fetchAvailableGenres: PropTypes.func,
    fetchTopArtists: PropTypes.func,
    setQueue: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    audioControl: PropTypes.func,
}

export default SongList;