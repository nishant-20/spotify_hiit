export const userReducer = (state = {}, action) => {

    switch(action.type) {
        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                user: action.user,
                fetchUserError: false
            };

        case "FETCH_USER_ERROR":
            return {
                ...state,
                fetchUserError: true
            };

        case "FETCH_MYHIIT_USER_PENDING":
            return {
                ...state,
                fetchMyHIITUserPending: true
            };

        case "FETCH_MYHIIT_USER_SUCCESS":
            return {
                ...state,
                myHIITUser: action.myHIITUser,
                fetchMyHIITUserPending: false,
                fetchMyHIITUserError: false
            };

        case "FETCH_MYHIIT_USER_ERROR":
            return {
                ...state,
                fetchMyHIITUserPending: false,
                fetchMyHIITUserError: true
            };

        default:
            return state;
    }
};

export default userReducer;