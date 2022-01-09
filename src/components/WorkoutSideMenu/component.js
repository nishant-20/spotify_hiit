import React from "react";
import PropTypes from "prop-types";
import "./WorkoutSideMenu.css";

// TODO: Add workout history for a user
const WorkoutSideMenu = ({
    workoutViewType,
    updateWorkoutViewType
}) => {

    const handleMenuItemClick = (viewType) => {
        updateWorkoutViewType(viewType);
    }

    // const handleTrendingClick = () => {
    //     console.log("handleTrendingClick clicked");
    // }

    // const handleMyWorkoutsClick = () => {
    //     console.log("handleMyWorkoutsClick clicked");
    // }

    // const handleMyLikedWorkoutsClick = () => {
    //     console.log("handleMyLikedWorkoutsClick clicked");
    // }

    // const handleMyWorkoutHistoryClick = () => {
    //     console.log("handleMyWorkoutHistoryClick clicked");
    // }

    const renderWorkoutSideMenu = () => {
        const menu = [
            {
                name: "Trending",
                viewType: "trending"
            },
            {
                name: "My Workouts",
                viewType: "myWorkouts"
            },
            {
                name: "Liked",
                viewType: "myLikedWorkouts"
            },
            {
                name: "History",
                viewType: "myWorkoutHistory"
            },
        ];

        return menu.map(item => {
            return (
                <li
                    key={item.viewType}
                    className={workoutViewType === item.viewType ? "workout-side-menu-item active" : "workout-side-menu-item"}
                    onClick={() => {
                        // item.action();
                        handleMenuItemClick(item.viewType)
                    }}>
                        {item.name}
                </li>
            );
        });
    }

    return (
        <ul className="workout-side-menu-container">
            {renderWorkoutSideMenu()}
        </ul>
    );
};

WorkoutSideMenu.propTypes = {
    workoutViewType: PropTypes.string,
    updateWorkoutViewType: PropTypes.func
};

export default WorkoutSideMenu;