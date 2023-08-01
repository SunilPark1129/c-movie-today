import React, { useEffect } from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";

import { useDispatch } from "react-redux";
import { setNavigate } from "../../redux/reducers/selectedReducer";

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavigate("main"));
  }, []);

  return (
    <main className="main">
      <Aside />
      <MovieLists />
    </main>
  );
}
