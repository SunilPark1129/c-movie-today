import React, { useState, useEffect } from "react";
import { setMovie } from "../redux/reducers/selectedReducer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";

function DisplayMovie() {
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
      <div>
        <img
          src={
            "https://image.tmdb.org/t/p/w500/" +
            (randomPage.backdrop_path || randomPage.poster_path)
          }
          alt={randomPage.title}
          width={300}
        />
        <button onClick={randomSelect}>random</button>
        <button onClick={selectMovie}>more detail</button>
      </div>
    ) : (
      <div>No image</div>
    )
  ) : null;
}

export default function MovieRecommend() {
  return (
    <div>
      <Loading />
      <DisplayMovie />
    </div>
  );
}
