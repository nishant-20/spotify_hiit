import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import browseReducer from "./browseReducer";
import uiReducer from "./uiReducer";
import playlistReducer from "./playlistReducer";
import songsReducer from "./songsReducer";
import artistsReducer from "./artistsReducer";

export default combineReducers({
    tokenReducer,
    userReducer,
    browseReducer,
    uiReducer,
    playlistReducer,
    songsReducer,
    artistsReducer
});