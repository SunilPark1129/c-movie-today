import React, { useEffect } from "react";
import imgToggleLeft from "../assets/sidebar-left.svg";
import imgToggleRight from "../assets/sidebar-right.svg";
import { useSelected } from "../hooks/useReducer";
import "./styles/menuToggler.css";

export default function MenuToggler({ menuOpen, setMenuOpen }) {
  const { selectedMovie } = useSelected();

  // when menu trigger is on, disable the scroll
  useEffect(() => {
    if (menuOpen) {
      document.querySelector("body").style.overflow = "hidden";
    }
    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, [menuOpen]);

  /* 
    when overflow is hidden by clicking the menu trigger, 
    make body overflow back to auto when window with is over 1000
    when window width is over 1000 trigger button will disapear 
  */
  function handleResize() {
    const windowWidth = window.innerWidth;
    /* 
      when selectedMovie is not null (which means that user is currently viewing the movie info)
      then prevent overflow auto
      because when user clicked the movie list, it also turned body to overflow hidden
    */
    if (windowWidth >= 1000 && !selectedMovie) {
      setMenuOpen(false);
      document.querySelector("body").style.overflow = "auto";
    }
  }

  // adding resize handler
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
