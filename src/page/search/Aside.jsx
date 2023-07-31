import React, { useState, useEffect } from "react";
import {
  requestFetch,
  movieListClear,
  queryListClear,
  historyListClear,
  historyAdd,
} from "../../redux/reducers/movieFetchReducer";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";

export default function Aside() {
  const [userQuery, setUserQuery] = useState("");
  const dispatch = useDispatch();

  // get move list (limit: 5 items)
  const { isLoading, queries, histories } = useSelector(
    (state) => state.movieFetchReducer
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
      dispatch(
        requestFetch({ url: URL, currentPage: "&page=1&", isQuery: true })
      );
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

  // title click
  function queryClickHandler(title) {
    setUserQuery("");
    dispatch(movieListClear());
    const URL = `/search/movie?query=${encodeURIComponent(title)}&`;
    dispatch(historyAdd(title));

    // request another datas to display movie lists
    dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));
  }

  function historyRemoveClickHandler(title) {
    dispatch(historyListClear(title));
  }

  return (
    <aside>
      <label htmlFor="">Search</label>
      <input type="text" value={userQuery} onChange={queryChangeHandler} />
      <div>
        {histories.length !== 0
          ? histories.map((title) => (
              <div key={title}>
                <p>{title}</p>
                <button onClick={() => historyRemoveClickHandler(title)}>
                  X
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
                <p key={id} onClick={() => queryClickHandler(title)}>
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
