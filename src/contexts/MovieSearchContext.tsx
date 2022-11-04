import { createContext, useState } from "react";
import { MovieSearchContextType, ProviderProps } from "./contextTypes";

const defaultMovieSearchContext = {
  searchTerm: "",
  setSearchTerm: () => {},
};

export const MovieSearchContext = createContext<MovieSearchContextType>(
  defaultMovieSearchContext
);

export const MovieSearchContextProvider = ({ children }: ProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MovieSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </MovieSearchContext.Provider>
  );
};
