import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestFetch } from "../redux/reducers/movieFetchReducer";
import Loading from "./Loading";

// display error message
function ErrorMessage({ error }) {
  return <p>Error Message: {error}</p>;
}

// display movie lists
function Lists({ movies }) {
  const lastRef = useRef(null);

  // set ref in the last index of movie to set the IntersectionObserver
  return movies.map(
    ({ id, title, poster_path, release_date, vote_average }, idx) => {
      return (
        <div key={id} ref={idx === 19 ? lastRef : null}>
          <img
            src={"https://image.tmdb.org/t/p/w500/" + poster_path}
            alt={title}
            width="200"
          />
          <p>{title}</p>
          <p>{release_date ? release_date.replace(/-/g, "/") : "??"}</p>
          <p>{vote_average}</p>
        </div>
      );
    }
  );
}

export default function MovieLists() {
  // testing -------------
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const { data, lists, error, isLoading } = useSelector(
    (state) => state.movieFetchReducer
  );
  useEffect(() => {
    if (data) {
      dispatch(
        requestFetch({
          url: null,
          currentPage: `&page=${lists[lists.length - 1].page + 1}&`,
        })
      );
    }
  }, [pageNum]);
  // ----------------------

  return (
    <div>
      <button onClick={() => setPageNum((prev) => prev + 1)}>Next Page</button>
      <div>
        {error ? (
          <ErrorMessage error={error} />
        ) : (
          lists.map(({ movies, page }) => <Lists movies={movies} key={page} />)
        )}
        {isLoading ? <Loading /> : null}
      </div>
    </div>
  );
}
