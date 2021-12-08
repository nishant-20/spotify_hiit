const defaultState = {
    volume: 50
};

export const soundReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "UPDATE_VOLUME":
            return {
                ...state,
                volume: action.volume
            };

        default:
            return state;
    }
};

export default soundReducer;