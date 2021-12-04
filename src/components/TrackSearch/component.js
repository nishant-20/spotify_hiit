import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";

class TrackSearch extends Component {
    state = {
        searchTerm: ""
    };

    updateSearchTerm = e => {
        this.setState({
            searchTerm: e.target.value
        });
    };

    render() {
        return (
            <div className="track-search-container">
                <form onSubmit={() => {
                    this.props.searchSongs(this.state.searchTerm, this.props.token);
                    this.props.updateViewType("search");
                    this.props.updateHeaderTitle("Search results");
                }}>
                    <input placeholder="Search songs..."
                        type="text"
                        onChange={this.updateSearchTerm}
                    />
                    <button
                        onClick={e => {
                            e.preventDefault();
                            this.props.searchSongs(this.state.searchTerm, this.props.token);
                            this.props.updateViewType("search");
                            this.props.updateHeaderTitle("Search results");
                        }
                    }>
                        <i className="fa fa-search search" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }
}

TrackSearch.propTypes = {
    searchSongs: PropTypes.func,
    token: PropTypes.string,
    updateViewType: PropTypes.func,
    updateHeaderTitle: PropTypes.func
};

export default TrackSearch;