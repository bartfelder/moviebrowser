export const createRelatedMoviesQuery = (searchTerm: string) => `
query searchMovies {
  movies: searchMovies(
    query: "${searchTerm}"
  ) {
		  similar { 
    	  id
    	  name
    	  score
    	  genres {name}
    	  releaseDate
    }
  }
}
`;
