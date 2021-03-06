import React, { Component } from "react";
import "./WorkoutListItem.css";
import WorkoutUpdateForm from "../WorkoutUpdateForm";
import WorkoutViewForm from "../WorkoutViewForm";

// TODO: Disable the other action buttons when one action is in process
class WorkoutListItem extends Component {
    state = {
        expanded: false,
        updateFormExpanded: false
    };

    componentWillReceiveProps(nextProps) {
        if(!nextProps.workoutUpdateFormExpandedFlag) {
            this.setState({
                ...this.state,
                updateFormExpanded: false
            });
        }
    }

    secondsToMins = (inputSecs) => {
        const mins = Math.floor(inputSecs/60);
        const secs = (inputSecs%60).toFixed(0);
        return mins === 0 ?
                secs + " secs" :
                mins < 2 ?
                ( mins + " min ") + secs + " secs" :
                ( mins + " mins ") + secs + " secs";
    }

    secondsToString = (inputSecs) => {
        return inputSecs.toString() + " secs";
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

    handleEditClick = () => {
        this.props.changeWorkoutUpdateFormExpandedFlag(true);
        this.setState({
            ...this.state,
            updateFormExpanded: true
        });
    }

    handleDeleteClick = (e, id, userId) => {
        this.props.deleteWorkout(id, userId);
    }

    render() {
        const viewIcon = this.state.expanded ? "fa-eye-slash" : "fa-eye";

        return (
            <div className="workoutlist-item-container">
                <div className="workoutlist-item">
                    <div className="workout-name">
                        <p>{this.props.workout.name}</p>
                    </div>
                    <div className="workout-description">
                        <p>{this.countExercises(this.props.workout.exercises) + " exercises | " + this.secondsToMins(this.props.workout.totalDuration)}</p>
                    </div>
                    <div onClick={this.handlePlayClick}>
                        <i className="fa fa-play workout-play" aria-hidden="true" />
                    </div>
                    <div onClick={this.toggleExpanded}>
                        <i className={`fa  ${viewIcon} workout-info`} aria-hidden="true" />
                    </div>
                    <div onClick={this.handleEditClick}>
                        <i className="fa fa-pencil workout-edit" aria-hidden="true" />
                    </div>
                    <div onClick={(e) => this.handleDeleteClick(e, this.props.workout.id, this.props.myHIITUser.id)}>
                        <i className="fa fa-trash workout-delete" aria-hidden="true" />
                    </div>
                </div>
                    { this.state.expanded ?
                        <WorkoutViewForm
                            exercises={this.props.workout.exercises} /> :
                        null
                    }
                    {
                        this.props.workoutUpdateFormExpandedFlag && this.state.updateFormExpanded ?
                            <WorkoutUpdateForm
                                workout={this.props.workout}
                                exercises={this.props.exercises} /> :
                            null
                    }
            </div>
        );
    }
}

export default WorkoutListItem;