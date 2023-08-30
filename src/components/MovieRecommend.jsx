import React, { useState, useEffect } from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useDispatch } from "react-redux";
import imgRefresh from "../assets/refresh.svg";
import { useLists } from "../hooks/useReducer";
import NoPoster from "./NoPoster";

export default function MovieRecommend() {
  const [randomPage, setRandomPage] = useState(null);

  const { lists, isLoading, error } = useLists();

  useEffect(() => {
    setRandomPage(null);
    rerollClickHandler();
  }, [lists]);

  const dispatch = useDispatch();

  function openModalClickHandler() {
    dispatch(setMovie(randomPage));
  }

  // select random index
  function rerollClickHandler() {
    if (lists.length !== 0) {
      // get random number from page
      const RANDOM_PAGE_INDEX = Math.floor(Math.random() * lists.length);

      if (lists[RANDOM_PAGE_INDEX].movies.length !== 0) {
        // get random number from item
        const RANDOM_MOVIE_INDEX = Math.floor(
          Math.random() * lists[RANDOM_PAGE_INDEX].movies.length
        );

        setRandomPage(lists[RANDOM_PAGE_INDEX].movies[RANDOM_MOVIE_INDEX]);
      }
    }
  }

  return (
    <section
      className={`lists__recommend ${
        lists[0] &&
        lists[0].movies.length !== 0 &&
        !error &&
        "lists__recommend--not-empty"
      }`}
    >
      {!isLoading && randomPage ? (
        <article className="lists__recommend__box">
          <div className="lists__recommend__img-box">
            {randomPage.poster_path || randomPage.backdrop_path ? (
              <img
                src={
                  "https://image.tmdb.org/t/p/w500/" +
                  (randomPage.backdrop_path || randomPage.poster_path)
                }
                alt={randomPage.title}
              />
            ) : (
              <NoPoster />
            )}
          </div>
          <div className="lists__recommend__text-box">
            <h3>Today's Recommend</h3>
            <p>{randomPage.title}</p>
            <div className="lists__recommend__buttons">
              <button onClick={openModalClickHandler}>View</button>
              <button onClick={rerollClickHandler}>
                <img src={imgRefresh} alt="refresh" />
              </button>
            </div>
          </div>
        </article>
      ) : null}
    </section>
  );
}
