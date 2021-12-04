import React from "react";
import SongControls from "../SongControls/component";
import VolumeControls from "../VolumeControls";

import "./Footer.css";

const Footer = () => (
    <div className="footer">
        {/* <i className="fa fa-angle-up" aria-hidden="true"/> */}
        <SongControls />
        <VolumeControls />
    </div>
);

export default Footer;