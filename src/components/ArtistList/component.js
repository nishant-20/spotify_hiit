import React from "react";
import PropTypes from "prop-types";
import "./ArtistList.css";

const ArtistList = ({
    token,
    artists,
    updateHeaderTitle,
    fetchArtistsPending,
    fetchArtistSongs
}) => {
    const renderArtists = () => {
        return artists.map((artist,i) => {
            const artistSongsAction = (artist, token) => {
                fetchArtistSongs(artist.id,token)
                updateHeaderTitle(artist.name);
            }

            return (
                <li key={i}
                    className="artist-item"
                    onClick={() => {
                        artistSongsAction(artist,token);
                }}>
                    <a>
                        <div>
                            <div className="artist-image">
                                <img alt="artist" src={artist.images[0] ? artist.images[0].url : ""}></img>
                            </div>
                            <div className="artist-details">
                                <p>{artist.name}</p>
                            </div>
                        </div>
                    </a>
                </li>
            );
        });
    };

    return (
        <ul className="artist-view-container">
            {!fetchArtistsPending && artists && renderArtists()}
        </ul>
    );
}

ArtistList.propTypes = {
    artists: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    token: PropTypes.string,
    fetchArtistsPending: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    updateHeaderTitle: PropTypes.func,
    fetchArtistSongs: PropTypes.func
}

export default ArtistList;