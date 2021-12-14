import React from "react";
import PropTypes from "prop-types";
import SideMenu from "../SideMenu";
import UserPlaylists from "../UserPlaylists";
import Header from "../Header";
import MainHeader from "../MainHeader";
import MainView from "../MainView";
import "./SongExplorerView.css";

const SongExplorerView = ({resumeSong, pauseSong, audioControl}) => (
    <div>
        <Header />
        <div className="left-side-section">
            <SideMenu />
            <UserPlaylists />
        </div>
        <div className="main-section">
            <div className="main-section-container">
                <MainHeader
                    resumeSong = {resumeSong}
                    pauseSong = {pauseSong}
                    audioControl = {audioControl} />
                <MainView
                    resumeSong = {resumeSong}
                    pauseSong = {pauseSong}
                    audioControl = {audioControl} />
            </div>
        </div>
    </div>
);

SongExplorerView.propTypes = {
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    audioControl: PropTypes.func,
}

export default SongExplorerView;