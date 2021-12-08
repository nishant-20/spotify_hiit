import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SongControls.css";

class SongControls extends Component {

    state = {
        timeElapsed: this.props.timeElapsed
    };

    componentWillReceiveProps(nextProps) {
        // Stop the interval function when we pause the song
        if(nextProps.songPaused && nextProps.timeElapsed !== 0) {
            clearInterval(this.state.intervalId);
        }

        // calculateTime function will initialise a function(setInteval) which will be triggered every 1000ms
        // Start the interval function
        if(nextProps.songPlaying && nextProps.timeElapsed === 0) {
            clearInterval(this.state.intervalId);
            this.calculateTime();
        }

        // Resume the interval function
        if(this.props.songPaused && !nextProps.songPaused && nextProps.timeElapsed !== 0) {
            // console.log(this.state.timeElapsed);
            clearInterval(this.state.intervalId);
            this.calculateTime();
        }


        this.setState({
            timeElapsed: nextProps.timeElapsed
        });
    }

    calculateTime() {
        const intervalId = setInterval(() => {
            if(this.state.timeElapsed === 30) {
                clearInterval(this.state.intervalId);
                // Instead of stopping the song after 30 seconds, would like the next song to play
                // this.props.stopSong();
                this.nextSong();
            } else if(!this.state.songPaused) {
                this.props.increaseSongTime(this.state.timeElapsed + 1);
            }
        }, 1000);

        this.setState({
            intervalId: intervalId
        });
    }

    getCurrentIndex = () => {
        const { queueSongs, songDetails } = this.props;

        const currIndex = queueSongs.map((song, i) => {
            if(song.track.id === songDetails.id) {
                return i;
            } else {
                return undefined;
            }
        }).filter(item => {
            return item !== undefined;
        })[0];

        return currIndex;
    }

    nextSong = () => {
        const { queueSongs, audioControl } = this.props;
        const currIndex = this.getCurrentIndex();
        currIndex === queueSongs.length - 1 ? audioControl(queueSongs[0]) : audioControl(queueSongs[currIndex+1]);
    }

    prevSong = () => {
        const { queueSongs, audioControl } = this.props;
        const currIndex = this.getCurrentIndex();
        currIndex === 0 ? audioControl(queueSongs[queueSongs.length - 1]) : audioControl(queueSongs[currIndex-1]);
    }

    render() {
        const showPlay = this.props.songPaused ? "fa fa-play-circle-o play-btn" : "fa fa-pause-circle-o pause-btn";

        return (
            <div className="song-player-container">

                <div className="song-details">
                    <p className="song-name">{this.props.songName}</p>
                    <p className="artist-name">{this.props.artistName}</p>
                </div>

                <div className="song-controls">
                    <div className="reverse-song">
                        <i
                            onClick={this.prevSong}
                            className="fa fa-step-backward reverse" aria-hidden="true" />
                    </div>
                    <div className="play-btn">
                        <i
                            onClick={!this.props.songPaused ? this.props.pauseSong : this.props.resumeSong}
                            className={showPlay} aria-hidden="true" />
                    </div>
                    <div className="next-song">
                        <i
                            onClick={this.nextSong}
                            className="fa fa-step-forward forward" aria-hidden="true" />
                    </div>
                </div>

                <div className="song-progress-container">
                    <p className="timer-start">{this.state.timeElapsed < 10 ? "0:0" + this.state.timeElapsed : "0:" + this.state.timeElapsed}</p>
                    <div className="song-progress">
                        <div style={{width: this.state.timeElapsed*16.5}} className="song-expired"></div>
                    </div>
                    <p className="timer-end">{this.state.timeElapsed < 21 ? "0:" + String(30-this.state.timeElapsed) : "0:0" + String(30-this.state.timeElapsed)}</p>
                </div>
            </div>
        );
    }
}

SongControls.propTypes = {
    songs: PropTypes.array,
    queueSongs: PropTypes.array,
    songName: PropTypes.string,
    artistName: PropTypes.string,
    songPlaying: PropTypes.bool,
    songPaused: PropTypes.bool,
    timeElapsed: PropTypes.number,
    increaseSongTime: PropTypes.func,
    stopSong: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    audioControl: PropTypes.func,
}

export default SongControls;