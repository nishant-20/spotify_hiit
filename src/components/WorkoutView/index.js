import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./WorkoutView.css";
import WorkoutList from "../WorkoutList";
import WorkoutHeader from "../WorkoutHeader";
import WorkoutSideMenu from "../WorkoutSideMenu";
import WorkoutMainView from "../WorkoutMainView";
import { startWorkout, playWorkout, pauseWorkout, stopWorkout, increaseExerciseTime, changeExercise } from "../../actions/workoutActions";

const WorkoutView = ({ workoutStopped,
    startWorkout,
    playWorkout,
    pauseWorkout,
    stopWorkout,
    increaseExerciseTime,
    changeExercise }) => (
    <div>
        <WorkoutHeader />
        {
            workoutStopped ?
                <div>
                    <div className="left-side-section">
                        <WorkoutSideMenu />
                    </div>
                    <div className="workout-main-section">
                        <div className="workout-main-section-container">
                            <WorkoutList 
                                startWorkout={startWorkout} />
                        </div>
                    </div>
                </div> :
                <WorkoutMainView 
                    playWorkout={playWorkout}
                    pauseWorkout={pauseWorkout}
                    stopWorkout={stopWorkout}
                    increaseExerciseTime={increaseExerciseTime}
                    changeExercise={changeExercise} />
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        workoutStopped: state.workoutReducer.workoutStopped
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        startWorkout,
        playWorkout,
        pauseWorkout,
        stopWorkout,
        increaseExerciseTime,
        changeExercise
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutView);