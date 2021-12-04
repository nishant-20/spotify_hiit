import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs, updateViewType } from "../../actions/songActions";
import { updateHeaderTitle } from "../../actions/uiActions";
import TrackSearch from "./component";

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        searchSongs,
        updateViewType,
        updateHeaderTitle
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);