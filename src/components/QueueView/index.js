import QueueView from "./component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        songs: state.songsReducer.queueSongs ? state.songsReducer.queueSongs : "",
        songId: state.songsReducer.songId,
        songPlaying: state.songsReducer.songPlaying,
        songPaused: state.songsReducer.songPaused,
        viewType: state.songsReducer.viewType
    };
};

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({

//     }, dispatch);
// };

export default connect(mapStateToProps, null)(QueueView);