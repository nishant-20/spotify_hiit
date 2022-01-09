import React, { Component } from "react";
import moment from "moment";
import WorkoutHistoryViewForm from "../WorkoutHistoryViewForm";
import "./WorkoutHistoryListItem.css";

class WorkoutHistoryListItem extends Component {
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

    toggleExpanded = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded
        });
    }

    render() {
        const viewIcon = this.state.expanded ? "fa-eye-slash" : "fa-eye";
        const workoutHistoryCreatedTime = moment(this.props.workoutHistory.createdTime).format("dddd, MMMM Do YYYY, h:mm:ss a");

        return (
            <div className="workouthistorylist-item-container">
                <div className="workouthistorylist-item">
                    <div className="workouthistory-name">
                        <p>{this.props.workoutHistory.name}</p>
                    </div>
                    <div className="workouthistory-description">
                        <p>{this.countExercises(this.props.workoutHistory.exercises) + " exercises | " + this.secondsToMins(this.props.workoutHistory.totalDuration)}</p>
                    </div>
                    <div className="workouthistory-time">
                        <p>{workoutHistoryCreatedTime}</p>
                    </div>
                    <div onClick={this.toggleExpanded}>
                        <i className={`fa ${viewIcon} workouthistory-info`} aria-hidden="true" />
                    </div>
                </div>
                    { this.state.expanded ?
                        <WorkoutHistoryViewForm
                            exercises={this.props.workoutHistory.exercises} /> :
                        null
                    }
            </div>
        );
    }
}

export default WorkoutHistoryListItem;