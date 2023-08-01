import React from "react";
import "./styles/navbar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/main_logo.png";
import SearchInput from "./SearchInput";

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
                  <NavLink
                    to={path}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <SearchInput />
          <p>color mode</p>
        </div>
      </nav>
    </header>
  );
}
