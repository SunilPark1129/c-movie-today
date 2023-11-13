export const getGenre = [
  {
    genreName: "Comedy",
    genreID: "35",
  },
  {
    genreName: "Action",
    genreID: "28",
  },
  {
    genreName: "Adventure",
    genreID: "12",
  },
  {
    genreName: "Animation",
    genreID: "16",
  },
  {
    genreName: "Music",
    genreID: "10402",
  },
  {
    genreName: "TV",
    genreID: "10770",
  },
  {
    genreName: "Drama",
    genreID: "18",
  },
  {
    genreName: "Family",
    genreID: "10751",
  },
  {
    genreName: "Romance",
    genreID: "10749",
  },
  {
    genreName: "Mystery",
    genreID: "9648",
  },
  {
    genreName: "Horror",
    genreID: "27",
  },
  {
    genreName: "Thriller",
    genreID: "53",
  },
  {
    genreName: "Fantasy",
    genreID: "14",
  },
  {
    genreName: "SF",
    genreID: "878",
  },
  {
    genreName: "Documentary",
    genreID: "99",
  },
  {
    genreName: "Crime",
    genreID: "80",
  },
  {
    genreName: "War",
    genreID: "10752",
  },
  {
    genreName: "History",
    genreID: "36",
  },
];

export const sortBy = [
  { sortName: "Popular", sortURL: "/discover/movie?sort_by=popularity.desc&" },
  { sortName: "Voted", sortURL: "/discover/movie?sort_by=vote_count.desc&" },
  { sortName: "Revenue", sortURL: "/discover/movie?sort_by=revenue.desc&" },
];

export const matchGenre = (item) => {
  switch (item) {
    case 35:
      return "Comedy";
    case 28:
      return "Action";
    case 12:
      return "Adventure";
    case 16:
      return "Animation";
    case 10402:
      return "Music";
    case 10770:
      return "TV-Movie";
    case 18:
      return "Drama";
    case 10751:
      return "Family";
    case 10749:
      return "Romance";
    case 9648:
      return "Mystery";
    case 27:
      return "Horror";
    case 53:
      return "Thriller";
    case 14:
      return "Fantasy";
    case 878:
      return "SF";
    case 99:
      return "Documentary";
    case 80:
      return "Crime";
    case 10752:
      return "War";
    case 36:
      return "History";
    case 37:
      return "Western";
    default:
      return "??";
  }
};
