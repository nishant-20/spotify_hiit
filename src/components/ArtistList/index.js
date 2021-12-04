import ArtistList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateHeaderTitle } from "../../actions/uiActions";
import { fetchArtistSongs } from "../../actions/artistActions";

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token ? state.tokenReducer.token : "",
        artists: state.artistsReducer.artistsList ? state.artistsReducer.artistsList.artists : "",
        fetchArtistsPending: state.artistsReducer.fetchArtistsPending
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateHeaderTitle,
        fetchArtistSongs
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);