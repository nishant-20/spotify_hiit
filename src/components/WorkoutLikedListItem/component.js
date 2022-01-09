import React, { Component } from "react";
import WorkoutViewForm from "../WorkoutViewForm";
import "./WorkoutLikedListItem.css";

class WorkoutLikedListItem extends Component {
    state = {
        expanded: false,
        liked: true
    };

    secondsToMins = (inputSecs) => {
        const mins = Math.floor(inputSecs/60);
        const secs = (inputSecs%60).toFixed(0);
        return mins === 0 ?
                secs + " secs" :
                mins < 2 ?
                ( mins + " min ") + secs + " secs" :
                ( mins + " mins ") + secs + " secs";
    }

    countExercises = (exercises) => {
        return exercises.filter(exercise => {
                return exercise.name !== "Rest"
            }).length;
    }

    handlePlayClick = () => {
        this.props.startWorkout(this.props.workout);
        this.props.addWorkoutHistory(this.props.workout, this.props.myHIITUser.id);
    }

    toggleExpanded = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded
        });
    }

    handleLikeClick = () => {
        this.props.unlikeWorkout(this.props.workout, this.props.workout.id, this.props.myHIITUser.id);

        this.setState({
            ...this.state,
            liked: false
        });
    }

    render() {
        const viewIcon = this.state.expanded ? "fa-eye-slash" : "fa-eye";
        const likedIcon = this.state.liked ? "fa-heart" : "fa-heart-o";

        return (
            <div className="workoutlist-item-container">
                <div className="workoutlist-item">
                    <div className="workout-name">
                        <p>{this.props.workout.name}</p>
                    </div>
                    <div className="likedworkout-description">
                        <p>{this.countExercises(this.props.workout.exercises) + " exercises | " + this.secondsToMins(this.props.workout.totalDuration)}</p>
                    </div>
                    <div onClick={this.handlePlayClick}>
                        <i className="fa fa-play workout-play" aria-hidden="true" />
                    </div>
                    <div onClick={this.toggleExpanded}>
                        <i className={`fa ${viewIcon} workout-info`} aria-hidden="true" />
                    </div>
                    <div onClick={this.handleLikeClick}>
                        <i className={`fa ${likedIcon} workout-like`} aria-hidden="true" />
                    </div>
                </div>
                    { this.state.expanded ?
                        <WorkoutViewForm
                            exercises={this.props.workout.exercises} /> :
                        null
                    }
            </div>
        );
    }
}

export default WorkoutLikedListItem;