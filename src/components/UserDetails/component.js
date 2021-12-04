import React from "react";
import "./UserDetails.css";
import PropTypes from "prop-types";

const UserDetails = ({displayName}) => (
    <div className="user-details-container">
        <p className="user-details-username">{displayName}</p>
    </div>
);

UserDetails.propTypes = {
    displayName: PropTypes.string,
};

export default UserDetails;