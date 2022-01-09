import React, { Component } from "react";
import "./WorkoutTrendingList.css";
import WorkoutTrendingListItem from "../WorkoutTrendingListItem";

class WorkoutTrendingList extends Component {
    state = {
        trendingWorkouts: this.props.trendingWorkouts
    };

    componentDidMount() {
        this.props.fetchTrendingWorkouts();
    }

    renderTrendingWorkoutList() {
        const myWorkoutIds = this.props.likedWorkouts.map(workout => workout.id);

        return this.props.trendingWorkouts.map((workout,i) => {
            const liked = myWorkoutIds.includes(workout.id);

            return (
                <WorkoutTrendingListItem
                    key={i}
                    workout={workout}
                    liked={liked}
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
                    {this.props.trendingWorkouts ? this.renderTrendingWorkoutList() : null}
                </div>
            </div>
        );
    }
}

export default WorkoutTrendingList;