export const playlistReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_PLAYLIST_ITEM":
            return {
                ...state,
                playlists: [
                    ...state.playlists,
                    action.playlist
                ]
            };

        case "FETCH_PLAYLIST_MENU_SUCCESS":
            return {
                ...state,
                playlistMenu: action.playlists,
                playlists: action.playlists,
                fetchPlaylistMenuError: false,
                fetchPlaylistMenuPending: false
            };

        case "FETCH_PLAYLIST_MENU_PENDING":
            return {
                ...state,
                fetchPlaylistMenuPending: true
            };

        case "FETCH_PLAYLIST_MENU_ERROR":
            return {
                ...state,
                fetchPlaylistMenuPending: false,
                fetchPlaylistMenuError: true,
            };

        default:
            return state;
    }
};

export default playlistReducer;