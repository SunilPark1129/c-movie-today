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
    <header className="header">
      <nav>
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <ul>
            {labels.map(({ label, path }) => {
              return (
                <li key={label}>
                  <Link to={path}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>search</p>
          <p>color mode</p>
        </div>
      </nav>
    </header>
  );
}
