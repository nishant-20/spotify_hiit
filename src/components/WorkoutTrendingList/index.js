import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTrendingWorkouts } from "../../actions/workoutActions";
import WorkoutTrendingList from "./component";

const mapStateToProps = (state) => {
    return {
        trendingWorkouts: state.workoutReducer.trendingWorkouts,
        likedWorkouts: state.workoutReducer.likedWorkouts,
        workouts: state.workoutReducer.workouts,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchTrendingWorkouts
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTrendingList);