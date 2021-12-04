import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserPlaylists from "./component";
import { updateHeaderTitle } from "../../actions/uiActions";
import { fetchPlaylistsMenu, fetchPlaylistSongs } from "../../actions/playlistActions";

const mapStateToProps = (state) => {
    return {
        title: state.uiReducer.title,
        userId: state.userReducer.user ? state.userReducer.user.id : "",
        token: state.tokenReducer.token ? state.tokenReducer.token : "",
        playlistMenu: state.playlistReducer.playlistMenu ? state.playlistReducer.playlistMenu : ""
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateHeaderTitle,
        fetchPlaylistsMenu,
        fetchPlaylistSongs
    }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(UserPlaylists);