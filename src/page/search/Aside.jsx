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

  // request Fetch
  function queryFetch(title) {
    const tempQuery = title;
    dispatch(movieListClear());
    dispatch(queryListClear());
    const URL = `/search/movie?query=${encodeURIComponent(tempQuery)}&`;
    dispatch(historyAdd(tempQuery));

    // request another datas to display movie lists
    dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));
    setMenuOpen(false);
  }

  // remove targeted history
  function historyRemoveClickHandler(title) {
    dispatch(historyListClear(title));
  }

  return (
    <div className="search__history search__button">
      {histories && histories.length !== 0
        ? histories.map((title) => (
            <div className="search__history__content" key={title}>
              <p onClick={() => queryFetch(title)}>{title}</p>
              <button onClick={() => historyRemoveClickHandler(title)}>
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
