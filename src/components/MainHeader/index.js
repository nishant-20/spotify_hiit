import MainHeader from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQueue } from "../../actions/queueActions";

const mapStateToProps = (state) => {
    return {
        headerTitle: state.uiReducer.title,
        viewType: state.songsReducer.viewType,
        playlists: state.playlistReducer.playlists,
        artists: state.artistsReducer.artistsList ? state.artistsReducer.artistsList.artists : [],
        songs: state.songsReducer.songs ? state.songsReducer.songs : [],
        songId: state.songsReducer.songId,
        queueSongs: state.songsReducer.queueSongs ? state.songsReducer.queueSongs : [],
        songPaused: state.songsReducer.songPaused,
        songPlaying: state.songsReducer.songPlaying,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setQueue
    }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(MainHeader);