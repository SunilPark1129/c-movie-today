import React from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useDispatch } from "react-redux";
import { useSelected } from "../hooks/useReducer";

export default function MovieModal() {
  const dispatch = useDispatch();
  const { selectedMovie } = useSelected();

  // id,
  // genre_ids,
  // poster_path,
  // backdrop_path,
  // overview,
  // original_language,
  // original_title,
  // title,
  // vote_average,
  // vote_count,
  // released_date,

  function closeClickHandler() {
    dispatch(setMovie(null));
  }

  if (selectedMovie) {
    return (
      <div>
        {/* front page */}
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            background: "#fff",
            padding: "2rem",
            zIndex: "999",
          }}
        >
          <div onClick={closeClickHandler}>close</div>
          <div>
            <h4>{selectedMovie.title}</h4>
          </div>
        </div>
        {/* outside cover */}
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            zIndex: "998",
            background: "#3d3d3d94",
          }}
          onClick={closeClickHandler}
        ></div>
      </div>
    );
  } else {
    return null;
  }
}
