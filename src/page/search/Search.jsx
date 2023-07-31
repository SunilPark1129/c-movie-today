import React from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";

export default function Search() {
  return (
    <main>
      <Aside />
      <MovieLists />
    </main>
  );
}
