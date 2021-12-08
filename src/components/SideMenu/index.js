import SideMenu from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFeatured } from "../../actions/browseActions";
import { fetchRecentlyPlayed, fetchSongs, updateViewType } from "../../actions/songActions";
import { updateHeaderTitle } from "../../actions/uiActions";
import { fetchArtists } from "../../actions/artistActions";
import { getRecommendations } from "../../actions/recommendationActions";

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.user ? state.userReducer.user.id : "",
        token: state.tokenReducer.token ? state.tokenReducer.token : "",
        title: state.uiReducer.title ? state.uiReducer.title : "",
        artistIds: state.artistsReducer.artistIds ? state.artistsReducer.artistIds : "",
        topArtistIds: state.artistsReducer.topArtistIds ? state.artistsReducer.topArtistIds : "",
        topArtistGenres: state.artistsReducer.topArtistGenres ? state.artistsReducer.topArtistGenres : "",
        genres: state.genresReducer.genres ? state.genresReducer.genres : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFeatured,
        updateHeaderTitle,
        fetchRecentlyPlayed,
        fetchSongs,
        fetchArtists,
        updateViewType,
        getRecommendations,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);