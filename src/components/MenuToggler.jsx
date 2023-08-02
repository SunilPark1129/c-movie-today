import React, { useEffect } from "react";
import imgToggleLeft from "../assets/sidebar-left.svg";
import imgToggleRight from "../assets/sidebar-right.svg";
import { useSelected } from "../hooks/useReducer";
import "./styles/menuToggler.css";

export default function MenuToggler({ menuOpen, setMenuOpen }) {
  const { selectedMovie } = useSelected();

  useEffect(() => {
    if (menuOpen) {
      document.querySelector("body").style.overflow = "hidden";
    }
    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, [menuOpen]);

  function handleResize() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1000 && !selectedMovie) {
      setMenuOpen(false);
      document.querySelector("body").style.overflow = "auto";
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedMovie]);

  return (
    <div className="toggler" onClick={() => setMenuOpen((prev) => !prev)}>
      {menuOpen ? (
        <img src={imgToggleRight} alt="sidebar" />
      ) : (
        <img src={imgToggleLeft} alt="sidebar" />
      )}
    </div>
  );
}
