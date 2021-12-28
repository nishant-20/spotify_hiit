export const userReducer = (state = {}, action) => {

    switch(action.type) {
        case "FETCH_USER_PENDING":
            return {
                ...state,
                fetchUserPending: true
            };

        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                user: action.user,
                fetchUserPending: false,
                fetchUserError: false
            };

        case "FETCH_USER_ERROR":
            return {
                ...state,
                fetchUserPending: false,
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