// Uncomment when need to use the workout list from workouts.json
// import workoutList from "../assets/workouts.json";

import { getBaseURLforMyHIIT } from "../utils/endpoints";

export const updateWorkoutViewType = (workoutViewType) => {
    return {
        type: "UPDATE_WORKOUT_VIEW_TYPE",
        workoutViewType
    };
};

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
    const baseURL = getBaseURLforMyHIIT();

    return dispatch => {
        // Fetch the workout list from the backend
        const request = new Request(`${baseURL}/workout?user_id=${userId}&trending=false`);

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

export const fetchLikedWorkoutsPending = () => {
    return {
        type: "FETCH_LIKED_WORKOUTS_PENDING"
    };
};

export const fetchLikedWorkoutsSuccess = (likedWorkouts) => {
    return {
        type: "FETCH_LIKED_WORKOUTS_SUCCESS",
        likedWorkouts
    };
};

export const fetchLikedWorkoutsError = (err) => {
    return {
        type: "FETCH_LIKED_WORKOUTS_ERROR"
    };
};

export const fetchLikedWorkouts = (userId) => {
    const baseURL = getBaseURLforMyHIIT();

    return dispatch => {
        // Fetch the liked workout list from the backend for the user
        const request = new Request(`${baseURL}/workout?trending=true&user_id=${userId}`);

        dispatch(fetchLikedWorkoutsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchLikedWorkoutsSuccess(res.workouts));
        }).catch(err => {
            dispatch(fetchLikedWorkoutsError(err));
        });
    };
};

export const fetchTrendingWorkoutsPending = () => {
    return {
        type: "FETCH_TRENDING_WORKOUTS_PENDING"
    };
};

export const fetchTrendingWorkoutsSuccess = (trendingWorkouts) => {
    return {
        type: "FETCH_TRENDING_WORKOUTS_SUCCESS",
        trendingWorkouts
    };
};

export const fetchTrendingWorkoutsError = (err) => {
    return {
        type: "FETCH_TRENDING_WORKOUTS_ERROR"
    };
};

export const fetchTrendingWorkouts = () => {
    const baseURL = getBaseURLforMyHIIT();

    return dispatch => {
        // Fetch trending workout list from the backend
        const request = new Request(`${baseURL}/workout?trending=true`);

        dispatch(fetchTrendingWorkoutsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchTrendingWorkoutsSuccess(res.workouts));
        }).catch(err => {
            dispatch(fetchTrendingWorkoutsError(err));
        });
    }
}

export const likeWorkoutPending = () => {
    return {
        type: "LIKE_WORKOUT_PENDING"
    };
};

export const likeWorkoutSuccess = (updatedWorkout) => {
    return {
        type: "LIKE_WORKOUT_SUCCESS",
        updatedWorkout
    };
};

export const likeWorkoutError = (err) => {
    return {
        type: "LIKE_WORKOUT_ERROR"
    };
};

export const likeWorkout = (workout, id, userId) => {
    const baseURL = getBaseURLforMyHIIT();
    delete workout.id;
    delete workout.trending;
    delete workout.totalDuration;
    workout.users = [
        {
            "id": userId
        }
    ];

    return dispatch => {
        // Add user to the workout's user list
        const request = new Request(`${baseURL}/workout/${id}?type=addUser`);

        dispatch(likeWorkoutPending());

        fetch(request, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        }).then(res => {
            return res.json();
        }).then(res => {
            dispatch(likeWorkoutSuccess(res));
            dispatch(fetchLikedWorkouts(userId));
        }).catch(err => {
            dispatch(likeWorkoutError(err));
        });
    };
};

export const unlikeWorkoutPending = () => {
    return {
        type: "UNLIKE_WORKOUT_PENDING"
    };
};

export const unlikeWorkoutSuccess = (updatedWorkout) => {
    return {
        type: "UNLIKE_WORKOUT_SUCCESS",
        updatedWorkout
    };
};

export const unlikeWorkoutError = (err) => {
    return {
        type: "UNLIKE_WORKOUT_ERROR"
    };
};

export const unlikeWorkout = (workout, id, userId) => {
    const baseURL = getBaseURLforMyHIIT();
    delete workout.id;
    delete workout.trending;
    delete workout.totalDuration;
    workout.users = [
        {
            "id": userId
        }
    ];

    return dispatch => {
        // Add user to the workout's user list
        const request = new Request(`${baseURL}/workout/${id}?type=removeUser`);

        dispatch(unlikeWorkoutPending());

        fetch(request, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        }).then(res => {
            return res.json();
        }).then(res => {
            dispatch(unlikeWorkoutSuccess(res));
            dispatch(fetchLikedWorkouts(userId));
        }).catch(err => {
            dispatch(unlikeWorkoutError(err));
        });
    };
};

export const fetchWorkoutHistoryPending = () => {
    return {
        type: "FETCH_WORKOUT_HISTORY_PENDING"
    };
};

export const fetchWorkoutHistorySuccess = (workoutHistories) => {
    return {
        type: "FETCH_WORKOUT_HISTORY_SUCCESS",
        workoutHistories
    };
};

export const fetchWorkoutHistoryError = (err) => {
    return {
        type: "FETCH_WORKOUT_HISTORY_ERROR"
    };
};

export const fetchWorkoutHistory = (userId) => {
    const baseURL = getBaseURLforMyHIIT();

    return dispatch => {
        // Fetch the workout history for the user
        const request = new Request(`${baseURL}/workoutHistories?user_id=${userId}`);

        dispatch(fetchWorkoutHistoryPending());

        fetch(request).then(res => {
            return res.json();
        }).then( res => {
            dispatch(fetchWorkoutHistorySuccess(res.workoutHistoryVOList));
        }).catch(err => {
            dispatch(fetchWorkoutHistoryError(err));
        });
    };
};


export const addWorkoutHistoryPending = () => {
    return {
        type: "ADD_WORKOUT_HISTORY_PENDING"
    };
};

export const addWorkoutHistorySuccess = (workoutHistory) => {
    return {
        type: "ADD_WORKOUT_HISTORY_SUCCESS",
        workoutHistory
    };
};

export const addWorkoutHistoryError = (err) => {
    return {
        type: "ADD_WORKOUT_HISTORY_ERROR"
    };
};

export const addWorkoutHistory = (workout, userId) => {
    const baseURL = getBaseURLforMyHIIT();

    const workoutHistory = workout;
    delete workoutHistory.id;
    delete workoutHistory.trending;
    delete workoutHistory.users;
    delete workoutHistory.totalDuration;

    return dispatch => {
        // Add the workout history for the user
        const request = new Request(`${baseURL}/workoutHistories?user_id=${userId}`);

        dispatch(addWorkoutHistoryPending());

        fetch(request, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workoutHistory)
        }).then(res => {
            return res.json();
        }).then( res => {
            dispatch(addWorkoutHistorySuccess(res));
            // dispatch(fetchWorkoutHistory(userId));
        }).catch(err => {
            dispatch(addWorkoutHistoryError(err));
        });
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
    const baseURL = getBaseURLforMyHIIT();

    return dispatch => {
        // Fetch the workout list from the backend
        const request = new Request(`${baseURL}/exercise`);

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
    const baseURL = getBaseURLforMyHIIT();

    // Modifying payload to have user field. Adding single user to the users list in the payload.
    workout.trending = false;
    workout.users = [
            {
            "id": userId
            }
        ];

    return dispatch => {
        const request = new Request(`${baseURL}/workout`);

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
    const baseURL = getBaseURLforMyHIIT();
    workout.user = {
        "id": userId
    };

    return dispatch => {
        const request = new Request(`${baseURL}/workout/${id}`);

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
    const baseURL = getBaseURLforMyHIIT();

    return dispatch => {
        const request = new Request(`${baseURL}/workout/${id}`);

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