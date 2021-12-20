import React, { Component } from "react";
import "./WorkoutListItem.css";
import WorkoutUpdateForm from "../WorkoutUpdateForm";

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

    handlePlayClick = () => {
        this.props.startWorkout(this.props.workout);
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

    handleDeleteClick = (e, id) => {
        this.props.deleteWorkout(id);
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
                        <p>{this.props.workout.exercises.length + " exercises | " + this.secondsToMins(this.props.workout.totalDuration)}</p>
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
                    <div onClick={(e) => this.handleDeleteClick(e, this.props.workout.id)}>
                        <i className="fa fa-trash workout-delete" aria-hidden="true" />
                    </div>
                </div>
                    { this.state.expanded ?
                        <div className="exerciselist-container">
                            {
                                this.props.workout.exercises.map((exercise,i) => {
                                        return (
                                            <div key={i}
                                                className="exerciselist-item">
                                                <div className="exercise-name">
                                                    <p>{exercise.name}</p>
                                                </div>
                                                <div className="exercise-duration">
                                                    <p>{this.secondsToString(exercise.duration)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div> :
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