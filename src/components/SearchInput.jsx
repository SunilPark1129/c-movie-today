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
  const hasMounted = useRef(true);
  const containerRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");

  // check either currently user is focusing in input or not
  const [isFocusing, setIsFocusing] = useState(false);

  const { queries, error } = useQueries();

  // everytime rerender when changing the input state
  // debounce is used to prevent web API overload
  const searchTerm = useDebounce(userQuery);

  /* 
    useEffect for hiding the query lists when clicking the 
    outside of the content (execpt for the input tag and the query list)
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
      // when losing the focus, hiding the query list
      setIsFocusing(false);
    }
  }

  // request the query list
  // searchTerm = has been used the debounce with user input
  useEffect(() => {
    if (!hasMounted.current) {
      if (searchTerm)
        if (searchTerm.trim() !== "") {
          dispatch(queryListClear());
          const URL = `/search/movie?query=${encodeURIComponent(searchTerm)}&`;
          dispatch(requestQueryFetch({ url: URL, currentPage: "&page=1&" }));
          setIsFocusing(true);
        } else {
          // clear query when search term is empty
          dispatch(queryListClear());
        }
      else if (searchTerm === "") {
        setIsFocusing(false);
      }
    }
    return () => {
      hasMounted.current = false;
    };
  }, [searchTerm]);

  // request Fetch
  function queryFetch(title) {
    const tempQuery = title;

    navigate("/search");

    // clear all stored states
    dispatch(movieListClear());
    dispatch(queryListClear());

    const URL = `/search/movie?query=${encodeURIComponent(tempQuery)}&`;

    // fetch
    dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));

    // add history in the store
    dispatch(historyAdd(tempQuery));

    // if requesting from aside search bar (not navbar)
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
      queryFetch(userQuery);
    }
  }

  // when clicking the p tag in the query list
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
