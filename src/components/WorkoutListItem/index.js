import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WorkoutListItem from "./component";
import { changeWorkoutUpdateFormExpandedFlag } from "../../actions/uiActions";

const mapStateToProps = (state) => {
    return {
        workoutUpdateFormExpandedFlag: state.uiReducer.workoutUpdateFormExpandedFlag,
        myHIITUser: state.userReducer.myHIITUser
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        changeWorkoutUpdateFormExpandedFlag
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(WorkoutListItem);