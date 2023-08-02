import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/errorpage.css";

export default function ErrorPage() {
  const navigate = useNavigate();

  function clickHandler() {
    navigate("/");
  }

  return (
    <section className="error-page">
      <header>
        <h3>ErrorPage: 404</h3>
        <p>Uh oh . . . wrong address</p>
      </header>
      <button onClick={clickHandler}>Go back</button>
    </section>
  );
}
