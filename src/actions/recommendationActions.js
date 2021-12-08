import uniqBy from 'lodash/uniqBy';

export const getRecommendationsPending = () => {
    return {
        type: "GET_RECOMMENDATIONS_PENDING"
    };
};

export const getRecommendationsSuccess = (songs) => {
    return {
        type: "GET_RECOMMENDATIONS_SUCCESS",
        songs
    };
};

export const getRecommendationsError = (err) => {
    return {
        type: "GET_RECOMMENDATIONS_ERROR"
    };
};

export const getRecommendations = (seed_artists,seed_genres,token) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&seed_genres=${seed_genres}`, {
            headers: new Headers({
                "Authorization": "Bearer " + token
            })
        });

        dispatch(getRecommendationsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            res.items = res.tracks.map(item => {
                return {
                    track: item
                };
            });

            res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            }).filter(item => {
                return item.track.preview_url !== null;
            });

            dispatch(getRecommendationsSuccess(res.items));
        }).catch(err => {
            dispatch(getRecommendationsError(err));
        });
    };
};