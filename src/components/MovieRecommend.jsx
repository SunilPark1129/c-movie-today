import React, { useState, useEffect } from "react";

export default function MovieRecommend({ lists }) {
  const [randomPage, setRandomPage] = useState(null);

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
      {randomPage ? (
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
