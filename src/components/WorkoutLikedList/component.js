import React, { Component } from "react";
import "./WorkoutLikedList.css";
import WorkoutLikedListItem from "../WorkoutLikedListItem";

class WorkoutLikedList extends Component {
    state = {
        likedWorkouts: this.props.likedWorkouts
    };

    componentDidMount() {
        this.props.fetchLikedWorkouts(this.props.myHIITUser.id);
    }

    renderLikedWorkoutList() {
        return this.props.likedWorkouts.map((workout,i) => {
            return (
                <WorkoutLikedListItem
                    key={i}
                    workout={workout}
                    startWorkout={this.props.startWorkout} />
            )
        });
    }

    render() {
        return(
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
                    {this.props.likedWorkouts ? this.renderLikedWorkoutList() : null}
                </div>
            </div>
        );
    }
}

export default WorkoutLikedList;