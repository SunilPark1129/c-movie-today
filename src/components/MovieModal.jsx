import React from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useSelector, useDispatch } from "react-redux";

export default function MovieModal() {
  const dispatch = useDispatch();
  const getMovie = useSelector((state) => state.selectedReducer.selectedMovie);

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

  if (getMovie) {
    return (
      <div>
        {/* front page */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div onClick={closeClickHandler}>close</div>
          <div>
            <h4>{getMovie.title}</h4>
          </div>
        </div>
        {/* outside cover */}
        <div></div>
      </div>
    );
  } else {
    return null;
  }
}
