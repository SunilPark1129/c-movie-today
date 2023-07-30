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
  const currentRef = useRef(null);
  const dispatch = useDispatch();

  function genreClickHandler(id) {
    setGetGenreID(id);
  }

  function sortClickHandler(url) {
    setGetSortURL(url);
  }

  useEffect(() => {
    if (currentRef.current) {
      dispatch(movieListClear());
      const URL = getSortURL + "with_genres=" + getGenreID;
      dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));
    }

    return () => {
      currentRef.current = true;
    };
  }, [getSortURL, getGenreID]);

  return (
    <div>
      <div>
        {sortBy.map(({ sortName, sortURL }) => (
          <button key={sortName} onClick={() => sortClickHandler(sortURL)}>
            {sortName}
          </button>
        ))}
      </div>
      <div>
        {getGenre.map(({ genreName, genreID }) => (
          <button key={genreName} onClick={() => genreClickHandler(genreID)}>
            {genreName}
          </button>
        ))}
      </div>
    </div>
  );
}
