import React from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";
import "../styles/main.css";
import { Helmet } from "react-helmet";
export default function Main() {
  return (
    <main className="main">
      <Helmet>
        <title>C Movie Today | See Movie Information Today</title>
        <meta
          name="description"
          content="C Movie Today | Your Cinematic Companion: The ultimate destination for film enthusiasts. Unleash the power of movie information, get a taste of the latest releases, and gauge public sentiment."
        />
        <meta
          name="keywords"
          content="Movie Information, Film Reviews, Cinema Ratings, Latest Releases, Movie Insights, Film Culture, Movie Overview, Movie Summary, Reviews, Recommended Movies"
        />
      </Helmet>
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
