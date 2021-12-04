export const browseReducer = (state = {}, action) => {
    switch(action.type) {
        case "FETCH_FEATURED_SUCCESS":
            return {
                ...state,
                view: action.featured.items,
                fetchFeaturedError: false
            };

        case "FETCH_FEATURED_ERROR":
            return {
                ...state,
                fetchFeaturedError: true
            };

        default:
            return state;
    }
};

export default browseReducer;