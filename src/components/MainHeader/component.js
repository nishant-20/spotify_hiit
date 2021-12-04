import React from "react";
import PropTypes from "prop-types";
import "./MainHeader.css";

const MainHeader = ({
        headerTitle,
        viewType,
        playlists,
        artists,
        updateHeaderTitle}) => {

    let currentPlaylist;
    let currentArtist;

    if(viewType === "playlist") {
        currentPlaylist = playlists.filter(playlist => {
            return playlist.name === headerTitle;
        })[0];
    }

    if(viewType === "Artist" && artists.length > 0) {
        currentArtist = artists.filter(artist => {
            return artist.name === headerTitle;
        })[0];
    }

    console.log(currentPlaylist);

    return (
        <div className="section-title">
            {
                viewType === "playlist" && (
                    <div className="playlist-title-container">
                        <div>
                            <img alt="playlist" className="playlist-image" src={currentPlaylist && currentPlaylist.images[0] ? currentPlaylist.images[0].url : null}></img>
                        </div>
                        <div className="playlist-info-container">
                            <p className="playlist-text">PLAYLIST</p>
                            <h3 className="header-title">{headerTitle}</h3>
                            {currentPlaylist && (<p className="created-by">Created By: <span className="lighter-text">{currentPlaylist.owner.display_name}</span> - {currentPlaylist.tracks.total} songs</p>)}
                            <button className="main-pause-play-btn">PLAY</button>
                        </div>
                    </div>
                )
            }

            {
                viewType === "Artist" && currentArtist && (
                    <div className="current-artist-header-container">
                        <div>
                            <img alt="current-artist" className="current-artist-image" src={currentArtist.images[0] ? currentArtist.images[0].url : null}></img>
                        </div>
                        <div className="current-artist-info">
                            <p>Artist from your Library</p>
                            <h3>{currentArtist.name}</h3>
                            <button className="main-pause-play-btn">PLAY</button>
                        </div>
                    </div>
                )
            }

            {
                (
                    headerTitle === "Songs" ||
                    headerTitle === "Recently Played" ||
                    headerTitle === "Artists"
                ) && (
                    <div>
                        <h3 className="header-title">{headerTitle}</h3>
                        { headerTitle !== "Artists" && (
                            <button className="main-pause-play-btn">PLAY</button>
                        )}
                    </div>
                )
            }

            {
                headerTitle === "Browse" && (
                    <div>
                        <h3 className="header-title">{headerTitle}</h3>
                    </div>
                )
            }

            {
                viewType === "search" && (
                    <div>
                        <h3 className="header-title">{headerTitle}</h3>
                        { headerTitle !== "Artists" && (
                            <button className="main-pause-play-btn">PLAY</button>
                        )}
                    </div>
                )
            }
        </div>
    );
};

MainHeader.propTypes = {
    headerTitle: PropTypes.string,
    viewType: PropTypes.string,
    playlists: PropTypes.array,
    artists: PropTypes.array,
    updateHeaderTitle: PropTypes.func
}

export default MainHeader;