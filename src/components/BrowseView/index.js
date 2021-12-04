import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateHeaderTitle } from "../../actions/uiActions";
import { fetchPlaylistSongs, addPlaylistItem } from "../../actions/playlistActions";

import BrowseView from "./component";

const mapStateToProps = (state) => {
    return {
        view: state.browseReducer.view,
        token: state.tokenReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchPlaylistSongs,
            updateHeaderTitle,
            addPlaylistItem
        }, dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);