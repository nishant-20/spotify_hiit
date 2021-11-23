import React, { Component } from "react";

class App extends Component {
    componentDidMount() {
        let hashParams = {};
        let e, r=/([^?=;]+)=?([^&;]*)/g, q = window.location.hash.substring(1);

        // Fetch and set access_token
        while((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        if(!hashParams.access_token) {
            window.location.href = 'https://accounts.spotify.com/authorize?client_id=869a63b1cb7f439ba6cf568a2d8b9ecf&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
        }
        else {
            console.log(hashParams.access_token);
        }
    }
    render() {
        return (
            <div>
                <h1>Spotify HIIT</h1>
            </div>
        );
    }
}

export default App;