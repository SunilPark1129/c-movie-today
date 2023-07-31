import React, { useState, useEffect, useRef } from "react";
import { getGenre, sortBy } from "../../data/data";
import {
  requestFetch,
  movieListClear,
} from "../../redux/reducers/movieFetchReducer";
import { useDispatch } from "react-redux";

export default function Aside() {
  const [getSortURL, setGetSortURL] = useState(sortBy[0].sortURL);
  const [getGenreID, setGetGenreID] = useState(getGenre[0].genreID);
  const [getSortName, setGetSortName] = useState(sortBy[0].sortName);
  const [getGenreName, setGetGenreName] = useState(getGenre[0].genreName);
  const currentRef = useRef(null);
  const dispatch = useDispatch();

  function sortClickHandler(url, name) {
    setGetSortURL(url);
    setGetSortName(name);
  }

  function genreClickHandler(id, name) {
    setGetGenreID(id);
    setGetGenreName(name);
  }

  useEffect(() => {
    if (currentRef.current) {
      dispatch(movieListClear());
      const URL = getSortURL + "with_genres=" + getGenreID;
      dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));
      window.scrollTo(0, 0);
    }

    return () => {
      currentRef.current = true;
    };
  }, [getSortURL, getGenreID]);

  return (
    <aside>
      <section>
        <h3>Sort</h3>
        {sortBy.map(({ sortName, sortURL }) => (
          <button
            className={`${getSortName === sortName && "activated"}`}
            key={sortName}
            onClick={() => sortClickHandler(sortURL, sortName)}
          >
            {sortName}
          </button>
        ))}
      </section>
      <section>
        <h3>Genre</h3>
        {getGenre.map(({ genreName, genreID }) => {
          console.log(getGenreName, genreName);
          return (
            <button
              className={`${getGenreName === genreName && "activated"}`}
              key={genreName}
              onClick={() => genreClickHandler(genreID, genreName)}
            >
              {genreName}
            </button>
          );
        })}
      </section>
    </aside>
  );
}
