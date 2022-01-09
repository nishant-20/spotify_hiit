// import workoutList from "../assets/workouts.json";

const defaultState = {
    workoutViewType: "myWorkouts",
    workouts: [],
    trendingWorkouts: [],
    likedWorkouts: [],
    workoutHistories: [],
    exercises: [],
    currIndex: 0,
    workoutPlaying: false,
    workoutPaused: true,
    workoutStopped: true,
    exerciseTimeElapsed: 0,
    addWorkoutPending: false,
    deleteWorkoutPending: false
}

export const workoutReducer = (state = defaultState, action) => {
    // let updatedWorkouts;

    switch(action.type) {
        case "UPDATE_WORKOUT_VIEW_TYPE":
            return {
                ...state,
                workoutViewType: action.workoutViewType
            };

        case "FETCH_WORKOUTS_PENDING":
            return {
                ...state,
                fetchWorkoutsPending: true
            };

        case "FETCH_WORKOUTS_SUCCESS":
            return {
                ...state,
                workouts: action.workouts,
                fetchWorkoutsPending: false,
                fetchWorkoutsError: false
            };

        case "FETCH_WORKOUTS_ERROR":
            return {
                ...state,
                fetchWorkoutsPending: false,
                fetchWorkoutsError: true
            };

        case "FETCH_LIKED_WORKOUTS_PENDING":
            return {
                ...state,
                fetchLikedWorkoutsPending: true
            };

        case "FETCH_LIKED_WORKOUTS_SUCCESS":
            return {
                ...state,
                likedWorkouts: action.likedWorkouts,
                fetchLikedWorkoutsPending: false,
                fetchLikedWorkoutsError: false
            };

        case "FETCH_LIKED_WORKOUTS_ERROR":
            return {
                ...state,
                fetchLikedWorkoutsPending: false,
                fetchLikedWorkoutsError: true
            };

        case "FETCH_TRENDING_WORKOUTS_PENDING":
            return {
                ...state,
                fetchTrendingWorkoutsPending: true
            };

        case "FETCH_TRENDING_WORKOUTS_SUCCESS":
            return {
                ...state,
                trendingWorkouts: action.trendingWorkouts,
                fetchTrendingWorkoutsPending: false,
                fetchTrendingWorkoutsError: false
            };

        case "FETCH_TRENDING_WORKOUTS_ERROR":
            return {
                ...state,
                fetchTrendingWorkoutsPending: false,
                fetchTrendingWorkoutsError: true
            };

        case "LIKE_WORKOUT_PENDING":
            return {
                ...state,
                likeWorkoutPending: true
            };

        // Not using the updatedWorkout object which comes along with the action
        case "LIKE_WORKOUT_SUCCESS":
            return {
                ...state,
                likeWorkoutPending: false,
                likeWorkoutError: false
            };

        case "LIKE_WORKOUT_ERROR":
            return {
                ...state,
                likeWorkoutPending: false,
                likeWorkoutError: true
            };

        case "UNLIKE_WORKOUT_PENDING":
            return {
                ...state,
                unlikeWorkoutPending: true
            };

        // Not using the updatedWorkout object which comes along with the action
        case "UNLIKE_WORKOUT_SUCCESS":
            return {
                ...state,
                unlikeWorkoutPending: false,
                unlikeWorkoutError: false
            };

        case "UNLIKE_WORKOUT_ERROR":
            return {
                ...state,
                unlikeWorkoutPending: false,
                unlikeWorkoutError: true
            };

        case "FETCH_WORKOUT_HISTORY_PENDING":
            return {
                ...state,
                fetchWorkoutHistoryPending: true
            };

        case "FETCH_WORKOUT_HISTORY_SUCCESS":
            return {
                ...state,
                workoutHistories: action.workoutHistories,
                fetchWorkoutHistoryPending: false,
                fetchWorkoutHistoryError: false
            };

        case "FETCH_WORKOUT_HISTORY_ERROR":
            return {
                ...state,
                fetchWorkoutHistoryPending: false,
                fetchWorkoutHistoryError: true
            };

        case "ADD_WORKOUT_HISTORY_PENDING":
            return {
                ...state,
                addWorkoutHistoryPending: true
            };

        // Not using the updatedWorkout object which comes along with the action
        case "ADD_WORKOUT_HISTORY_SUCCESS":
            return {
                ...state,
                addWorkoutHistoryPending: false,
                addWorkoutHistoryError: false
            };

        case "ADD_WORKOUT_HISTORY_ERROR":
            return {
                ...state,
                addWorkoutHistoryPending: false,
                addWorkoutHistoryError: true
            };

        case "FETCH_EXERCISES_PENDING":
            return {
                ...state,
                fetchExercisesPending: true
            };

        case "FETCH_EXERCISES_SUCCESS":
            return {
                ...state,
                exercises: action.exercises,
                fetchExercisesPending: false,
                fetchExercisesError: false
            };

        case "FETCH_EXERCISES_ERROR":
            return {
                ...state,
                fetchExercisesPending: false,
                fetchExercisesError: true
            };

        case "ADD_WORKOUT_PENDING":
            return {
                ...state,
                addWorkoutPending: true
            };

        case "ADD_WORKOUT_SUCCESS":
            // updatedWorkouts = this.state.workouts;
            // updatedWorkouts.push(action.workout);

            return {
                ...state,
                // workouts: updatedWorkouts,
                addWorkoutPending: false,
                addWorkoutError: false
            };

        case "ADD_WORKOUT_ERROR":
            return {
                ...state,
                addWorkoutPending: false,
                addWorkoutError: true
            };

        case "UPDATE_WORKOUT_PENDING":
            return {
                ...state,
                updateWorkoutPending: true
            };

        case "UPDATE_WORKOUT_SUCCESS":
            // updatedWorkouts = this.state.workouts;
            // updatedWorkouts.push(action.workout);

            return {
                ...state,
                // workouts: updatedWorkouts,
                updateWorkoutPending: false,
                updateWorkoutError: false
            };

        case "UPDATE_WORKOUT_ERROR":
            return {
                ...state,
                updateWorkoutPending: false,
                updateWorkoutError: true
            };

        case "DELETE_WORKOUT_PENDING":
            return {
                ...state,
                deleteWorkoutPending: true
            };

        case "DELETE_WORKOUT_SUCCESS":
            return {
                ...state,
                deleteWorkoutPending: false,
                deleteWorkoutError: false
            };

        case "DELETE_WORKOUT_ERROR":
            return {
                ...state,
                deleteWorkoutPending: false,
                deleteWorkoutError: true
            };

        case "START_WORKOUT":
            return {
                ...state,
                workout: action.workout,
                workoutStopped: false,
                currIndex: 0,
                exerciseTimeElapsed: 0
            };

        case "PLAY_WORKOUT":
            return {
                ...state,
                workoutPlaying: true,
                workoutPaused: false
            };

        case "PAUSE_WORKOUT":
            return {
                ...state,
                workoutPlaying: false,
                workoutPaused: true
            };

        case "STOP_WORKOUT":
            return {
                ...state,
                workout: null,
                workoutPlaying: false,
                workoutPaused: true,
                workoutStopped: true
            };

        case "INCREASE_EXERCISE_TIME":
            return {
                ...state,
                exerciseTimeElapsed: action.exerciseTimeElapsed
            };

        case "CHANGE_EXERCISE":
            return {
                ...state,
                currIndex: action.currIndex,
                exerciseTimeElapsed: 0
            }

        default:
            return state;
    }
};

export default workoutReducer;