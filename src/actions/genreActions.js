export const fetchAvailableGenresPending = () => {
    return {
        type: "FETCH_AVAILABLE_GENRES_PENDING"
    };
};

export const fetchAvailableGenresSuccess = (genres) => {
    return {
        type: "FETCH_AVAILABLE_GENRES_SUCCESS",
        genres
    };
};

export const fetchAvailableGenresError = (err) => {
    return {
        type: "FETCH_AVAILABLE_GENRES_ERROR"
    };
};

export const fetchAvailableGenres = (token) => {
    return dispatch => {
        const request = new Request("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
            headers: new Headers({
                "Authorization": "Bearer " + token
            })
        });

        dispatch(fetchAvailableGenresPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchAvailableGenresSuccess(res.genres))
        }).catch(err => {
            dispatch(fetchAvailableGenresError(err));
        })
    };
};