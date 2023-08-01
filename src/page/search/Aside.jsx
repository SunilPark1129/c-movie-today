import React, { useState, useEffect, useRef } from "react";
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

let a;

export default function Aside() {
  const [userQuery, setUserQuery] = useState("");
  const [isFocusing, setIsFocusing] = useState(false);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  // get move list (limit: 5 items)
  const { queries, histories } = useSelector(
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

  // remove targeted history
  function historyRemoveClickHandler(title) {
    dispatch(historyListClear(title));
  }

  function keyDownHandler(e) {
    if (e.keyCode === 13) {
      queryFetch(userQuery);
    }
  }

  function handleDocumentClick(e) {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      // when losing the focus, hiding the query list div
      setIsFocusing(false);
    }
  }

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

  function queryClickHandler(title) {
    queryFetch(title);
    setIsFocusing(false);
  }

  return (
    <aside>
      <h3>Search</h3>
      <div className="dot"></div>

      {/* query input */}
      <div className="search__search-box">
        <div className="search__input-box" ref={containerRef}>
          <input
            type="text"
            value={userQuery}
            onChange={queryChangeHandler}
            onKeyDown={keyDownHandler}
            onFocus={() => setIsFocusing(true)}
          />

          {/* query lists */}
          <div className="search__query-lists">
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
    </aside>
  );
}
