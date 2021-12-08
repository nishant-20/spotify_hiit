import uniqBy from 'lodash/uniqBy';
import { setArtistIds } from "./artistActions";

export const fetchRecentlyPlayedPending = () => {
    return {
        type: "FETCH_RECENTLY_PLAYED_PENDING"
    };
};

export const fetchRecentlyPlayedSuccess = (songs) => {
    return {
        type: "FETCH_RECENTLY_PLAYED_SUCCESS",
        songs
    };
};

export const fetchRecentlyPlayedError = (err) => {
    return {
        type: "FETCH_RECENTLY_PLAYED_ERROR"
    };
};


export const fetchRecentlyPlayed = (accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/me/player/recently-played`, {
            headers: new Headers({
                "Authorization": "Bearer " + accessToken
            })
        });

        dispatch(fetchRecentlyPlayedPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            }).filter(item => {
                return item.track.preview_url !== null;
            });

            dispatch(fetchRecentlyPlayedSuccess(res.items));
        }).catch(err => {
            dispatch(fetchRecentlyPlayedError(err));
        });
    };
};

export const fetchSongsPending = () => {
    return {
        type: "FETCH_SONGS_PENDING"
    };
};

export const fetchSongsSuccess = (songs) => {
    return {
        type: "FETCH_SONGS_SUCCESS",
        songs
    };
};

export const fetchSongsError = (err) => {
    return {
        type: "FETCH_SONGS_ERROR"
    };
};

export const fetchSongs = (accessToken) => {
    return dispatch => {
        const request = new Request("https://api.spotify.com/v1/me/tracks", {
            headers: new Headers({
                "Authorization": "Bearer " + accessToken
            })
        });

        dispatch(fetchSongsPending());

        fetch(request).then(res => {
            if(res.statusText === "Unauthourized") {
                window.location.href = "./";
            }
            return res.json();
        }).then(res => {
            // Filtering duplicate songs and songs not having a preview URL
            res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            }).filter(item => {
                return item.track.preview_url !== null;
            });

            let artistsIds = uniqBy(res.items, (item) => {
                return item.track.artists[0].name
            }).map(item => {
                return item.track.artists[0].id
            }).join(",");

            dispatch(setArtistIds(artistsIds));
            dispatch(fetchSongsSuccess(res.items));
        }).catch(err => {
            dispatch(fetchSongsError(err));
        });
    };
};

export const searchSongsPending = () => {
    return {
        type: "SEARCH_SONGS_PENDING"
    };
};

export const searchSongsSuccess = (songs) => {
    return {
        type: "SEARCH_SONGS_SUCCESS",
        songs
    };
};

export const searchSongsError = (err) => {
    return {
        type: "SEARCH_SONGS_ERROR"
    };
};

export const searchSongs = (searchTerm, token) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=50`, {
            headers: new Headers({
                "Authorization" : "Bearer " + token
            })
        });

        dispatch(searchSongsPending());

        fetch(request).then(res => {
            if(res.statusText === "Unauthorized") {
                window.location.href = "./";
            }

            return res.json();
        }).then(res => {
            // Changing the response structure to match the response of the fetchSongs
            res.items = res.tracks.items.map(item => {
                return {
                    track: item
                };
            });

            res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            }).filter(item => {
                return item.track.preview_url !== null;
            });

            dispatch(searchSongsSuccess(res.items));
        }).catch(err => {
            dispatch(searchSongsError(err));
        });
    };
};

export const updateViewType = (view) => {
    return {
        type: "UPDATE_VIEW_TYPE",
        view
    };
};

export const playSong = (song) => {
    return {
        type: "PLAY_SONG",
        song
    };
};

export const stopSong = (song) => {
    return {
        type: "STOP_SONG"
    };
};

export const resumeSong = (song) => {
    return {
        type: "RESUME_SONG"
    };
};

export const pauseSong = (song) => {
    return {
        type: "PAUSE_SONG"
    };
};

export const increaseSongTime = (time) => {
    return {
        type: "INCREASE_SONG_TIME",
        time
    };
};