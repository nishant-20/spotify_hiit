import React, { Component } from "react";
import "./WorkoutAddForm.css";
import PropTypes from "prop-types";

class WorkoutAddForm extends Component {
    state = {
        workout: {
            name: "",
            exercises: [{
                id: 1,
                name: "Jumping Jacks",
                duration: 30
            }]
        }
    };

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
        this.props.addWorkout(this.state.workout, this.props.myHIITUser.id);
        e.preventDefault();
        this.props.changeWorkoutAddFormExpandedFlag(false);
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.changeWorkoutAddFormExpandedFlag(false);
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
                <form id="add-workout-form"
                    onSubmit={this.handleSubmit}>
                    <div className="workout-form-name">
                        <input className="workout-form-name-input"
                            placeholder="Workout Name"
                            type="text"
                            required={true}
                            onChange={this.handleWorkoutNameChange} />
                    </div>

                    {
                        this.state.workout.exercises.map((exercise,i) => {

                            return(
                                <div key={i} className="exerciselist-item">
                                    <div className="exercise-name">
                                        <select name="exercise-name"
                                            form="add-workout-form"
                                            value={exercise.name}
                                            onChange={(e) => this.handleExerciseNameDurationChange(e, i, "name")}>
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
                                            form="add-workout-form"
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
                            value="Submit">
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

WorkoutAddForm.propTypes = {
    myHIITUser: PropTypes.object,
    addWorkout: PropTypes.func,
    changeWorkoutAddFormExpandedFlag: PropTypes.func,
};

export default WorkoutAddForm;