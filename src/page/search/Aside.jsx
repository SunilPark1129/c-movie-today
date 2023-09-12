import React, { useState } from "react";
import {
  requestFetch,
  movieListClear,
} from "../../redux/reducers/movieFetchReducer";
import {
  queryListClear,
  historyListClear,
  historyAdd,
} from "../../redux/reducers/queryFetchReducer";
import { useDispatch } from "react-redux";
import imgClose from "../../assets/close.svg";
import SearchInput from "../../components/SearchInput";

import { useQueries } from "../../hooks/useReducer";

import MenuToggler from "../../components/MenuToggler";

function History({ setMenuOpen }) {
  const dispatch = useDispatch();
  const { histories } = useQueries();

  function historyClickHandler(title) {
    dispatch(movieListClear());
    dispatch(queryListClear());
    dispatch(historyAdd(title));
    const URL_PATH = `/search/movie?query=${encodeURIComponent(title)}&`;
    dispatch(requestFetch({ url: URL_PATH, currentPage: "&page=1&" }));
    setMenuOpen(false);
  }

  function removeHistoryClickHandler(title) {
    dispatch(historyListClear(title));
  }

  return (
    <div className="search__history search__button">
      {histories && histories.length !== 0
        ? histories.map((title) => (
            <div className="search__history__content" key={title}>
              <p
                className="notranslate"
                onClick={() => historyClickHandler(title)}
              >
                {title}
              </p>
              <button onClick={() => removeHistoryClickHandler(title)}>
                <img src={imgClose} alt="close" />
              </button>
            </div>
          ))
        : null}
    </div>
  );
}

export default function Aside() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <aside className={menuOpen ? "toggled" : ""}>
        <section>
          <h3>Search</h3>
        </section>

        {/* design purposed */}
        <div className="dot"></div>

        <section>
          {/* search input */}
          <SearchInput setMenuOpen={(bool) => setMenuOpen(bool)} />
        </section>

        <section>
          {/* history lists */}
          <History setMenuOpen={(bool) => setMenuOpen(bool)} />
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
