import { connect } from "react-redux";
import WorkoutMainView from "./component";

const mapStateToProps = (state) => {
    return {
        workouts: state.workoutReducer.workouts ? state.workoutReducer.workouts : [],
        workout: state.workoutReducer.workout ? state.workoutReducer.workout : null,
        workoutPlaying: state.workoutReducer.workoutPlaying,
        workoutPaused: state.workoutReducer.workoutPaused,
        currIndex: state.workoutReducer.currIndex,
        exerciseTimeElapsed: state.workoutReducer.exerciseTimeElapsed
    };
};

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({
//         playWorkout,
//         pauseWorkout,
//         stopWorkout,
//         increaseExerciseTime
//     }, dispatch);
// };

export default connect(mapStateToProps, null)(WorkoutMainView);