import React from "react";
import BrowseView from "../BrowseView";
import SongList from "../SongList";
import ArtistList from "../ArtistList";
import PropTypes from "prop-types";
import "./MainView.css";

const MainView = ({headerTitle}) => {
    return (
        <React.Fragment>
            {
                headerTitle === "Browse" ? (
                    <BrowseView />
                ) : headerTitle === "Artists" ? (
                    <ArtistList />
                ) : (
                    <SongList />
                )
            }
        </React.Fragment>
    )
}

MainView.propTypes = {
    headerTitle: PropTypes.string
}
export default MainView;