import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { likeWorkout, unlikeWorkout, addWorkoutHistory } from "../../actions/workoutActions";
import WorkoutTrendingListItem from "./component";

const mapStateToProps = (state) => {
    return {
        myHIITUser: state.userReducer.myHIITUser ? state.userReducer.myHIITUser : null,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        likeWorkout,
        unlikeWorkout,
        addWorkoutHistory
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTrendingListItem);