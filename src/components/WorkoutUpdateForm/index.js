import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WorkoutUpdateForm from "./component";
import { updateWorkout } from "../../actions/workoutActions";
import { changeWorkoutUpdateFormExpandedFlag } from "../../actions/uiActions";

const mapStateToProps = (state) => {
    return {
        myHIITUser: state.userReducer.myHIITUser
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateWorkout,
        changeWorkoutUpdateFormExpandedFlag
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutUpdateForm);