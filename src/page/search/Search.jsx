import React, { useEffect } from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";
import { useDispatch } from "react-redux";
import { movieListClear } from "../../redux/reducers/movieFetchReducer";
import { setNavigate } from "../../redux/reducers/selectedReducer";

export default function Search() {
  const dispatch = useDispatch();

  // clear all lists when user entered Search page
  useEffect(() => {
    dispatch(movieListClear());
    dispatch(setNavigate("search"));
  }, []);

  console.log("render");

  return (
    <main className="search">
      <Aside />
      <MovieLists />
    </main>
  );
}
