import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMyHIITUser } from "../../actions/userActions";
import { fetchWorkouts, fetchExercises } from "../../actions/workoutActions";
import { changeWorkoutAddFormExpandedFlag } from "../../actions/uiActions";
import WorkoutList from "./component";

const mapStateToProps = (state) => {
    return {
        myHIITUser: state.userReducer.myHIITUser ? state.userReducer.myHIITUser : null,
        workouts: state.workoutReducer.workouts,
        exercises: state.workoutReducer.exercises ? state.workoutReducer.exercises : [],
        fetchMyHIITUserPending: state.userReducer.fetchMyHIITUserPending,
        fetchMyHIITUserError: state.userReducer.fetchMyHIITUserError,
        workoutAddFormExpandedFlag: state.uiReducer.workoutAddFormExpandedFlag,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchMyHIITUser,
        fetchWorkouts,
        fetchExercises,
        changeWorkoutAddFormExpandedFlag
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);