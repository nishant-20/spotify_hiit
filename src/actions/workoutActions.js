import workoutList from "../assets/workouts.json";

export const fetchWorkoutsSuccess = (workouts) => {
    return {
        type: "FETCH_WORKOUTS_SUCCESS",
        workouts
    };
};

export const fetchWorkouts = () => {
    return dispatch => {
        // Fetch the workout list from the backend
        let workouts = workoutList.workouts;

        dispatch(fetchWorkoutsSuccess(workouts));
    };
};

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