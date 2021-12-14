// import workoutList from "../assets/workouts.json";

const defaultState = {
    workouts: [],
    currIndex: 0,
    workoutPlaying: false,
    workoutPaused: true,
    workoutStopped: true,
    exerciseTimeElapsed: 0
}

export const workoutReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "FETCH_WORKOUTS_SUCCESS":
            return {
                ...state,
                workouts: action.workouts
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