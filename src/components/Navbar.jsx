import React from "react";
import "./styles/navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/main_logo.png";

const labels = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
  { label: "Info", path: "/info" },
];

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" width={40} />
      </Link>
      {labels.map(({ label, path }) => {
        return (
          <Link to={path} key={label}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
