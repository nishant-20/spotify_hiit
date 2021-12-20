export const updateHeaderTitle = (title) => ({
    type: "UPDATE_HEADER_TITLE",
    title
});

export const toggleView = (toggleFlag) => ({
    type: "TOGGLE_VIEW",
    toggleFlag
});

export const changeWorkoutAddFormExpandedFlag = (workoutAddFormExpandedFlag) => ({
    type: "CHANGE_WORKOUT_ADD_FORM_EXPANDED",
    workoutAddFormExpandedFlag
});

export const changeWorkoutUpdateFormExpandedFlag = (workoutUpdateFormExpandedFlag) => ({
    type: "CHANGE_WORKOUT_UPDATE_FORM_EXPANDED",
    workoutUpdateFormExpandedFlag
});