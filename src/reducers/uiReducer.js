const defaultState = {
    title: "Songs",
    toggleFlag: true
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

        default:
            return state;
    }
};

export default uiReducer;