import MainHeader from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateHeaderTitle } from "../../actions/uiActions";

const mapStateToProps = (state) => {
    return {
        headerTitle: state.uiReducer.title,
        viewType: state.songsReducer.viewType,
        playlists: state.playlistReducer.playlists,
        artists: state.artistsReducer.artistsList ? state.artistsReducer.artistsList.artists : []
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateHeaderTitle
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(MainHeader);