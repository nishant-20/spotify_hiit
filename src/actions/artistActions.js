import uniqBy from 'lodash/uniqBy';

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

export const fetchTopArtistsPending = () => {
    return {
        type: "FETCH_TOP_ARTISTS_PENDING"
    };
};

export const fetchTopArtistsSuccess = (topArtistIds, topArtistGenres) => {
    return {
        type: "FETCH_TOP_ARTISTS_SUCCESS",
        topArtistIds,
        topArtistGenres
    };
};

export const fetchTopArtistsError = (err) => {
    return {
        type: "FETCH_TOP_ARTISTS_ERROR"
    };
};

export const fetchTopArtists = (accessToken) => {
    return dispatch => {
        const request = new Request("https://api.spotify.com/v1/me/top/artists", {
            headers: new Headers({
                "Authorization": "Bearer "+ accessToken
            })
        });

        dispatch(fetchTopArtistsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            let topArtistIds, topArtistGenres, topArtistGenresList;

            // Extract the artist Ids
            topArtistIds = res.items.map(item => {
                return item.id;
            }).join(',');

            // Extract the genres of the top artists
            topArtistGenres = res.items.map(item => {
                return item.genres.join(',');
            }).join(',');

            topArtistGenresList = uniqBy(topArtistGenres.split(',').map(item => { return item.replace(/\s+/g, '-');}), (item) => {
                return item;
            });

            topArtistGenres = topArtistGenresList.join(',');

            dispatch(fetchTopArtistsSuccess(topArtistIds,topArtistGenres))
        }).catch(err => {
            dispatch(fetchTopArtistsError(err));
        })
    };
};

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

            res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            }).filter(item => {
                return item.track.preview_url !== null;
            });

            dispatch(fetchArtistSongsSuccess(res.items));
        }).catch(err => {
            dispatch(fetchArtistSongsSuccess(err));
        })
    }
}