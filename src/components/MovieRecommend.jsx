import React, { useState, useEffect } from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import imgRefresh from "../assets/refresh.svg";

function DisplayRecommendation() {
  const [randomPage, setRandomPage] = useState(null);
  const { lists, isLoading } = useSelector((state) => state.movieFetchReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setRandomPage(null);
    randomSelect();
  }, [lists]);

  // select random index
  function randomSelect() {
    if (lists.length !== 0) {
      const tempPage = Math.floor(Math.random() * lists.length);
      if (lists[tempPage].movies.length !== 0) {
        const tempItem = Math.floor(
          Math.random() * lists[tempPage].movies.length
        );
        setRandomPage(lists[tempPage].movies[tempItem]);
      }
    }
  }

  function selectMovie() {
    dispatch(setMovie(randomPage));
  }

  return !isLoading && randomPage ? (
    randomPage.poster_path || randomPage.backdrop_path ? (
      <article className="lists__recommend__box">
        <div className="lists__recommend__img-box">
          <img
            src={
              "https://image.tmdb.org/t/p/w500/" +
              (randomPage.backdrop_path || randomPage.poster_path)
            }
            alt={randomPage.title}
          />
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
    ) : (
      <div>No image</div>
    )
  ) : null;
}

export default function MovieRecommend() {
  const lists = useSelector((state) => {
    return state.movieFetchReducer.lists[0]?.movies;
  });

  if (lists?.length !== 0) {
    return (
      <div className="lists__recommend">
        <Loading />
        <DisplayRecommendation />
      </div>
    );
  } else {
    return null;
  }
}
