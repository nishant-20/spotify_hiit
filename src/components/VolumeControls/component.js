import React, { Component } from "react";
import PropTypes from "prop-types";
import "./VolumeControls.css";

class VolumeControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: this.props.volume
        };
    }

    updateVolume = (e) => {
        this.setState({
            volume: e.target.value
        });

        // Volume would be a multiple of 10
        this.props.updateVolume(Math.ceil(e.target.value / 10) * 10);
    }

    render() {
        return (
            <div className="volume-container">
                <i className="fa fa-volume-up" aria-hidden="true"></i>
                <input
                    className="volume"
                    type="range"
                    min={0}
                    max={100}
                    value={this.state.volume}
                    onChange={this.updateVolume}>
                </input>
            </div>
        )
    }
}

VolumeControls.propTypes = {
    volume: PropTypes.number,
    updateVolume: PropTypes.func
};

export default VolumeControls;