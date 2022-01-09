const envToSpotifyAuthorizationURL = {
    "prd" : "https://accounts.spotify.com/authorize?client_id=869a63b1cb7f439ba6cf568a2d8b9ecf&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=https://nishant-20.github.io/spotify_hiit/",
    "dev" : "https://accounts.spotify.com/authorize?client_id=869a63b1cb7f439ba6cf568a2d8b9ecf&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback"
}

const envToMyHIITEndpoint = {
    "prd" : "https://my-hiit.herokuapp.com/v1",
    "dev" : "http://localhost:8080/v1"
}

const envToSpotifyEndpoint = {
    "prd" : "https://api.spotify.com/v1",
    "dev" : "https://api.spotify.com/v1"
}

// check webpack string-replace-loader configuration
// const _env = 'STR_REPLACE_ENV';
// let platformEnv = _env === "remote" ? 'prd' : 'dev';
const windowLocation = window.location.href;
const platformEnv = windowLocation.indexOf('spotify_hiit') !== -1 ? 'prd' : 'dev';

const myHIITBaseURL = envToMyHIITEndpoint[platformEnv];
const spotifyBaseURL = envToSpotifyEndpoint[platformEnv];
const spotifyAuthorizationURL = envToSpotifyAuthorizationURL[platformEnv];

export function getBaseURLforMyHIIT() {
    return myHIITBaseURL;
}

export function getBaseURLforSpotify() {
    return spotifyBaseURL;
}

export function getSpotifyAuthorizationURL() {
    return spotifyAuthorizationURL;
}