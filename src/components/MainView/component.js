import React from "react";
import PropTypes from "prop-types";
import BrowseView from "../BrowseView";
import ArtistList from "../ArtistList";
import QueueView from "../QueueView";
import SongList from "../SongList";
import "./MainView.css";

const MainView = ({headerTitle, resumeSong, pauseSong, audioControl}) => {
    return (
        <React.Fragment>
            {
                headerTitle === "Browse" ? (
                    <BrowseView />
                ) : headerTitle === "Artists" ? (
                    <ArtistList />
                ) : headerTitle === "Queue" ? (
                    <QueueView
                        resumeSong = {resumeSong}
                        pauseSong = {pauseSong}
                        audioControl = {audioControl} />
                ) :(
                    <SongList
                        resumeSong = {resumeSong}
                        pauseSong = {pauseSong}
                        audioControl = {audioControl} />
                )
            }
        </React.Fragment>
    )
}

MainView.propTypes = {
    headerTitle: PropTypes.string,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    audioControl: PropTypes.func,
};

export default MainView;