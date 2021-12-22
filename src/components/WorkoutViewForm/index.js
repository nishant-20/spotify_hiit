import React from "react";
import "./WorkoutViewForm.css";

const WorkoutViewForm = (exercises) => {
    const durationToString = (duration) => {
        return duration.toString().concat("secs");
    }

    return (
        <div className="view-workout-form-container">
        {
            exercises.exercises.map((exercise,i) => {
                return(
                    <div key={i} className="view-exerciselist-item">
                        <div className="view-exercise-name">
                            <p>{exercise.name}</p>
                        </div>
                        <div className="view-exercise-duration">
                            <p>{durationToString(exercise.duration)}</p>
                        </div>
                    </div>
                );
            })
        }
        </div>
    );
}

export default WorkoutViewForm;