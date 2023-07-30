import React from "react";
import Aside from "./Aside";
import MovieLists from "../../components/MovieLists";

export default function Main() {
  return (
    <main>
      <Aside />
      <MovieLists />
    </main>
  );
}
