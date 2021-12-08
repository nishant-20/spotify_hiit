import React from "react";
import PropTypes from "prop-types";
import "./ToggleView.css";

const ToggleView = ({
    toggleFlag,
    toggleView
}) => {

    const handleToggleClick = () => {
        toggleView(!toggleFlag);
    };

    return(
        <div onClick={handleToggleClick}
            className="caret-up-down">
            <i className={"fa fa-2x " + (toggleFlag ? "fa-caret-down" : "fa-caret-up")} aria-hidden="true"/>
        </div>
    );
};

ToggleView.propTypes = {
    toggleFlag: PropTypes.bool,
    toggleView: PropTypes.func
};

export default ToggleView;