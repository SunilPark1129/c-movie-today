import React, { useState, useEffect } from "react";
import { getGenre, sortBy } from "../../data/data";
import {
  requestFetch,
  movieListClear,
} from "../../redux/reducers/movieFetchReducer";
import { useDispatch } from "react-redux";
import MenuToggler from "../../components/MenuToggler";

export default function Aside() {
  const [getSortURL, setGetSortURL] = useState(sortBy[0].sortURL);
  const [getGenreID, setGetGenreID] = useState(getGenre[0].genreID);
  const [getSortName, setGetSortName] = useState(sortBy[0].sortName);
  const [getGenreName, setGetGenreName] = useState(getGenre[0].genreName);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  // sort button handler
  function sortClickHandler(url, name) {
    setGetSortURL(url);
    setGetSortName(name);
  }

  // genre button handler
  function genreClickHandler(id, name) {
    setGetGenreID(id);
    setGetGenreName(name);
  }

  // when clicking the button, fetching the URL
  useEffect(() => {
    dispatch(movieListClear());
    const URL = getSortURL + "with_genres=" + getGenreID;
    dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));
    window.scrollTo(0, 0);
  }, [getSortURL, getGenreID]);

  return (
    <>
      <aside className={menuOpen ? "toggled" : ""}>
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
        <div className="dot"></div>
        <section>
          <h3>Genre</h3>
          {getGenre.map(({ genreName, genreID }) => {
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

      {/* menu open bar */}
      {/* only exist when window width is under 1000px */}
      <MenuToggler
        menuOpen={menuOpen}
        setMenuOpen={(bool) => setMenuOpen(bool)}
      />
    </>
  );
}
