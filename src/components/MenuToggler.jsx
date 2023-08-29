import React, { Fragment, useEffect } from "react";
import imgToggleLeft from "../assets/sidebar-left.svg";
import imgToggleRight from "../assets/sidebar-right.svg";
import { useSelected } from "../hooks/useReducer";
import "./styles/menuToggler.css";

export default function MenuToggler({ menuOpen, setMenuOpen }) {
  const { selectedMovie } = useSelected();

  // when menu is on, disable the scroll
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
    make body overflow back to auto when window with is over 1000.
    
    when window width is over 1000 by resizing, menu button will disapear automatically
  */
  function handleResize() {
    const windowWidth = window.innerWidth;
    /* 
      selectedMovie = currently a user is watching the movie content
    */
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
    <Fragment>
      <div className="toggler" onClick={() => setMenuOpen((prev) => !prev)}>
        {menuOpen ? (
          <img src={imgToggleRight} alt="sidebar" />
        ) : (
          <img src={imgToggleLeft} alt="sidebar" />
        )}
      </div>
      <div
        className={`toggler-outside ${menuOpen && "toggler-outside--active"}`}
      ></div>
    </Fragment>
  );
}
