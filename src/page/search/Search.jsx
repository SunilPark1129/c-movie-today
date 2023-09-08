import React from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";
import Tip from "./Tip";
import { Helmet } from "react-helmet";

export default function Search() {
  return (
    <main className="search">
      <Helmet>
        <title>C Movie Today | Search</title>
        <meta
          name="description"
          content="C Movie Today | Your ultimate destination for movie enthusiasts. Discover and explore a vast collection of films, reviews, ratings, and more on our movie search platform. Stay updated with the latest in the world of cinema."
        />
        <meta
          name="keywords"
          content="C Movie Today, movie search, film search, movie reviews, movie ratings, cinema, entertainment, latest films"
        />
      </Helmet>
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
