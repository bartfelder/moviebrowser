export const createSearchMovieQuery = (searchTerm: string) => `
query searchMovies {
  movies: searchMovies(
    query: "${searchTerm}"
  ) {
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