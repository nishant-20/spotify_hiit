const envToMyHIITEndpoint = {
    "prd" : "https://my-hiit.herokuapp.com/v1",
    "dev" : "http://localhost:8080/v1"
}

const envToSpotifyEndpoint = {
    "prd" : "https://api.spotify.com/v1",
    "dev" : "https://api.spotify.com/v1"
}

const _env = 'STR_REPLACE_ENV';
let platformEnv = _env === "remote" ? 'prd' : 'dev';

const myHIITBaseURL = envToMyHIITEndpoint[platformEnv];
const spotifyBaseURL = envToSpotifyEndpoint[platformEnv];

export function getBaseURLforMyHIIT() {
    return myHIITBaseURL;
}

export function getBaseURLforSpotify() {
    return spotifyBaseURL;
}