import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SongControls from "./component";

const mapStateToProps = (state) => {
    return {
        songs: state.songsReducer.songs
    };
};

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({

//     }, dispatch)
// }

export default connect(mapStateToProps, null)(SongControls);