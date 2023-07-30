import React from "react";
import "./styles/navbar.css";
import { Link } from "react-router-dom";

const labels = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
  { label: "Info", path: "/info" },
];

export default function Navbar() {
  return (
    <nav>
      {labels.map(({ label, path }) => {
        return <Link to={path}>{label}</Link>;
      })}
    </nav>
  );
}
