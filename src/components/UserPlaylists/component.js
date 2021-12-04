import React, { Component } from "react";
import PropTypes from "prop-types";
import "./UserPlaylists.css";

class UserPlaylists extends Component {
    state = {
        count: 0
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.userId !== "" && nextProps.token !== "" && this.state.count<1) {
            this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.token);
            this.setState({count: 1});
        }
    }

    renderPlaylists() {
        return this.props.playlistMenu.map(playlist => {
            const getPlaylistSongs = () => {
                console.log(playlist.name);
                this.props.fetchPlaylistSongs(playlist.owner.id, playlist.id, this.props.token);
                this.props.updateHeaderTitle(playlist.name);
            }

            return (
                <li key={playlist.id}
                    onClick={getPlaylistSongs}
                    className={this.props.title === playlist.name ? "user-playlist-item active" : "user-playlist-item"}>
                    {playlist.name}
                </li>
            );
        });
    }

    render() {
        return(
            <div className="user-playlist-container">
                <h3 className="user-playlist-header">My Playlists</h3>
                {this.props.playlistMenu && this.renderPlaylists()}
            </div>
        );
    }
}

UserPlaylists.propTypes = {
    title: PropTypes.string,
    userId: PropTypes.string,
    token: PropTypes.string,
    playlistMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    updateHeaderTitle: PropTypes.func,
    fetchPlaylistsMenu: PropTypes.func,
    fetchPlaylistSongs: PropTypes.func,
}

export default UserPlaylists;