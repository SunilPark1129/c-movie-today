import React from "react";
import imgEmpty from "../assets/empty.svg";
import imgPopcorn from "../assets/popcorn.svg";
import { useLists } from "../hooks/useReducer";
import "./styles/catchpage.css";

// if found an error during the fetch item, display this content
export function FetchError() {
  const { error } = useLists();
  return (
    <div className="page-announce">
      <div className="apage-announce__text">
        <h3>Fetch Error</h3>
        <ul>
          <li>
            There is something wrong with the <span>connection</span>.
          </li>
          <li>
            You can <span>try later</span>.
          </li>
          <li>
            <span>Error Message</span>: {error}
          </li>
        </ul>
      </div>
      <img src={imgEmpty} alt="man is thinking" />
    </div>
  );
}

// if fetched item is empty, display this content
export function ListEmpty() {
  return (
    <div className="page-announce">
      <div className="page-announce__text">
        <h3>Empty</h3>
        <ul>
          <li>
            We tried to find the movie, but there was{" "}
            <span>no relevant movie</span> available.
          </li>
          <li>
            Maybe, try to find the <span>typo</span>.
          </li>
          <li>
            <span>Contact us</span> if you have any question.
          </li>
        </ul>
      </div>
      <img src={imgEmpty} alt="man is thinking" />
    </div>
  );
}

// Front page for Search page
export function SearchHomePage() {
  return (
    <article className="page-announce">
      <div className="page-announce__text">
        <h3>Search</h3>
        <ul>
          <li>
            You can <span>quickly</span> and <span>easily</span> search for
            movie titles.
          </li>
          <li>
            We have provided assistance with <span>related search terms</span>{" "}
            when searching for titles.
          </li>
          <li>
            A <span>searched history</span> is generated at the bottom of the
            search bar, allowing you to revisit the searched content at any
            time.
          </li>
          <li>
            The history record will <span>disappear</span> once you leave this
            website.
          </li>
          <li>
            You can also search in <span>your language</span> other than English
            as well.
          </li>
        </ul>
      </div>
      <img src={imgPopcorn} alt="popcorn" />
    </article>
  );
}
