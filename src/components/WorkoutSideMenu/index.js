import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateWorkoutViewType } from "../../actions/workoutActions";
import WorkoutSideMenu from "./component";

const mapStateToProps = (state) => {
    return {
        workoutViewType: state.workoutReducer.workoutViewType
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateWorkoutViewType
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSideMenu);