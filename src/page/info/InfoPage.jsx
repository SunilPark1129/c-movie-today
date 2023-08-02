import React from "react";
import logo from "../../assets/main_logo.png";
import "../styles/info.css";

export default function InfoPage() {
  return (
    <main className="info">
      <header>
        <h1>Information</h1>
      </header>
      <div>
        <section>
          <h3>About us</h3>
          <div>
            <p>
              Cinema Movie is a site that allows users to easily search for and
              recommend movies. You can search directly by movie title, or it
              recommends 20 famous movies by genre through the pre-prepared
              feature.
            </p>
            <p>
              Before you watch a movie, look for a movie in Cinema Movie first.
              We provide users with a movie's rating, release date, poster and
              overview. We update from old movies to newest movies and provide
              listings of all types.
            </p>
          </div>
        </section>
        <div className="dot"></div>
        <section className="info__contact">
          <h3>Contact</h3>
          <div>
            <p>Ciname Movie project is created by Sunil Park</p>
            <p>
              If you have any question, you are free to contact through via
              email
            </p>
            <p>sunilpark1129@gmail.com</p>
          </div>
        </section>
        <div className="dot"></div>
        <section>
          <h3>Application Programming Interface</h3>
          <div className="info__img-box">
            <img src={logo} alt="cinema movie logo" width={60} />
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              alt="the movie db logo"
              width={60}
            />
          </div>
          <div>
            <p>
              We used all information related to movies by importing from The
              Movie Database (TMDB). Popular movies, votes and revenue are all
              information provided by TMDB's standards. Movie posts, release
              date and overview were also taken from TMDB. Other than importing
              information, we have not added our personal thoughts or additional
              content about the movie information. We would like to inform that
              we received the license key from TMDB and used it for Current
              Movie.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
