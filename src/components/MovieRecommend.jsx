import React, { useState, useEffect } from "react";
import { requestFetch } from "../redux/reducers/movieFetchReducer";
import { useSelector } from "react-redux";
import Loading from "./Loading";

export default function MovieRecommend() {
  const [randomPage, setRandomPage] = useState(null);
  const { lists, isLoading } = useSelector((state) => state.movieFetchReducer);

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

  return (
    <div>
      <Loading />
      {!isLoading && randomPage ? (
        randomPage.poster_path || randomPage.backdrop_path ? (
          <img
            src={
              "https://image.tmdb.org/t/p/w500/" +
              (randomPage.backdrop_path || randomPage.poster_path)
            }
            alt={randomPage.title}
            width={300}
          />
        ) : (
          <div>No image</div>
        )
      ) : null}
      <button onClick={randomSelect}>random</button>
    </div>
  );
}
