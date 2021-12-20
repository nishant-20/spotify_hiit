const defaultState = {
    title: "Songs",
    toggleFlag: false,
    workoutAddFormExpandedFlag: false,
    workoutUpdateFormExpandedFlag: false
};

export const uiReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "UPDATE_HEADER_TITLE":
            return {
                ...state,
                title: action.title
            };

        case "TOGGLE_VIEW":
            return {
                ...state,
                toggleFlag: action.toggleFlag
            };

        case "CHANGE_WORKOUT_ADD_FORM_EXPANDED":
            return {
                ...state,
                workoutAddFormExpandedFlag: action.workoutAddFormExpandedFlag
            };

        case "CHANGE_WORKOUT_UPDATE_FORM_EXPANDED":
            return {
                ...state,
                workoutUpdateFormExpandedFlag: action.workoutUpdateFormExpandedFlag
            };

        default:
            return state;
    }
};

export default uiReducer;