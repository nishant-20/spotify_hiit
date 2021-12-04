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

    render() {
        return (
            <div className="volume-container">
                <i className="fa fa-volume-up" aria-hidden="true"></i>
                <input
                    className="volume"
                    type="range"
                    min={0}
                    max={100}
                    value={this.state.volume}>
                </input>
            </div>
        )
    }
}

VolumeControls.propTypes = {
    volume: PropTypes.number
};

export default VolumeControls;