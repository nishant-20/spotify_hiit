import { connect } from "react-redux";
import WorkoutSideMenu from "./component";

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token
    };
};

export default connect(mapStateToProps, null)(WorkoutSideMenu);