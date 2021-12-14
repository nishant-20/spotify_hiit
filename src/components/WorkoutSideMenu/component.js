import React from "react";
import PropTypes from "prop-types";
import "./WorkoutSideMenu.css";

const WorkoutSideMenu = ({
    token
}) => {
    const handleTrendingClick = () => {
        console.log("handleTrendingClick clicked");
    }

    const handleMyWorkoutsClick = () => {
        console.log("handleMyWorkoutsClick clicked");
    }

    return (
        <ul className="workout-side-menu-container">
            <li 
                key="trending"
                onClick={handleTrendingClick}
                className="workout-side-menu-item" >
                Trending
            </li>
            <li
                key="myWorkouts"
                onClick={handleMyWorkoutsClick}
                className="workout-side-menu-item active" >
                My Workouts
            </li>
        </ul>
    );
};

WorkoutSideMenu.propTypes = {
    token: PropTypes.string
};

export default WorkoutSideMenu;