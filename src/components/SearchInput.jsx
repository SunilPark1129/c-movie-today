import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import imgSearch from "../assets/search.svg";
import "./styles/searchInput.css";
import { useNavigate } from "react-router-dom";

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

export default function SearchInput({ setMenuOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");
  const [hasFocusInput, setHasFocusInput] = useState(false);

  const { queries, error } = useQueries();

  useEffect(() => {
    dispatch(queryListClear());
  }, []);

  // debounce is used to prevent overload the server
  const searchTerm = useDebounce(userQuery);

  // useEffect for hiding the suggested query lists when losing the focus from input
  useEffect(() => {
    document.addEventListener("click", documentClickHandler);

    return () => {
      document.removeEventListener("click", documentClickHandler);
    };
  }, []);

  function documentClickHandler(e) {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setHasFocusInput(false);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      if (searchTerm.trim() !== "") {
        dispatch(queryListClear());
        const PATH = `/search/movie?query=${encodeURIComponent(searchTerm)}&`;
        dispatch(requestQueryFetch({ url: PATH, currentPage: "&page=1&" }));
        setHasFocusInput(true);
      } else {
        // clear query when search term is empty
        dispatch(queryListClear());
      }
    } else if (searchTerm === "") {
      setHasFocusInput(false);
    }
  }, [searchTerm]);

  function fetchAndGetMovieTitle(title) {
    // lastSearchTerm = prevent from request the fetch if user is re-fetching with the last searched query
    if (title.trim() === "") return;
    const URL_PATH = `/search/movie?query=${encodeURIComponent(title)}&`;

    navigate("/search");

    dispatch(movieListClear());
    dispatch(requestFetch({ url: URL_PATH, currentPage: "&page=1&" }));
    dispatch(historyAdd(title));
    setUserQuery(title);

    // while menu trigger is on (mobile only), close the menu after searched
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  }

  // get query from user input value
  function queryChangeHandler(e) {
    const { value } = e.target;
    setUserQuery(value);
  }

  function keyDownHandler(e) {
    if (e.keyCode === 13) {
      fetchAndGetMovieTitle(userQuery);
    }
  }

  // when clicking the p tag in the query list
  function queryClickHandler(title) {
    fetchAndGetMovieTitle(title);
    setHasFocusInput(false);
  }

  return (
    <div className="search__container search__button">
      <div className="search__input-box" ref={containerRef}>
        <input
          type="text"
          value={userQuery}
          onChange={queryChangeHandler}
          onKeyDown={keyDownHandler}
          onClick={() => {
            setHasFocusInput(true);
          }}
        />

        {/* query lists */}
        <div className="search__query-lists">
          {error ? (
            <p style={{ pointerEvents: "none" }}>Fetch Error...</p>
          ) : null}
          {hasFocusInput && queries.length !== 0
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
      <button onClick={() => fetchAndGetMovieTitle(userQuery)}>
        <img src={imgSearch} alt="saerch" />
      </button>
    </div>
  );
}
