import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { increaseSongTime } from "../../actions/songActions";
import SongControls from "./component";

const mapStateToProps = (state) => {
    return {
        songs: state.songsReducer.songs ? state.songsReducer.songs : [],
        queueSongs: state.songsReducer.queueSongs ? state.songsReducer.queueSongs : [],
        songName: state.songsReducer.songDetails ? state.songsReducer.songDetails.name : "--------",
        artistName: state.songsReducer.songDetails && state.songsReducer.songDetails.artists ? state.songsReducer.songDetails.artists[0].name : "------------",
        songPlaying: state.songsReducer.songPlaying,
        songPaused: state.songsReducer.songPaused,
        songDetails: state.songsReducer.songDetails,
        timeElapsed: state.songsReducer.timeElapsed
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        increaseSongTime
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);