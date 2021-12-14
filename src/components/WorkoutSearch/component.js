import React, { Component } from "react";
import PropTypes from "prop-types";
import "./WorkoutSearch.css";

// TODO: Implement search from backend
class WorkoutSearch extends Component {
    state = {
        searchTerm: ""
    };

    updateSearchTerm = e => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    render() {
        return (
            <div className="workout-search-container">
                <form onSubmit={() => {
                    console.log("Workout Search submitted" + this.state.searchTerm);
                }}>
                    <input placeholder="Search workout..."
                        type="text"
                        onChange={this.updateSearchTerm} />
                    <button 
                        onClick={e => {
                            e.preventDefault();
                            console.log("Workout Search submitted" + this.state.searchTerm);
                        }}
                    >
                        <i className="fa fa-search workout-search" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }
}

WorkoutSearch.propTypes = {
    token: PropTypes.string
};

export default WorkoutSearch;