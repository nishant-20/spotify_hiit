import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WorkoutAddForm from "./component";
import { addWorkout } from "../../actions/workoutActions";
import { changeWorkoutAddFormExpandedFlag } from "../../actions/uiActions";

const mapStateToProps = (state) => {
    return {
        myHIITUser: state.userReducer.myHIITUser
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addWorkout,
        changeWorkoutAddFormExpandedFlag
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutAddForm);