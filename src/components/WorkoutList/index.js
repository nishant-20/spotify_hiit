import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchWorkouts } from "../../actions/workoutActions";
import WorkoutList from "./component";

const mapStateToProps = (state) => {
    return {
        workouts: state.workoutReducer.workouts
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchWorkouts
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);