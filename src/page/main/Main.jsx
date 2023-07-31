import React from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";

export default function Main() {
  return (
    <main className="main">
      <Aside />
      <MovieLists />
    </main>
  );
}
