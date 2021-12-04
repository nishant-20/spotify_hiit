import { connect } from "react-redux";
import VolumeControls from "./component";

const mapStateToProps = (state) => {
    return {
        volume: 50
    };
};

export default connect(mapStateToProps,null)(VolumeControls);