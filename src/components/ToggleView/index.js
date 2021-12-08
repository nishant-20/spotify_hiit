import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ToggleView from "./component";
import { toggleView } from "../../actions/uiActions";

const mapStateToProps = (state) => {
    return {
        toggleFlag: state.uiReducer.toggleFlag,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        toggleView
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleView);