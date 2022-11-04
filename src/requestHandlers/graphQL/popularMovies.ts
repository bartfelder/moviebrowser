export const PopularMovieQuery = `
query fetchPopular {
  movies: popularMovies {
    id
    name
    score
    genres {
      name
    }
    releaseDate
  }
}
`;