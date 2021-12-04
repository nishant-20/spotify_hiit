import React from "react";
import TrackSearch from "../TrackSearch";
import UserDetails from "../UserDetails";
import "./Header.css";

const Header = () => (
    <div className="header">
        <TrackSearch />
        <UserDetails />
    </div>
);

export default Header;