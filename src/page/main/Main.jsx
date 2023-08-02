import React, { useEffect, useRef } from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";

import { useDispatch } from "react-redux";
import { setNavigate } from "../../redux/reducers/selectedReducer";

export default function Main() {
  const dispatch = useDispatch();
  const unmounted = useRef(false);

  useEffect(() => {
    if (unmounted.current) {
      console.log("set navigate main");
      dispatch(setNavigate("main"));
    }
    return () => {
      unmounted.current = true;
    };
  }, []);

  console.log("main rendered");
  return (
    <main className="main">
      <Aside />
      <MovieLists />
    </main>
  );
}
