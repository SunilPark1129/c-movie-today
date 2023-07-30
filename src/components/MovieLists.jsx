import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestFetch } from "../redux/reducers/movieFetchReducer";

export default function MovieLists() {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();

  const { data, isLoading, error, lists } = useSelector((state) => {
    return state.movieFetchReducer;
  });

  useEffect(() => {
    if (data) {
      console.log(data.page + 1);
      dispatch(
        requestFetch({ url: null, currentPage: `&page=${data.page + 1}&` })
      );
    }
  }, [pageNum]);

  return (
    <div>
      <button onClick={() => setPageNum((prev) => prev + 1)}>Next Page</button>
      {error ? (
        <p>Error Message: {error}</p>
      ) : (
        lists.map((items) => {
          return items.map(({ title, id }) => {
            return <p key={id}>{title}</p>;
          });
        })
      )}
      {isLoading ? <p>Loading . . .</p> : null}
    </div>
  );
}
