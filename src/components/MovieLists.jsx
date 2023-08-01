import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { requestFetch } from "../redux/reducers/movieFetchReducer";
import { setMovie } from "../redux/reducers/selectedReducer";
import useObserver from "../hooks/useObserver";
import MovieRecommend from "./MovieRecommend";
import MovieModal from "./MovieModal";
import Loading from "./Loading";
import { FetchError, SearchFrontPage, ListEmpty } from "./CatchPage";

import { useLists, useSelected } from "../hooks/useReducer";

// display movie per page
function DisplayLists() {
  const { data, lists } = useLists();

  if (lists[0]?.movies.length !== 0) {
    // making another components to find and set the ref into last element
    return lists.map(({ movies, page }) => (
      <div className="lists__content" key={page}>
        <Lists
          movies={movies}
          page={lists[lists.length - 1].page + 1}
          totalPage={data.total_pages}
        />
      </div>
    ));
  } else {
    return <ListEmpty />;
  }
}

// display movie poster
function Lists({ totalPage, movies, page }) {
  const dispatch = useDispatch();
  // get last movie element
  const lastRef = useRef(null);

  // IntersectionObserver has been used
  // if scroll position is reached the last movie item, boolean true
  const isVisible = useObserver(lastRef, { threshold: 0.5 });

  useEffect(() => {
    if (isVisible) {
      if (totalPage >= page) {
        dispatch(
          requestFetch({
            url: null,
            currentPage: `&page=${page}&`,
          })
        );
      }
    }
  }, [isVisible]);

  function movieClickHandler(target) {
    dispatch(setMovie(target));
  }

  // set ref in the last index of movie to set the IntersectionObserver
  return movies.map(
    (
      { id, title, poster_path, release_date, vote_average, backdrop_path },
      idx
    ) => {
      return (
        <div
          className="lists__item"
          key={id}
          ref={idx === 19 ? lastRef : null}
          onClick={() => movieClickHandler(movies[idx])}
        >
          {poster_path || backdrop_path ? (
            <img
              src={
                "https://image.tmdb.org/t/p/w500/" +
                (poster_path || backdrop_path)
              }
              alt={title}
            />
          ) : (
            <div>No image</div>
          )}
          <div className="lists__item__text-box">
            <p>{title}</p>
            <p>{release_date ? release_date.replace(/-/g, "/") : "??"}</p>
            <p>
              <span>&hearts;</span> {vote_average}
            </p>
          </div>
        </div>
      );
    }
  );
}

// a component for displaying movie items
export default function MovieLists() {
  const { lists, isLoading, error } = useLists();
  const { selectedMovie, currentLocation } = useSelected();

  return (
    <div className="lists">
      <div className="lists__display">
        {!error &&
          lists.length === 0 &&
          !isLoading &&
          currentLocation === "search" && <SearchFrontPage />}

        {/* display fetched movie items */}
        {!error && lists.length !== 0 && (
          <>
            <MovieRecommend />
            <DisplayLists />
          </>
        )}

        {/* fetch error */}
        {error && <FetchError />}

        {/* is loading */}
        {isLoading && <Loading />}
      </div>

      {/* display selected movie content */}
      {selectedMovie && <MovieModal />}

      {/* edge radius border for styling */}
      <div className="border">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
