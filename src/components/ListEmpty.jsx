import React from "react";
import imgEmpty from "../assets/empty.svg";
import "./styles/empty.css";

// if fetched item is empty, display this content
export default function ListEmpty() {
  return (
    <div className="announce">
      <div className="announce__text-box">
        <h3>List is empty . . .</h3>
        <p>
          We tried to find the movie, but there was no relevant movie available.
        </p>
      </div>
      <img src={imgEmpty} alt="man is thinking" />
    </div>
  );
}
