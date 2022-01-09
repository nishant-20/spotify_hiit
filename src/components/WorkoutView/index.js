import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./WorkoutView.css";
import WorkoutTrendingList from "../WorkoutTrendingList";
import WorkoutList from "../WorkoutList";
import WorkoutLikedList from "../WorkoutLikedList";
import WorkoutHistoryList from "../WorkoutHistoryList";
import WorkoutHeader from "../WorkoutHeader";
import WorkoutSideMenu from "../WorkoutSideMenu";
import WorkoutMainView from "../WorkoutMainView";
import { startWorkout, playWorkout, pauseWorkout, stopWorkout, increaseExerciseTime, changeExercise, deleteWorkout } from "../../actions/workoutActions";

const WorkoutView = ({ workoutStopped,
    workoutViewType,
    startWorkout,
    playWorkout,
    pauseWorkout,
    stopWorkout,
    increaseExerciseTime,
    changeExercise,
    deleteWorkout }) => {

    const menu = [
        {
            title: "Trending",
            viewType: "trending"
        },
        {
            title: "My Workouts",
            viewType: "myWorkouts",
        },
        {
            title: "Liked",
            viewType: "myLikedWorkouts",
        },
        {
            title: "History",
            viewType: "myWorkoutHistory",
        },
    ];

    const headerTitle = menu.filter(item => item.viewType === workoutViewType)[0].title;

    return (
        <div>
            <WorkoutHeader />
            {
                workoutStopped ?
                    <div>
                        <div className="left-side-section">
                            <WorkoutSideMenu />
                        </div>
                        <div className="workout-main-section">
                            <div className="workout-header-container">
                                <h3 className="workout-header-title">{headerTitle}</h3>
                            </div>
                            <div className="workout-main-section-container">
                                {
                                    workoutViewType === "trending" ?
                                        <WorkoutTrendingList
                                            startWorkout={startWorkout}/> :

                                    workoutViewType === "myLikedWorkouts" ?
                                        <WorkoutLikedList
                                            startWorkout={startWorkout} /> :

                                    workoutViewType === "myWorkoutHistory" ?
                                        <WorkoutHistoryList /> :

                                        <WorkoutList
                                            startWorkout={startWorkout}
                                            deleteWorkout={deleteWorkout} />
                                }
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
};

const mapStateToProps = (state) => {
    return {
        workoutStopped: state.workoutReducer.workoutStopped,
        workoutViewType: state.workoutReducer.workoutViewType
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        startWorkout,
        playWorkout,
        pauseWorkout,
        stopWorkout,
        increaseExerciseTime,
        changeExercise,
        deleteWorkout
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutView);