export const genresReducer = (state = {}, action) => {
    switch(action.type) {
        case "FETCH_AVAILABLE_GENRES_PENDING":
            return {
                ...state,
                fetchAvailableGenresPending: true
            };

        case "FETCH_AVAILABLE_GENRES_SUCCESS":
            return {
                ...state,
                fetchAvailableGenresPending: false,
                fetchAvailableGenresError: false,
                genres: action.genres
            };

        case "FETCH_AVAILABLE_GENRES_ERROR":
            return {
                ...state,
                fetchAvailableGenresPending: false,
                fetchAvailableGenresError: true
            };

        default:
            return state;
    }
}

export default genresReducer;