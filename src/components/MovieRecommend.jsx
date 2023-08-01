import React, { useState, useEffect } from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import imgRefresh from "../assets/refresh.svg";
import { useLists } from "../hooks/useReducer";
import NoPoster from "./NoPoster";

function DisplayRecommendation({ lists, isLoading }) {}

export default function MovieRecommend() {
  const [randomPage, setRandomPage] = useState(null);
  // performance checked
  const { lists, isLoading, error } = useLists();

  useEffect(() => {
    setRandomPage(null);
    randomSelect();
  }, [lists]);

  const dispatch = useDispatch();

  // when the user clicked targeted poster
  function selectMovie() {
    dispatch(setMovie(randomPage));
  }

  // select random index
  // random number from the page and the item in the page list
  function randomSelect() {
    if (lists.length !== 0) {
      // get random number for page
      const tempPage = Math.floor(Math.random() * lists.length);
      if (lists[tempPage].movies.length !== 0) {
        // get random number for item
        const tempItem = Math.floor(
          Math.random() * lists[tempPage].movies.length
        );
        setRandomPage(lists[tempPage].movies[tempItem]);
      }
    }
  }

  return (
    <div
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
            <h3>Recommend</h3>
            <p>{randomPage.title}</p>
            <div className="lists__recommend__buttons">
              <button onClick={selectMovie}>View</button>
              <button onClick={randomSelect}>
                <img src={imgRefresh} alt="refresh" />
              </button>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
}
