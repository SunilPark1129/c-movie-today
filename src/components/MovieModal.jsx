import React, { useEffect } from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useDispatch } from "react-redux";
import { matchGenre } from "../data/data";
import NoPoster from "./NoPoster";
import imgClose from "../assets/close.svg";

import "./styles/movieModal.css";

export default function MovieModal({ selectedMovie }) {
  // when open the modal, automatically set overflow to hidden
  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, []);

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
    release_date,
  } = selectedMovie;

  const BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const genreID = genre_ids
    ? genre_ids.map((item) => matchGenre(item))
    : ["??"];

  function closeModalClickHandler() {
    dispatch(setMovie(null));
  }

  if (selectedMovie) {
    return (
      <article className="modal">
        <div className="modal__container">
          <div className="modal__close" onClick={closeModalClickHandler}>
            <img src={imgClose} alt="close tab" />
          </div>
          <div className="modal__front-poster">
            {poster_path ? (
              <img src={BASE_URL + poster_path} alt="movie front poster" />
            ) : (
              <NoPoster />
            )}
          </div>
          <div className="modal__info">
            <div className="modal__header">
              <h4>{title}</h4>
              <p className="modal__header__original">{original_title}</p>
            </div>
            <div className="modal__text-box">
              <div>
                <p>
                  <span>Overview</span> :
                </p>
                <p>{overview}</p>
              </div>
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
                <span>Release date</span>: {release_date ?? "??"}
              </p>
              <p>
                <span>Language</span>: {original_language.toUpperCase() ?? "??"}
              </p>
              <p>
                <span>Vote count</span>: {vote_count ?? "??"}
              </p>
              <p>
                <span>Vote average</span>: {vote_average ?? "??"}
              </p>
              {backdrop_path && (
                <img
                  className="modal__back-poster"
                  src={BASE_URL + backdrop_path}
                  alt="movie front poster"
                />
              )}
            </div>
          </div>
        </div>

        <div className="modal__outside" onClick={closeModalClickHandler}></div>
      </article>
    );
  } else {
    return null;
  }
}
