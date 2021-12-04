export const fetchFeaturedSuccess = (featured) => {
    return {
        type: "FETCH_FEATURED_SUCCESS",
        featured
    };
};

export const fetchFeaturedError = (err) => {
    return {
        type: "FETCH_FEATURED_ERROR"
    };
};

export const fetchFeatured = (accessToken) => {
    return dispatch => {
        const request = new Request("https://api.spotify.com/v1/browse/featured-playlists", {
            headers: new Headers({
                "Authorization": "Bearer " + accessToken
            })
        });
        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchFeaturedSuccess(res.playlists))
        }).catch(err => {
            dispatch(fetchFeaturedError(err))
        });
    };
};