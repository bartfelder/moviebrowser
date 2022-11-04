import { useContext, useEffect } from "react";
import { useQuery } from "urql";
import List from "@mui/material/List";
import { MovieSearchContext } from "../../contexts/MovieSearchContext";
import { PopularMovieQuery } from "../../requestHandlers/graphQL/popularMovies";
import { MovieData } from "../../utils/types";
import MovieListItem from "../MovieListItem/MovieListItem";
import { createRelatedMoviesQuery } from "../../requestHandlers/graphQL/searchRelatedMovies";
import { createSearchMovieQuery } from "../../requestHandlers/graphQL/searchMovies";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface RawMovies {
  data?: {
    movies: MovieData[];
  };
}

interface RawSimilarMovies {
  data?: SimilarMovies;
}

interface SimilarMovies {
  movies: Array<{ similar: MovieData[] }>;
}

type RawData = RawMovies | RawSimilarMovies;

const MovieList = () => {
  const { searchTerm } = useContext(MovieSearchContext);
  let query;

  if (!searchTerm) {
    query = PopularMovieQuery;
  } else if (/^related:/.test(searchTerm)) {
    query = createRelatedMoviesQuery(searchTerm.slice(8));
  } else {
    query = createSearchMovieQuery(searchTerm);
  }

  const [response, reexecuteQuery] = useQuery({
    query,
  });

  useEffect(() => {
    reexecuteQuery();
  }, [searchTerm]);

  const { fetching, error } = response;

  if (fetching)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: '80vh', alignItems: 'center' }}>
        <LoadingIndicator />
      </Box>
    );
  if (error)
    return <Typography variant="h4">Oh, no... {error.message}</Typography>;

  const { data }: RawData = response;
  const movieList = /^related:/.test(searchTerm)
    ? (data as SimilarMovies).movies[0].similar
    : (data?.movies as MovieData[]);

  return (
    <List>
      {movieList &&
        movieList.map(({ id, name, genres, releaseDate, score }) => {
          return (
            <MovieListItem
              key={id}
              id={id}
              name={name}
              genres={genres}
              releaseDate={releaseDate}
              score={score}
            />
          );
        })}
    </List>
  );
};

export default MovieList;
