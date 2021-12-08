import React from "react";
import "./SideMenu.css";
import PropTypes from "prop-types";

const SideMenu = ({
    token,
    title,
    artistIds,
    topArtistIds,
    topArtistGenres,
    genres,
    fetchFeatured,
    updateHeaderTitle,
    fetchQueue,
    fetchRecentlyPlayed,
    fetchSongs,
    fetchArtists,
    updateViewType,
    getRecommendations
}) => {
    const handleMenuItemClick = (name) => {
        updateHeaderTitle(name);
        updateViewType(name);
    }

    const handleBrowseClick = () => {
        fetchFeatured(token);
        updateHeaderTitle("Browse");
        updateViewType("Browse");
    }

    const shuffleArray = (arr) => {
        let currIndex = arr.length, randomIndex;

        while(currIndex!==0) {
            randomIndex = Math.floor(Math.random() * currIndex);
            currIndex--;

            [arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]];
        }

        return arr.slice(0,2).join(",");
    }

    const handleRecommendationClick = () => {
        const topArtistIdsList = topArtistIds.split(',');
        const topArtistGenresList = topArtistGenres.split(',').filter(item => genres.includes(item));

        const seed_artists = shuffleArray(topArtistIdsList);
        const seed_genres = shuffleArray(topArtistGenresList.length>=2 ? topArtistGenresList : genres);

        getRecommendations(seed_artists,seed_genres,token);
        updateHeaderTitle("Recommendations");
        updateViewType("Recommendations");
    }

    const renderSideMenu = () => {
        const menu = [
            {
                name: "Queue",
            },
            {
                name: "Recently Played",
                action: fetchRecentlyPlayed
            },
            {
                name: "Songs",
                action: fetchSongs
            },
            {
                name: "Artists",
                action: fetchArtists,
                fetchArtistsFlag: true
            },
        ];

        return menu.map(item => {
            return (
                <li
                    key={item.name}
                    className={title === item.name ? "side-menu-item active" : "side-menu-item"}
                    onClick={() => {
                        if(item.fetchArtistsFlag) {
                            item.action(token,artistIds);
                        } else if (item.name !== "Queue") {
                            item.action(token);
                        }
                        handleMenuItemClick(item.name);
                    }}>
                    {item.name}
                </li>
            )
        })
    }
    return (
        <ul className="side-menu-container">
            <li
                key="browse"
                onClick={handleBrowseClick}
                className={title === "Browse" ? "side-menu-item active" : "side-menu-item"}>
                Browse
            </li>
            <li
                key="recommendations"
                onClick={handleRecommendationClick}
                className={title==="Recommendations" ? "side-menu-item radio active" : "side-menu-item radio"}>Recommendations</li>
            <h3 className="user-library-header">My Libary</h3>
            {renderSideMenu()}
        </ul>
    );
};

SideMenu.propTypes = {
    userId: PropTypes.string,
    token: PropTypes.string,
    title: PropTypes.string,
    artistIds: PropTypes.string,
    fetchFeatured: PropTypes.func,
    updateHeaderTitle: PropTypes.func,
    fetchRecentlyPlayed: PropTypes.func,
    fetchSongs: PropTypes.func,
    fetchArtists: PropTypes.func,
    updateViewType: PropTypes.func,
};

export default SideMenu;