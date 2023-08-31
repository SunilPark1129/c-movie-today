import React from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";
import Tip from "./Tip";

export default function Search() {
  return (
    <main className="search">
      <Aside />
      <article className="lists">
        <div className="lists__header-box">
          <h1>Search Movie</h1>
          <p>
            Find various movie information from old movies to recent movies by
            searching movie titles.
          </p>
        </div>
        <Tip />
        <MovieLists />
        <div className="border">
          <div></div>
          <div></div>
        </div>
      </article>
    </main>
  );
}
