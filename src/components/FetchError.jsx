import React from "react";
import imgEmpty from "../assets/empty.svg";
import "./styles/empty.css";
import { useLists } from "../hooks/useReducer";

// if found an error during the fetch item, display this content
export default function FetchError() {
  const { error } = useLists();

  if (error) {
    return (
      <div className="announce">
        <div className="announce__text-box">
          <h3>Fetch Error . . .</h3>
          <p>Error Message: {error}</p>
        </div>
        <img src={imgEmpty} alt="man is thinking" />
      </div>
    );
  } else {
    return null;
  }
}
