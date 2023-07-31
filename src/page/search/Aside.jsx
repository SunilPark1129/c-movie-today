import React, { useState, useEffect } from "react";
import {
  requestFetch,
  movieListClear,
} from "../../redux/reducers/movieFetchReducer";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";

export default function Aside() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // get move list (limit: 5 items)
  const titleLists = useSelector((state) => {
    if (state.movieFetchReducer.lists.length !== 0) {
      return state.movieFetchReducer.lists[0].movies.filter((_, idx) => {
        return idx < 4 ? true : false;
      });
    }
    return state.movieFetchReducer.lists;
  });
  const { isLoading } = useSelector((state) => state.movieFetchReducer);

  // a new string after debounced user query
  const searchTerm = useDebounce(query);

  useEffect(() => {
    // debounce is used to prevent web API overload
    if (searchTerm.trim() !== "") {
      const URL = `/search/movie?query=${encodeURIComponent(searchTerm)}&`;
      dispatch(movieListClear());
      dispatch(requestFetch({ url: URL, currentPage: "&page=1&" }));
    } else {
      dispatch(movieListClear());
    }
  }, [searchTerm]);

  // get query from user
  function queryChangeHandler(e) {
    const { value } = e.target;
    setQuery(value);
  }

  return (
    <aside>
      <label htmlFor="">Search</label>
      <input type="text" value={query} onChange={queryChangeHandler} />
      <div>
        {isLoading ? (
          <p>Loading . . .</p>
        ) : titleLists.length !== 0 ? (
          titleLists.map(({ id, title }, idx) => {
            if (idx < 4) {
              return <p key={id}>{title}</p>;
            }
          })
        ) : null}
      </div>
    </aside>
  );
}
