import React from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";

export default function Main() {
  return (
    <main className="main">
      <Aside />
      <article className="lists">
        <div className="lists__header-box">
          <h1>Movie Lists</h1>
          <p>
            Click on the poster to see various details such as movie posters,
            ratings, overview, and more.
          </p>
        </div>
        <MovieLists />
        <div className="border">
          <div></div>
          <div></div>
        </div>
      </article>
    </main>
  );
}
