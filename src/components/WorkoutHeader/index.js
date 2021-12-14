import React from "react";
import WorkoutSearch from "../WorkoutSearch";
import UserDetails from "../UserDetails";
import "./WorkoutHeader.css";

const WorkoutHeader = () => (
    <div className="workout-header">
        <WorkoutSearch />
        <UserDetails />
    </div>
);

export default WorkoutHeader;