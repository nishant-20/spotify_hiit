import SongList from "./component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchSongs } from "../../actions/songActions";
import { fetchAvailableGenres } from "../../actions/genreActions";
import { fetchTopArtists } from "../../actions/artistActions";
import { setQueue } from "../../actions/queueActions";

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token ? state.tokenReducer.token : "",
        songs: state.songsReducer.songs ? state.songsReducer.songs : "",
        fetchSongsError: state.songsReducer.fetchSongsError,
        fetchSongsPending: state.songsReducer.fetchSongsPending,
        fetchPlaylistSongsPending: state.playlistReducer.fetchPlaylistSongsPending,
        songPlaying: state.songsReducer.songPlaying,
        songPaused: state.songsReducer.songPaused,
        songId: state.songsReducer.songId,
        viewType: state.songsReducer.viewType
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchSongs,
        fetchAvailableGenres,
        fetchTopArtists,
        setQueue
    }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(SongList);