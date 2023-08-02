import React from "react";
import logo from "../assets/main_logo.png";
import "./styles/noposter.css";

export default function NoPoster() {
  return (
    <div className="noposter">
      <img src={logo} alt="logo" />
    </div>
  );
}
