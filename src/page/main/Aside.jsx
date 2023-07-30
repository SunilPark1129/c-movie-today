import React, { useState, useEffect } from "react";
import { getGenre, sortBy } from "../../data/data";
import { requestFetch } from "../../redux/reducers/movieFetchReducer";
import { useDispatch } from "react-redux";

export default function Aside() {
  const [getSortURL, setGetSortURL] = useState(sortBy[0].sortURL);
  const [getGenreID, setGetGenreID] = useState(getGenre[0].genreID);
  const dispatch = useDispatch();

  function genreClickHandler(id) {
    setGetGenreID(id);
  }

  function sortClickHandler(url) {
    setGetSortURL(url);
  }

  useEffect(() => {
    const URL = getSortURL + "with_genres=" + getGenreID + "&page=1" + "&";
    dispatch(requestFetch(URL));
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
