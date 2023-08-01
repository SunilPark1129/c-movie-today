import React, { useState, useEffect } from "react";
import {
  requestFetch,
  movieListClear,
} from "../../redux/reducers/movieFetchReducer";
import {
  requestQueryFetch,
  queryListClear,
  historyListClear,
  historyAdd,
} from "../../redux/reducers/queryFetchReducer";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import imgSearch from "../../assets/search.svg";
import imgClose from "../../assets/close.svg";

export default function Aside() {
  const [userQuery, setUserQuery] = useState("");
  const dispatch = useDispatch();

  // get move list (limit: 5 items)
  const { isLoading, queries, histories } = useSelector(
    (state) => state.queryFetchReducer
  );

  // a new string after debounced user query
  const searchTerm = useDebounce(userQuery);

  useEffect(() => {
    dispatch(movieListClear());
  }, []);

  useEffect(() => {
    // debounce is used to prevent web API overload
    if (searchTerm.trim() !== "") {
      dispatch(queryListClear());
      const URL = `/search/movie?query=${encodeURIComponent(searchTerm)}&`;
      dispatch(requestQueryFetch({ url: URL, currentPage: "&page=1&" }));
    } else {
      // clear query when search term is empty
      dispatch(queryListClear());
    }
  }, [searchTerm]);

  // get query from user
  function queryChangeHandler(e) {
    const { value } = e.target;
    setUserQuery(value);
  }

  // request Fetch
  function queryFetch(title) {
    const tempQuery = title;
    setUserQuery("");
    dispatch(movieListClear());
    dispatch(queryListClear());
    const URL = `/search/movie?query=${encodeURIComponent(tempQuery)}&`;
    dispatch(historyAdd(tempQuery));

    // request another datas to display movie lists
    dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));
  }

  function historyRemoveClickHandler(title) {
    dispatch(historyListClear(title));
  }

  function keyDownHandler(e) {
    if (e.keyCode === 13) {
      queryFetch(userQuery);
    }
  }

  return (
    <aside>
      <h3>Search</h3>
      <div className="dot"></div>

      {/* query input */}
      <div className="search__search-box">
        <input
          type="text"
          value={userQuery}
          onChange={queryChangeHandler}
          onKeyDown={keyDownHandler}
        />
        <button onClick={() => queryFetch(userQuery)}>
          <img src={imgSearch} alt="saerch" />
        </button>
      </div>

      {/* history lists */}
      <div className="search__history">
        {histories.length !== 0
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
      <div>
        {isLoading ? (
          <p>Loading . . .</p>
        ) : queries.length !== 0 ? (
          queries.map(({ id, title }, idx) => {
            if (idx < 4) {
              return (
                <p key={id} onClick={() => queryFetch(title)}>
                  {title}
                </p>
              );
            }
          })
        ) : null}
      </div>
    </aside>
  );
}
