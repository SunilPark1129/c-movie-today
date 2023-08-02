import React from "react";
import logo from "../assets/main_logo.png";
import "./styles/noposter.css";

// when there is no poster from fetched movie list, display this icon image instead
export default function NoPoster() {
  return (
    <div className="noposter">
      <img src={logo} alt="logo" />
    </div>
  );
}
