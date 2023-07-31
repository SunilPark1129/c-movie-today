import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestFetch } from "../redux/reducers/movieFetchReducer";
import Loading from "./Loading";
import useObserver from "../hooks/useObserver";

// display error message
function ErrorMessage({ error }) {
  return <p>Error Message: {error}</p>;
}

// display movie lists
function Lists({ movies, page }) {
  const dispatch = useDispatch();
  // get last movie element
  const lastRef = useRef(null);

  // if scroll position is on last movie item become true
  const isVisible = useObserver(lastRef, { threshold: 0.5 });

  useEffect(() => {
    if (isVisible) {
      dispatch(
        requestFetch({
          url: null,
          currentPage: `&page=${page}&`,
        })
      );
    }
  }, [isVisible]);

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
  const { lists, error, isLoading } = useSelector(
    (state) => state.movieFetchReducer
  );

  return (
    <div>
      <div>
        {error ? (
          <ErrorMessage error={error} />
        ) : (
          lists.map(({ movies, page }) => (
            <Lists
              movies={movies}
              page={lists[lists.length - 1].page + 1}
              key={page}
            />
          ))
        )}
        {isLoading ? <Loading /> : null}
      </div>
    </div>
  );
}
