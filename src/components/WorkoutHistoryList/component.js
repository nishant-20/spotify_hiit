import React, { Component } from "react";
import "./WorkoutHistoryList.css";
import WorkoutHistoryListItem from "../WorkoutHistoryListItem";

class WorkoutHistoryList extends Component {
    state = {
        workoutHistories: this.props.workoutHistories
    };

    componentDidMount() {
        this.props.fetchWorkoutHistory(this.props.myHIITUser.id);
    }

    renderWorkoutHistoryList() {
        return this.props.workoutHistories.map((workoutHistory,i) => {
            return (
                <WorkoutHistoryListItem
                    key={i}
                    workoutHistory={workoutHistory} />
            )
        });
    }

    render() {
        return(
            <div>
                <div className="workouthistorylist-header-container">
                    <div className="workouthistory-name-header">
                        <p>Name</p>
                    </div>
                    <div className="workouthistory-description-header">
                        <p>Description</p>
                    </div>
                    <div className="workouthistory-date-header">
                        <p>Date</p>
                    </div>
                </div>
                <div className="workouthistorylist-body-container">
                    {this.props.workoutHistories ? this.renderWorkoutHistoryList() : null}
                </div>
            </div>
        );
    }
}

export default WorkoutHistoryList;