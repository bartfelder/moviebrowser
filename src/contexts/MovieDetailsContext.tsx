import { createContext, Dispatch, ReactNode, useReducer } from "react";
import type { MovieDetails } from "../utils/types";

const defaultMovieDetails: MovieDetails = {
  name: "",
  imgUrl: "",
  summary: "",
  imdbLink: "",
  wikiLink: "",
  id: "",
  releaseDate: "",
  genres: [],
  score: 0,
};

export const MovieDetailContext =
  createContext<MovieDetails>(defaultMovieDetails);
export const MovieDetailsDispatch = createContext<Dispatch<MovieDetailsAction>>(
  () => {}
);

interface MovieDetailProviderProps {
  children: ReactNode;
}

export enum MovieDetailsActionTypes {
  SET_BASE_DETAILS,
  SET_EXTENDED_DETAILS,
}

interface MovieDetailsAction {
  type: MovieDetailsActionTypes;
  movie: Partial<MovieDetails>;
}

const movieDetailsReducer = (
  movieDetails: MovieDetails,
  action: MovieDetailsAction
): MovieDetails => {
  switch (action.type) {
    case MovieDetailsActionTypes.SET_BASE_DETAILS: {
      if (action.movie.id === movieDetails.id) return { ...movieDetails };
      return {
        ...defaultMovieDetails,
        ...action.movie,
      };
    }
    case MovieDetailsActionTypes.SET_EXTENDED_DETAILS: {
      return {
        ...movieDetails,
        ...action.movie,
      };
    }
  }
};

export const MovieDetailProvider = ({ children }: MovieDetailProviderProps) => {
  const [movieDetails, dispatch] = useReducer(
    movieDetailsReducer,
    defaultMovieDetails
  );

  return (
    <MovieDetailContext.Provider value={movieDetails}>
      <MovieDetailsDispatch.Provider value={dispatch}>
        {children}
      </MovieDetailsDispatch.Provider>
    </MovieDetailContext.Provider>
  );
};
