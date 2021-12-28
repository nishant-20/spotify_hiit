import React, { Component } from "react";
import "./WorkoutList.css";
import WorkoutListItem from "../WorkoutListItem";
import WorkoutAddForm from "../WorkoutAddForm";

// TODO: Handle empty lists
class WorkoutList extends Component {
    state = {
        workouts: this.props.workouts,
        myHIITUser: this.props.myHIITUser,
        myHIITId: -1
    };

    componentDidMount() {
        if(this.props.exercises.length === 0) {
            this.props.fetchExercises();
        }
    }

    componentWillReceiveProps(nextProps) {
        // Fetch MyHIIT user details
        // if(nextProps.user !== null && this.state.myHIITUser === null) {
        //     console.log("State");
        //     console.log(this.state);
        //     console.log("Prev Props");
        //     console.log(this.props);
        //     console.log("Next Props");
        //     console.log(nextProps);

        //     this.props.fetchMyHIITUser(nextProps.user.email);

        //     this.setState({
        //         ...this.state,
        //         myHIITUser: nextProps.myHIITUser
        //     });
        // }

        // Fetch MyHIIT user's associated workout routines
        if(!nextProps.fetchMyHIITUserPending && !nextProps.fetchMyHIITUserError && nextProps.myHIITUser !== null && this.state.myHIITId === -1) {
            this.props.fetchWorkouts(nextProps.myHIITUser.id);

            this.setState({
                ...this.state,
                myHIITUser: nextProps.myHIITUser,
                myHIITId: nextProps.myHIITUser.id
            });
        }
    }

    renderWorkoutList() {
        return this.props.workouts.map((workout,i) => {
            return (
                <WorkoutListItem
                    key={i}
                    workout={workout}
                    startWorkout={this.props.startWorkout}
                    deleteWorkout={this.props.deleteWorkout}
                    exercises={this.props.exercises} />
            )
        });
    }

    handleAddWorkout = () => {
        this.props.changeWorkoutAddFormExpandedFlag(true);
    }

    handleRefreshWorkouts = () => {
        if(this.state.myHIITUser !== null) {
            this.props.fetchWorkouts(this.state.myHIITUser.id);
        }
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
                { !this.props.workoutAddFormExpandedFlag ?
                    <div className="workoutlist-footer-container">
                        <button className="refresh-workout"
                            onClick={this.handleRefreshWorkouts}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                            <p>Reload Workouts</p>
                        </button>
                        <button className="add-workout"
                            onClick={this.handleAddWorkout}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            <p>Add Workout</p>
                        </button>
                    </div> :
                    <WorkoutAddForm exercises={this.props.exercises}/>
                }
            </div>
        )
    }
}

export default WorkoutList;