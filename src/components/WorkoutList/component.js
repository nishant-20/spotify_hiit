import React, { Component } from "react";
import "./WorkoutList.css";
import WorkoutListItem from "../WorkoutListItem";

class WorkoutList extends Component {
    state = {
        workouts: this.props.workouts
    };

    componentDidMount() {
        this.props.fetchWorkouts();
    }

    renderWorkoutList() {
        return this.props.workouts.map((workout,i) => {
            return (
                <WorkoutListItem
                    key={i}
                    workout={workout}
                    startWorkout={this.props.startWorkout} />
            )
        });
    }

    render() {
        return (
            <div>
                <div className="workoutlist-header-container">
                    <div className="workout-name-header">
                        <p>Name</p>
                    </div>
                    <div className="workout-description-header">
                        <p>Description</p>
                    </div>
                </div>
                <div className="workoutlist-body-container">
                    {this.props.workouts ? this.renderWorkoutList() : null}
                </div>
                <div className="workoutlist-footer-container">
                    <button className="add-workout">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <p>Add</p>
                    </button>
                </div>
            </div>
        )
    }
}

export default WorkoutList;