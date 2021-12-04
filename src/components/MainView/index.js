import { connect } from "react-redux";
import MainView from "./component";

const mapStateToProps = (state) => {
    return {
        headerTitle: state.uiReducer.title ? state.uiReducer.title : ""
    }
}

export default connect(mapStateToProps,null)(MainView);