import SongList from "./component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchSongs } from "../../actions/songActions";

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token ? state.tokenReducer.token : "",
        songs: state.songsReducer.songs ? state.songsReducer.songs : "",
        fetchSongsError: state.songsReducer.fetchSongsError,
        fetchSongsPending: state.songsReducer.fetchSongsPending,
        fetchPlaylistSongsPending: state.playlistReducer.fetchPlaylistSongsPending,
        viewType: state.songsReducer.viewType
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchSongs
    }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(SongList);