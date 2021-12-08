import React from "react";
import PropTypes from "prop-types";
import "./MainHeader.css";

// TODO: Handle the condition when user moves to other view while the song is playing and the play/pause button text remains to be pause, the functionality is working fine (change the component to include lifecycle methods)
const MainHeader = ({
        headerTitle,
        viewType,
        playlists,
        artists,
        songs,
        songId,
        queueSongs,
        songPaused,
        songPlaying,
        resumeSong,
        pauseSong,
        audioControl,
        setQueue}) => {

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

    // Function to compare the queue to the song list on the current page
    const compareQueueToSongList = () => {
        if(!queueSongs)
            return false;

        if(queueSongs && songs && queueSongs.length !== songs.length)
            return false;

        let songIdList = queueSongs.map(item => {
            return item.track.id;
        });

        let matchLength = songs.map(item => {
            return item.track.id
        }).filter(id => {
            return songIdList.includes(id);
        }).length;

        return matchLength === queueSongs.length;
    }

    const handlePlayClick = () => {
        // Check if any songs are playing currently, playing the songs for the first time
        if(!compareQueueToSongList() && songs.length>0) {
            audioControl(songs[0]);
            setQueue();
        }

        if(songPaused && compareQueueToSongList()) {
            // console.log("Inside handlePlayClick");
            resumeSong();
        }

        // Pause the song
        if(songPlaying && compareQueueToSongList()) {
            pauseSong();
        }
    }

    const getPlayButtonContent = () => {
        let songIdList = songs.map(item => {
            return item.track.id;
        });

        let buttonClass = "PLAY";

        if(songIdList.includes(songId) && songPlaying) {
            buttonClass = "PAUSE";
        }

        return buttonClass;
    }

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
                            {currentPlaylist && (<p className="created-by">Created By: <span className="lighter-text">{currentPlaylist.owner.display_name}</span> - {songs.length} songs</p>)}
                            <button
                                onClick={handlePlayClick}
                                className="main-pause-play-btn">{getPlayButtonContent()}</button>
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
                            <button
                                onClick={handlePlayClick}
                                className="main-pause-play-btn">{getPlayButtonContent()}</button>
                        </div>
                    </div>
                )
            }

            {
                (
                    viewType === "search" ||
                    viewType === "Recommendations" ||
                    headerTitle === "Songs" ||
                    headerTitle === "Recently Played" ||
                    headerTitle === "Artists"
                ) && (
                    <div>
                        <h3 className="header-title">{headerTitle}</h3>
                        { headerTitle !== "Artists" && (
                            <button
                            onClick={handlePlayClick}
                            className="main-pause-play-btn">{getPlayButtonContent()}</button>
                        )}
                    </div>
                )
            }

            {
                headerTitle === "Queue" && (
                    <div>
                        <h3 className="header-title">{headerTitle}</h3>
                        <button
                            onClick={() => {
                                songPlaying ? pauseSong() : resumeSong()
                            }}
                            className="main-pause-play-btn">{songPlaying ? "PAUSE" : "PLAY"}</button>
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
        </div>
    );
};

MainHeader.propTypes = {
    headerTitle: PropTypes.string,
    viewType: PropTypes.string,
    playlists: PropTypes.array,
    artists: PropTypes.array,
    songs: PropTypes.array,
    songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    queueSongs: PropTypes.array,
    songPaused: PropTypes.bool,
    songPlaying: PropTypes.bool,
    setQueue: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    audioControl: PropTypes.func,
}

export default MainHeader;