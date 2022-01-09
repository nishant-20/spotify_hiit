import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { fetchWorkoutHistory } from "../../actions/workoutActions";
import WorkoutHistoryList from "./component";

const mapStateToProps = (state) => {
    return {
        myHIITUser: state.userReducer.myHIITUser ? state.userReducer.myHIITUser : null,
        workoutHistories: state.workoutReducer.workoutHistories
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchWorkoutHistory
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutHistoryList);