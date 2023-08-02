import React, { useEffect } from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useDispatch } from "react-redux";
import { matchGenre } from "../data/data";
import NoPoster from "./NoPoster";
import imgClose from "../assets/close.svg";

import "./styles/movieModal.css";

export default function MovieModal({ selectedMovie }) {
  const dispatch = useDispatch();

  const {
    genre_ids,
    poster_path,
    backdrop_path,
    overview,
    original_language,
    original_title,
    title,
    vote_average,
    vote_count,
    released_date,
  } = selectedMovie;

  const imgURL = "https://image.tmdb.org/t/p/w500/";

  const genreID = genre_ids
    ? genre_ids.map((item) => matchGenre(item))
    : ["??"];

  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, [selectedMovie]);

  function closeClickHandler() {
    dispatch(setMovie(null));
  }

  if (selectedMovie) {
    return (
      <article className="modal">
        {/* front page */}
        <div className="modal__container">
          <div className="modal__close" onClick={closeClickHandler}>
            <img src={imgClose} alt="close tab" />
          </div>
          <div className="modal__front-poster">
            {poster_path ? (
              <img
                src={imgURL + poster_path}
                alt="movie front poster"
                width={200}
              />
            ) : (
              <NoPoster />
            )}
          </div>
          <header className="modal__header">
            <h4>{title}</h4>
            <p>{original_title}</p>
            <p>{original_language.toUpperCase()}</p>
          </header>
          {backdrop_path && (
            <img
              className="modal__back-poster"
              src={imgURL + backdrop_path}
              alt="movie front poster"
              width={200}
            />
          )}
          <div className="modal__text-box">
            <p>{overview}</p>
            <div className="modal__genre">
              <p>
                <span>Genre</span>:
              </p>
              <div>
                {genreID.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <p>
              <span>Released date</span>: {released_date ?? "??"}
            </p>
            <p>
              <span>Vote count</span>: {vote_count}
            </p>
            <p>
              <span>Vote average</span>: {vote_average}
            </p>
          </div>
        </div>
        {/* outside click close event */}
        <div
          className="modal__outside"
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: "#3d3d3d94",
          }}
          onClick={closeClickHandler}
        ></div>
      </article>
    );
  } else {
    return null;
  }
}
