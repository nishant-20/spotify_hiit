// Uncomment when need to use the workout list from workouts.json
// import workoutList from "../assets/workouts.json";

export const fetchWorkoutsPending = () => {
    return {
        type: "FETCH_WORKOUTS_PENDING"
    };
};

export const fetchWorkoutsSuccess = (workouts) => {
    return {
        type: "FETCH_WORKOUTS_SUCCESS",
        workouts
    };
};

export const fetchWorkoutsError = (err) => {
    return {
        type: "FETCH_WORKOUTS_ERROR"
    };
};

export const fetchWorkouts = (userId) => {
    return dispatch => {
        // Fetch the workout list from the backend
        const request = new Request(`http://localhost:8080/v1/workouts?user_id=${userId}`);

        dispatch(fetchWorkoutsPending());

        fetch(request).then(res => {
            return res.json();
        }).then( res => {
            dispatch(fetchWorkoutsSuccess(res.workouts));
        }).catch(err => {
            dispatch(fetchWorkoutsError(err));
        });

        // Uncomment to fetch local workoutList
        // let workouts = workoutList.workouts;
        // dispatch(fetchWorkoutsSuccess(workouts));
    };
};

export const fetchExercisesPending = () => {
    return {
        type: "FETCH_EXERCISES_PENDING"
    };
};

export const fetchExercisesSuccess = (exercises) => {
    return {
        type: "FETCH_EXERCISES_SUCCESS",
        exercises
    };
};

export const fetchExercisesError = (err) => {
    return {
        type: "FETCH_EXERCISES_ERROR"
    };
};

export const fetchExercises = () => {
    return dispatch => {
        // Fetch the workout list from the backend
        const request = new Request("http://localhost:8080/v1/exercises");

        dispatch(fetchExercisesPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchExercisesSuccess(res.exercises));
        }).catch(err => {
            dispatch(fetchExercisesError(err));
        });
    };
};

export const addWorkoutPending = () => {
    return {
        type: "ADD_WORKOUT_PENDING"
    };
};

export const addWorkoutSuccess = (workout) => {
    return {
        type: "ADD_WORKOUT_SUCCESS",
        workout
    };
};

export const addWorkoutError = (err) => {
    return {
        type: "ADD_WORKOUT_ERROR"
    };
};

export const addWorkout = (workout, userId) => {
    // Modifying payload to have user field
    workout.user = {
        "id": userId
    };

    return dispatch => {
        const request = new Request("http://localhost:8080/v1/workouts");

        dispatch(addWorkoutPending());

        fetch(request, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        }).then(res => {
            return res.json();
        }).then(res => {
            dispatch(addWorkoutSuccess(res));
            dispatch(fetchWorkouts(userId));
        }).catch(err => {
            dispatch(addWorkoutError(err));
        });
    }
}

export const updateWorkoutPending = () => {
    return {
        type: "UPDATE_WORKOUT_PENDING"
    };
};

export const updateWorkoutSuccess = (workout) => {
    return {
        type: "UPDATE_WORKOUT_SUCCESS",
        workout
    };
};

export const updateWorkoutError = (err) => {
    return {
        type: "UPDATE_WORKOUT_ERROR"
    };
};

export const updateWorkout = (workout, id, userId) => {
    // Modifying payload to have user field
    workout.user = {
        "id": userId
    };

    return dispatch => {
        const request = new Request(`http://localhost:8080/v1/workouts/${id}`);

        dispatch(updateWorkoutPending());

        fetch(request, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        }).then(res => {
            return res.json();
        }).then(res => {
            dispatch(updateWorkoutSuccess(res));
            dispatch(fetchWorkouts(userId));
        }).catch(err => {
            dispatch(updateWorkoutError(err));
        });
    }
}

export const deleteWorkoutPending = () => {
    return {
        type: "DELETE_WORKOUT_PENDING"
    };
};

// TODO: Add response of the delete API to the new state
export const deleteWorkoutSuccess = (res) => {
    return {
        type: "DELETE_WORKOUT_SUCCESS"
    };
};

export const deleteWorkoutError = (err) => {
    return {
        type: "DELETE_WORKOUT_ERROR"
    };
};

export const deleteWorkout = (id, userId) => {
    return dispatch => {
        const request = new Request(`http://localhost:8080/v1/workouts/${id}`);

        dispatch(deleteWorkoutPending());

        fetch(request, {
            method: "DELETE"
        }).then(res => {
            dispatch(deleteWorkoutSuccess(res));
            dispatch(fetchWorkouts(userId));
        }).catch(err => {
            dispatch(deleteWorkoutError(err));
        });
    };
}

export const startWorkout = (workout) => {
    return {
        type: "START_WORKOUT",
        workout
    };
};

export const playWorkout = () => {
    return {
        type: "PLAY_WORKOUT"
    };
};

export const pauseWorkout = () => {
    return {
        type: "PAUSE_WORKOUT"
    };
};

export const stopWorkout = () => {
    return {
        type: "STOP_WORKOUT"
    };
};

export const increaseExerciseTime = (exerciseTimeElapsed) => {
    return {
        type: "INCREASE_EXERCISE_TIME",
        exerciseTimeElapsed
    };
};

export const changeExercise = (currIndex) => {
    return {
        type: "CHANGE_EXERCISE",
        currIndex
    };
};