export const fetchUserSuccess = (user) => {
    return {
        type: "FETCH_USER_SUCCESS",
        user
    };
};

export const fetchUserError = (err) => {
    return {
        type: "FETCH_USER_ERROR",
    };
};

export const fetchUser = (accessToken) => {
    // Get user details "/me" endpoint
    return dispatch => {
        const request = new Request("https://api.spotify.com/v1/me", {
            headers: new Headers({
                "Authorization": "Bearer " + accessToken
            })
        });

        fetch(request).then(res => {
            // For 401's we send the user back to the homepage and display the error over there
            if(res.statusText === "Unauthorized") {
                window.location.href = "./";
            }
            return res.json();
        }).then(res => {
            dispatch(fetchUserSuccess(res));
        }).catch(err => {
            dispatch(fetchUserError(err));
        });
    };
};

// Method to fetch the user details from MyHIIT
export const fetchMyHIITUserPending = () => {
    return {
        type: "FETCH_MYHIIT_USER_PENDING"
    };
};

export const fetchMyHIITUserSuccess = (myHIITUser) => {
    return {
        type: "FETCH_MYHIIT_USER_SUCCESS",
        myHIITUser
    };
};

export const fetchMyHIITUserError = (err) => {
    return {
        type: "FETCH_MYHIIT_USER_ERROR"
    };
};

export const fetchMyHIITUser = (email) => {
    return dispatch => {
        const request = new Request(`http://localhost:8080/v1/users?email=${email}`);

        dispatch(fetchMyHIITUserPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            // Assuming the userList will contain single user
            dispatch(fetchMyHIITUserSuccess(res.users[0]));
        }).catch(err => {
            dispatch(fetchMyHIITUserError(err));
        });
    };
};

