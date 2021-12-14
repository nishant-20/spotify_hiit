import { connect } from "react-redux";
import WorkoutSearch from "./component";

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token
    };
};

export default connect(mapStateToProps, null)(WorkoutSearch);