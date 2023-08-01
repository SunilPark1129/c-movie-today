import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import imgSearch from "../assets/search.svg";
import "./styles/searchInput.css";

import {
  queryListClear,
  requestQueryFetch,
  historyAdd,
} from "../redux/reducers/queryFetchReducer";

import {
  movieListClear,
  requestFetch,
} from "../redux/reducers/movieFetchReducer";

import { useDispatch } from "react-redux";

import { useQueries } from "../hooks/useReducer";

export default function SearchInput() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");
  const [isFocusing, setIsFocusing] = useState(false);

  const { queries, error } = useQueries();

  // a new string after debounced user query
  const searchTerm = useDebounce(userQuery);

  /* 
    useEffect for hiding the query lists div when clicking the 
    outside of the content (execpt for input tag and query lists div)
  */
  useEffect(() => {
    // when component is mounted add click eventhandler in document
    document.addEventListener("click", handleDocumentClick);

    // when component is unmounted remove click eventhandler from document
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // when clicking the doucment
  function handleDocumentClick(e) {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      // when losing the focus, hiding the query list div
      setIsFocusing(false);
    }
  }

  // request query lists with user input
  useEffect(() => {
    if (searchTerm)
      if (searchTerm.trim() !== "") {
        // debounce is used to prevent web API overload
        dispatch(queryListClear());
        const URL = `/search/movie?query=${encodeURIComponent(searchTerm)}&`;
        dispatch(requestQueryFetch({ url: URL, currentPage: "&page=1&" }));
        setIsFocusing(true);
      } else {
        // clear query when search term is empty
        dispatch(queryListClear());
      }
  }, [searchTerm]);

  // request Fetch
  function queryFetch(title) {
    const tempQuery = title;
    // clear all lists
    dispatch(movieListClear());
    dispatch(queryListClear());

    // set URL useing with user input
    const URL = `/search/movie?query=${encodeURIComponent(tempQuery)}&`;

    // fetch
    dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));

    // add history in the state
    dispatch(historyAdd(tempQuery));
  }

  // get query from user input value
  function queryChangeHandler(e) {
    const { value } = e.target;
    setUserQuery(value);
  }

  function keyDownHandler(e) {
    if (e.keyCode === 13) {
      queryFetch(userQuery);
    }
  }

  function queryClickHandler(title) {
    queryFetch(title);
    setIsFocusing(false);
  }

  return (
    <div className="search__container search__button">
      <div className="search__input-box" ref={containerRef}>
        <input
          type="text"
          value={userQuery}
          onChange={queryChangeHandler}
          onKeyDown={keyDownHandler}
          onClick={() => setIsFocusing(true)}
        />

        {/* query lists */}
        <div className="search__query-lists">
          {error ? (
            <p style={{ pointerEvents: "none" }}>Fetch Error...</p>
          ) : null}
          {isFocusing && queries.length !== 0
            ? queries.map(({ id, title }, idx) => {
                if (idx < 4) {
                  return (
                    <p key={id} onClick={() => queryClickHandler(title)}>
                      {title}
                    </p>
                  );
                }
              })
            : null}
        </div>
      </div>
      {/* submit to request for fetching the current query string */}
      <button onClick={() => queryFetch(userQuery)}>
        <img src={imgSearch} alt="saerch" />
      </button>
    </div>
  );
}
