import UserDetails from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        displayName: state.userReducer.user ? state.userReducer.user.display_name : "",
   };
};

export default connect(mapStateToProps, null)(UserDetails);