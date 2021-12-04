import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SongControls.css";

class SongControls extends Component {
    render() {
        const showPlay = "fa fa-play-circle-o play-btn";

        return (
            <div className="song-player-container">

                <div className="song-details">
                    <p className="song-name">Can't Help Falling in Love</p>
                    <p className="artist-name">Elv1s Presley</p>
                </div>

                <div className="song-controls">
                    <div className="reverse-song">
                        <i className="fa fa-step-backward reverse" aria-hidden="true" />
                    </div>
                    <div className="play-btn">
                        <i className={"fa play-btn" + showPlay} aria-hidden="true" />
                    </div>
                    <div className="next-song">
                        <i className="fa fa-step-forward forward" aria-hidden="true" />
                    </div>
                </div>

                <div className="song-progress-container">
                    <p className="timer-start">{"0:10"}</p>
                    <div className="song-progress">
                        <div style={{width: 10*16.5}} className="song-expired"></div>
                    </div>
                    <p className="timer-end">{"0:20"}</p>
                </div>
            </div>
        );
    }
}

SongControls.propTypes = {
    songs: PropTypes.array
}

export default SongControls;