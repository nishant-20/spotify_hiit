import React, { Component } from "react";
import "./WorkoutMainView.css";

// TODO: Make Workout name scroll automatically
// TODO: Disable prev and next button on first and last exercise
class WorkoutMainView extends Component {
    state = {

    };

    componentDidMount() {
        // Starting the workout
        if(this.props.currIndex === 0 && this.props.exerciseTimeElapsed === 0) {
            this.props.playWorkout();
        }
    }

    // componentWillReceiveProps works when the component is already mounted
    componentWillReceiveProps(nextProps) {
        // Workout Paused
        if(nextProps.workoutPaused) {
            clearInterval(this.state.intervalId);
        }

        // Workout Resume Or Exercise Changed
        if((this.props.workoutPaused && !nextProps.workoutPaused) || (this.props.currIndex !== nextProps.currIndex)) {
            clearInterval(this.state.intervalId);
            this.calculateTime();
        }
    }

    calculateTime() {
        console.log("Inside calculateTime");

        const intervalId = setInterval(() => {
            if(this.props.exerciseTimeElapsed === this.props.workout.exercises[this.props.currIndex].duration && this.props.currIndex === this.props.workout.exercises.length-1) {
                clearInterval(this.state.intervalId);
                this.props.stopWorkout();
            } else if(this.props.exerciseTimeElapsed === this.props.workout.exercises[this.props.currIndex].duration) {
                this.props.changeExercise(this.props.currIndex + 1);
            } else if(!this.props.workoutPaused) {
                this.props.increaseExerciseTime(this.props.exerciseTimeElapsed + 1);
            }
        }, 1000);

        this.setState({
            intervalId: intervalId
        });
    }

    handlePlayWorkout = () => {
        if(this.props.workoutPlaying) {
            this.props.pauseWorkout();
        } else {
            this.props.playWorkout();
        }
    }

    handleStopWorkout = () => {
        clearInterval(this.state.intervalId);
        this.props.stopWorkout();
    }

    playPrevExercise = () => {
        console.log("Inside playPrevExercise");
        if(this.props.currIndex > 0) {
            this.props.pauseWorkout();
            // clearInterval(this.state.intervalId);
            this.props.changeExercise(this.props.currIndex-1);
            this.props.playWorkout();
        }
    }

    playNextExercise = () => {
        if(this.props.currIndex < this.props.workout.exercises.length-1) {
            this.props.pauseWorkout();
            // clearInterval(this.state.intervalId);
            this.props.changeExercise(this.props.currIndex+1);
            this.props.playWorkout();
        }
    }

    render() {
        // console.log("Inside WorkoutMainView render");
        // console.log(this.state);
        const playExerciseButtonClass = this.props.workoutPlaying ? "fa-pause" : "fa-play";
        const timeRemaining = this.props.workout ? this.props.workout.exercises[this.props.currIndex].duration - this.props.exerciseTimeElapsed : 0;
        const currentExerciseTimeRemainingClass = timeRemaining < 6 ? "current-exercise-time-elapsed active" : "current-exercise-time-elapsed";

        return (
            <div className="workout-main-view-container">
                <div className={currentExerciseTimeRemainingClass}>
                    <div className="prev-exercise"
                        onClick={this.playPrevExercise}>
                        <i className="fa fa-5x fa-angle-double-left" aria-hidden="true"></i>
                        <p>Prev</p>
                    </div>
                    <p>{timeRemaining > 9 ? "0:" + timeRemaining : "0:0" + timeRemaining}</p>
                    <div className="next-exercise"
                        onClick={this.playNextExercise}>
                        <i className="fa fa-5x fa-angle-double-right" aria-hidden="true"></i>
                        <p>Next</p>
                    </div>
                </div>
                <div className="current-exercise-name">
                    <p>{this.props.workout ? this.props.workout.exercises[this.props.currIndex].name : ""}</p>
                </div>
                <div className="workout-controls">
                    <div className="play-exercise"
                        onClick={this.handlePlayWorkout}>
                        <i className={`fa fa-3x ${playExerciseButtonClass} exercise-play`} aria-hidden="true" />
                    </div>
                    <div className="stop-workout"
                        onClick={this.handleStopWorkout}>
                        <i className={`fa fa-2x fa-stop-circle exercise-stop`} aria-hidden="true" />
                    </div>    
                </div>
            </div>
        );
    }
}

export default WorkoutMainView;