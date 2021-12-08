import React from "react";
import PropTypes from "prop-types";
import SongControls from "../SongControls";
import VolumeControls from "../VolumeControls";
import ToggleView from "../ToggleView";
import "./Footer.css";

const Footer = ({stopSong, resumeSong, pauseSong, audioControl}) => (
    <div className="footer">
        <SongControls
            stopSong = {stopSong}
            resumeSong = {resumeSong}
            pauseSong = {pauseSong}
            audioControl = {audioControl} />
        <VolumeControls />
        <ToggleView />
    </div>
);

Footer.propTypes = {
    stopSong: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    audioControl: PropTypes.func,
}

export default Footer;