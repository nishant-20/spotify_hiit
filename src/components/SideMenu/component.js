import React from "react";
import "./SideMenu.css";
import PropTypes from "prop-types";

const SideMenu = ({
    token,
    title,
    artistIds,
    fetchFeatured,
    updateHeaderTitle,
    fetchRecentlyPlayed,
    fetchSongs,
    fetchArtists,
    updateViewType
}) => {
    const handleMenuItemClick = (name) => {
        console.log(name);
        updateHeaderTitle(name);
        updateViewType(name);
    }

    const handleBrowseClick = () => {
        updateHeaderTitle("Browse");
        updateViewType("Browse");
        fetchFeatured(token);
    }

    const renderSideMenu = () => {
        const menu = [
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
                        item.fetchArtistsFlag ? item.action(token,artistIds) : item.action(token);
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
                className="side-menu-item radio">Recommendations</li>
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