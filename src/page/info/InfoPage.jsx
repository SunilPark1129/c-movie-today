import React from "react";
import logo from "../../assets/main_logo.png";

export default function InfoPage() {
  return (
    <main>
      <section>
        <h3>Information</h3>
        <div>
          <p>
            Cinema Movie is a site that allows users to easily search for and
            recommend movies. You can search directly by movie title, or it
            recommends 20 famous movies by genre through the pre-prepared
            feature.
          </p>
          <p>
            Before you watch a movie, look for a movie in Cinema Movie first. We
            provide users with a movie's rating, release date, poster and
            overview. We update from old movies to newest movies and provide
            listings of all types.
          </p>
        </div>
      </section>
      <section>
        <h3>Features</h3>
        <div>
          <p>
            If you can't remember the exact title name, try entering the letters
            one by one, and you'll be able to find the relevant title under the
            search bar.
          </p>
          <p>
            You can also search by the original language title of the movie.
          </p>
          <p>
            For more movie results, scroll all the way down to bring more movie
            lists.
          </p>
          <p>
            You can view history list that you searched movies in the search
            section. History is automatically deleted when you leave the
            website.
          </p>
        </div>
      </section>
      <section>
        <h3>Contact</h3>
        <div>
          <p>Ciname Movie project is created by Sunil Park.</p>
          <p>
            If you have any question, you are free to contact through via email.
          </p>
          <p>sunilpark1129@gmail.com</p>
        </div>
      </section>
      <section>
        <h3>Application Programming Interface</h3>
        <img src={logo} alt="cinema movie logo" width={60} />
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="the movie db logo"
          width={60}
        />
        <div>
          <p>
            We use all information related to movies by importing from The Movie
            Database (TMDB). Popular movies, votes and revenue are all
            information provided by TMDB's standards. Movie posts, release date
            and overview were also taken from TMDB. Other than importing
            information, we have not added our personal thoughts or additional
            content about the movie information. We would like to inform that we
            received the license key from TMDB and used it for Current Movie.
          </p>
        </div>
      </section>
    </main>
  );
}
