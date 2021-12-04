export const setArtistIds = (artistIds) => {
    return {
        type: "SET_ARTIST_IDS",
        artistIds
    };
};

export const fetchArtistsPending = () => {
    return {
        type: "FETCH_ARTISTS_PENDING"
    };
};

export const fetchArtistsSuccess = (artists) => {
    return {
        type: "FETCH_ARTISTS_SUCCESS",
        artists
    };
};

export const fetchArtistsError = (err) => {
    return {
        type: "FETCH_ARTISTS_ERROR"
    };
};

export const fetchArtists = (accessToken, artistIds) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
            headers: new Headers({
                "Authorization": "Bearer " + accessToken
            })
        });

        dispatch(fetchArtistsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchArtistsSuccess(res));
        }).catch(err => {
            dispatch(fetchArtistsError(err));
        });
    }
}

export const fetchArtistSongsPending = () => {
    return {
        type: "FETCH_ARTIST_SONGS_PENDING"
    };
};

export const fetchArtistSongsSuccess = (songs) => {
    return {
        type: "FETCH_ARTIST_SONGS_SUCCESS",
        songs
    };
};

export const fetchArtistSongsError = (err) => {
    return {
        type: "FETCH_ARTIST_SONGS_ERROR"
    };
};

export const fetchArtistSongs = (artistId, token) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
            headers: new Headers({
                "Authorization": "Bearer " + token
            })
        });

        dispatch(fetchArtistSongsPending());

        fetch(request).then(res => {
            if(res.statusText === "Unauthorized") {
                window.location.href = "./";
            }
            return res.json();
        }).then(res => {
            // mapping the response to match the response from get song request
            res.items = res.tracks.map(item => {
                return {
                    track: item
                };
            });

            dispatch(fetchArtistSongsSuccess(res.items));
        }).catch(err => {
            dispatch(fetchArtistSongsSuccess(err));
        })
    }
}