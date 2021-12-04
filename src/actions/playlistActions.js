import uniqBy from "lodash/uniqBy";

export const addPlaylistItem = (playlist) => {
    return {
        type: "ADD_PLAYLIST_ITEM",
        playlist
    };
};

export const fetchPlaylistsMenuPending = () => {
    return {
        type: "FETCH_PLAYLIST_MENU_PENDING",
    };
};

export const fetchPlaylistsMenuSuccess = (playlists) => {
    return {
        type: "FETCH_PLAYLIST_MENU_SUCCESS",
        playlists
    };
};

export const fetchPlaylistsMenuError = (err) => {
    return {
        type: "FETCH_PLAYLIST_MENU_ERROR"
    };
};

export const fetchPlaylistsMenu = (userId, token) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: new Headers({
                "Authorization": "Bearer " + token
            })
        });

        dispatch(fetchPlaylistsMenuPending());

        fetch(request).then(res => {
            if(res.statusText === "Unauthorized") {
                window.location.href = "./";
            }
            return res.json();
        }).then(res => {
            dispatch(fetchPlaylistsMenuSuccess(res.items));
        }).catch(err => {
            dispatch(fetchPlaylistsMenuError(err));
        })
    }
}

export const fetchPlaylistSongsPending = () => {
    return {
        type: "FETCH_PLAYLIST_SONGS_PENDING"
    };
};

export const fetchPlaylistSongsSuccess = (songs) => {
    return {
        type: "FETCH_PLAYLIST_SONGS_SUCCESS",
        songs
    };
};

export const fetchPlaylistSongsError = (err) => {
    return {
        type: "FETCH_PLAYLIST_SONGS_ERROR"
    };
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: new Headers({
                "Authorization": "Bearer " + accessToken
            })
        });

        dispatch(fetchPlaylistSongsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            });
            dispatch(fetchPlaylistSongsSuccess(res.items));
        }).catch(err => {
            dispatch(fetchPlaylistSongsError(err));
        });
    }
}