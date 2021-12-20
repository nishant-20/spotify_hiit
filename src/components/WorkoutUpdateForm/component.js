import React, { Component } from "react";
import "./WorkoutUpdateForm.css";
import PropTypes from "prop-types";

class WorkoutUpdateForm extends Component {
    state = {
        workout: this.props.workout
    };

    componentDidMount() {
        this.setState({
            workout: this.props.workout
        });
    }

    handleWorkoutNameChange = e => {
        this.setState({
            ...this.state,
            workout: {
                ...this.state.workout,
                name: e.target.value
            }
        });
    }

    handleExerciseNameDurationChange = (e, i, type) => {
        let exercises = this.state.workout.exercises;
        let exercise = exercises[i];

        if(type === "name") {
            exercise.name = e.target.value;
            exercise.id = this.props.exercises.filter(ex => {
                return ex.name === exercise.name;
            })[0].id;
        }

        if(type === "duration") {
            exercise.duration = parseInt(e.target.value, 10);
        }

        exercises[i] = exercise;

        this.setState({
            ...this.state,
            workout: {
                ...this.state.workout,
                exercises: exercises
            }
        });
    }

    handleSubmit = (e) => {
        this.props.updateWorkout(this.state.workout, this.state.workout.id, this.props.myHIITUser.id);
        e.preventDefault();
        this.props.changeWorkoutUpdateFormExpandedFlag(false);
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.changeWorkoutUpdateFormExpandedFlag(false);
    }

    handleAddExercise = () => {
        let exercises = this.state.workout.exercises;
        exercises.push({
            id: 1,
            name: "Jumping Jacks",
            duration: 30
        });

        this.setState({
            ...this.state,
            workout: {
                ...this.state.workout,
                exercises: exercises
            }
        });
    }

    handleRemoveExercise = (e,i) => {
        let exercises = this.state.workout.exercises;
        exercises.splice(i,1);

        this.setState({
            ...this.state,
            workout: {
                ...this.state.workout,
                exercises: exercises
            }
        });
    }

    render() {
        return(
            <div className="add-workout-form-container">
                <form id="update-workout-form"
                    onSubmit={this.handleSubmit}>
                    <div className="workout-form-name">
                        <input placeholder="Workout Name"
                            type="text"
                            required={true}
                            value={this.state.workout.name}
                            onChange={this.handleWorkoutNameChange} />
                    </div>

                    {
                        this.state.workout.exercises.map((exercise,i) => {

                            return(
                                <div key={i} className="exerciselist-item">
                                    <div className="exercise-name">
                                        <select name="exercise-name"
                                            form="update-workout-form"
                                            value={exercise.name}
                                            onChange={(e) => this.handleExerciseNameDurationChange(e,i, "name")}>
                                            {
                                                this.props.exercises.map((ex,ex_i) => {
                                                    return (
                                                        <option key={ex_i} value={ex.name}>{ex.name}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="exercise-duration">
                                        <select name="exercise-duration"
                                            form="update-workout-form"
                                            value={exercise.duration}
                                            onChange={(e) => this.handleExerciseNameDurationChange(e, i, "duration")}>
                                            <option value={30}>30s</option>
                                            <option value={45}>45s</option>
                                            <option value={60}>60s</option>
                                        </select>
                                    </div>
                                    <div className="exercise-delete-container"
                                        onClick={(e) => this.handleRemoveExercise(e,i)}>
                                        <i className="fa fa-trash exercise-delete" aria-hidden="true"></i>
                                    </div>
                                </div>
                            );
                        })
                    }

                    <div className="exerciselist-actions">
                        <button className="add-exercise"
                            onClick={(e) => {
                                e.preventDefault();
                                this.handleAddExercise();
                            }}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div className="exerciselist-actions">
                        <input className="submit-workout"
                            type="submit"
                            value="Update">
                        </input>
                        <button className="cancel-workout"
                            onClick={(e) => {
                                this.handleCancel(e);
                            }}>
                            <p>Cancel</p>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

WorkoutUpdateForm.propTypes = {
    myHIITUser: PropTypes.object,
    updateWorkout: PropTypes.func,
    changeWorkoutUpdateFormExpandedFlag: PropTypes.func,
};

export default WorkoutUpdateForm;