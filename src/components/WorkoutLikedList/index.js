import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { fetchLikedWorkouts } from "../../actions/workoutActions";
import WorkoutLikedList from "./component";

const mapStateToProps = (state) => {
    return {
        myHIITUser: state.userReducer.myHIITUser ? state.userReducer.myHIITUser : null,
        likedWorkouts: state.workoutReducer.likedWorkouts,
        workouts: state.workoutReducer.workouts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchLikedWorkouts
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLikedList);