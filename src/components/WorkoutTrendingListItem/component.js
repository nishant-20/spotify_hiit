import React, { Component } from "react";
import "./WorkoutTrendingListItem.css";
import WorkoutViewForm from "../WorkoutViewForm";

class WorkoutTrendingListItem extends Component {
    state = {
        expanded: false
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

    handleUpvoteClick = () => {
        console.log("handleUpvoteClick clicked");
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

    handleLikeClick = (liked) => {
        if(liked) {
            this.props.unlikeWorkout(this.props.workout, this.props.workout.id, this.props.myHIITUser.id);
        } else {
            this.props.likeWorkout(this.props.workout, this.props.workout.id, this.props.myHIITUser.id);
        }
    }

    render() {
        const viewIcon = this.state.expanded ? "fa-eye-slash" : "fa-eye";
        const likedIcon = this.props.liked ? "fa-heart" : "fa-heart-o";

        return (
            <div className="workoutlist-item-container">
                <div className="workoutlist-item">
                    <div className="workout-name">
                        <p>{this.props.workout.name}</p>
                    </div>
                    <div className="workout-description">
                        <p>{this.countExercises(this.props.workout.exercises) + " exercises | " + this.secondsToMins(this.props.workout.totalDuration)}</p>
                    </div>
                    <div onClick={this.handleUpvoteClick}>
                        <i className="fa fa-arrow-up workout-upvote" aria-hidden="true" />
                    </div>
                    <div onClick={this.handlePlayClick}>
                        <i className="fa fa-play workout-play" aria-hidden="true" />
                    </div>
                    <div onClick={this.toggleExpanded}>
                        <i className={`fa ${viewIcon} workout-info`} aria-hidden="true" />
                    </div>
                    <div onClick={() => this.handleLikeClick(this.props.liked)}>
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

export default WorkoutTrendingListItem;