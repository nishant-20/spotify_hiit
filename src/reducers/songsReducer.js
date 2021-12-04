const defaultState = {
    viewType: 'songs',
    fetchSongsPending: true
};

// Change viewType casing
export const songsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "UPDATE_VIEW_TYPE":
            return {
                ...state,
                viewType: action.view
            };

        case "FETCH_PLAYLIST_SONGS_PENDING":
            return {
                ...state,
                fetchPlaylistSongsPending: true,
            };

        case "FETCH_PLAYLIST_SONGS_SUCCESS":
            return {
                ...state,
                songs: action.songs,
                viewType: "playlist",
                fetchPlaylistSongsPending: false,
                fetchPlaylistSongsError: false
            };

        case "FETCH_PLAYLIST_SONGS_ERROR":
            return {
                ...state,
                fetchPlaylistSongsPending: false,
                fetchPlaylistSongsError: true
            };

        case "FETCH_RECENTLY_PLAYED_PENDING":
            return {
                ...state,
                fetchSongsPending: true,
            };

        case "FETCH_RECENTLY_PLAYED_SUCCESS":
            return {
                ...state,
                songs: action.songs,
                viewType: "Recently Played",
                fetchSongsPending: false,
                fetchSongsError: false
            };

        case "FETCH_RECENTLY_PLAYED_ERROR":
            return {
                ...state,
                fetchSongsPending: false,
                fetchSongsError: true
            };

        case "FETCH_SONGS_PENDING":
            return {
                ...state,
                fetchSongsPending: true,
            };

        case "FETCH_SONGS_SUCCESS":
            return {
                ...state,
                songs: action.songs,
                viewType: "songs",
                fetchSongsPending: false,
                fetchSongsError: false
            };

        case "FETCH_SONGS_ERROR":
            return {
                ...state,
                fetchSongsPending: false,
                fetchSongsError: true
            };

        case "FETCH_ARTIST_SONGS_PENDING":
            return {
                ...state,
                fetchArtistSongsPending: true
            };

        case "FETCH_ARTIST_SONGS_SUCCESS":
            return {
                ...state,
                songs: action.songs,
                viewType: "Artist",
                fetchArtistSongsPending: false,
                fetchArtistSongsError: false
            };

        case "FETCH_ARTIST_SONGS_ERROR":
            return {
                ...state,
                fetchArtistSongsPending: false,
                fetchArtistSongsError: true
            };

        case "SEARCH_SONGS_PENDING":
            return {
                ...state,
                searchSongsPending: true
            };

        case "SEARCH_SONGS_SUCCESS":
            return {
                ...state,
                songs: action.songs,
                viewType: "search",
                searchSongsPending: false,
                searchSongsError: false
            };

        case "SEARCH_SONGS_ERROR":
            return {
                ...state,
                searchSongsPending: false,
                searchSongsError: true
            };

        case "GET_RECOMMENDATIONS_PENDING":
            return {
                ...state,
                getRecommendationsPending: true
            };

        case "GET_RECOMMENDATIONS_SUCCESS":
            return {
                ...state,
                getRecommendationsPending: false,
                getRecommendationsError: false,
                songs: action.songs
            };

        case "GET_RECOMMENDATIONS_ERROR":
            return {
                ...state,
                getRecommendationsPending: false,
                getRecommendationsError: true,
            };

        default:
            return state;
    }
};

export default songsReducer;