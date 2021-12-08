import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchUser } from "./actions/userActions";
import { setToken } from "./actions/tokenActions";
import { playSong, stopSong, resumeSong, pauseSong } from "./actions/songActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "./components/Header";
import "./App.css";
import SideMenu from "./components/SideMenu";
import MainView from "./components/MainView";
import MainHeader from "./components/MainHeader";
import UserPlaylists from "./components/UserPlaylists";
import Footer from "./components/Footer";

class App extends Component {
    static audio;

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
            this.props.setToken(hashParams.access_token);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.token) {
            this.props.fetchUser(nextProps.token)
        }

        if(this.audio !== undefined) {
            this.audio.volume = nextProps.volume/100;
        }
    }

    pauseSong = () => {
        if(this.audio) {
            this.props.pauseSong();
            this.audio.pause();
        }
    };

    stopSong = () => {
        if(this.audio) {
            this.props.stopSong();
            this.audio.pause();
        }
    };

    resumeSong = () => {
        if(this.audio) {
            this.props.resumeSong();
            this.audio.play();
        }
    };

    audioControl = (song) => {
        // song is a member of the items array present in the songList as songs

        // Playing the first song
        if(this.audio === undefined) {
            this.props.playSong(song.track);
            this.audio = new Audio(song.track.preview_url);
            this.audio.play();
        } else {
            // Stop the previously running song
            this.props.stopSong();
            this.audio.pause();

            // Play recent selected song
            this.props.playSong(song.track);
            this.audio = new Audio(song.track.preview_url);
            this.audio.play();
        }
    };

    render() {
        return (
            <div>
                <div className="app-container">
                    <div className="left-side-section">
                        <SideMenu />
                        <UserPlaylists />
                    </div>
                    <div className="main-section">
                        <Header />
                        <div className="main-section-container">
                            <MainHeader
                                resumeSong = {this.resumeSong}
                                pauseSong = {this.pauseSong}
                                audioControl = {this.audioControl} />
                            <MainView
                                resumeSong = {this.resumeSong}
                                pauseSong = {this.pauseSong}
                                audioControl = {this.audioControl} />
                        </div>
                    </div>
                    <Footer
                        stopSong = {this.stopSong}
                        resumeSong = {this.resumeSong}
                        pauseSong = {this.pauseSong}
                        audioControl = {this.audioControl} />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    token: PropTypes.string,
    volume: PropTypes.number,
    fetchUser: PropTypes.func,
    setToken: PropTypes.func,
    playSong: PropTypes.func,
    stopSong: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token,
        volume: state.soundReducer.volume
   };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setToken,
            fetchUser,
            playSong,
            stopSong,
            resumeSong,
            pauseSong,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);