import { connect } from "react-redux";
import WorkoutListItem from "./component";

const mapStateToProps = (state) => {
    return {
        workouts: state.workoutReducer.workouts
    };
};

export default connect(mapStateToProps, null)(WorkoutListItem);