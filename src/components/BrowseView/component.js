import React from "react";
import PropTypes from "prop-types";
import "./BrowseView.css";

const BrowseView = (
    {view,
    token,
    updateHeaderTitle,
    fetchPlaylistSongs,
    addPlaylistItem}) => {
    let browseView;

    if(view) {
        browseView = view.map((item, i) => {
            const getPlaylistSongs = () => {
                // console.log("getPlaylistSongs");
                addPlaylistItem(item);
                updateHeaderTitle(item.name);
                fetchPlaylistSongs(item.owner.id, item.id, token);
            };

            return (
                <li key={i}
                    onClick={getPlaylistSongs}
                    className="category-item">
                    <div className="category-image">
                        {/* Can insert a default image here */}
                        <img alt={item.name} src={item.images ? item.images[0].url : ""}/>
                    </div>
                </li>
            );
        });
    }

    return (
        <ul className="browse-view-container">
            {browseView}
        </ul>
    );
};

BrowseView.propTypes = {
    view: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    token: PropTypes.string,
    updateHeaderTitle: PropTypes.func,
    fetchPlaylistSongs: PropTypes.func,
    addPlaylistItem: PropTypes.func
}

export default BrowseView;