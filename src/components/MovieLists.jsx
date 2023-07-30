import React from "react";
import { useSelector } from "react-redux";
export default function MovieLists() {
  const data = useSelector((state) => state.movieFetchReducer.data);
  const isLoading = useSelector((state) => state.movieFetchReducer.isLoading);
  const error = useSelector((state) => state.movieFetchReducer.error);

  return (
    <div>
      {error ? (
        <p>Error Message: {error}</p>
      ) : isLoading ? (
        <p>Loading . . .</p>
      ) : (
        data?.results.map(({ title, id }) => {
          return <p key={id}>{title}</p>;
        })
      )}
    </div>
  );
}
