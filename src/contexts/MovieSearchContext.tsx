import { createContext, useState, ReactNode } from "react";

interface MovieSearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const defaultMovieSearchContext = {
  searchTerm: "",
  setSearchTerm: () => {},
};

export const MovieSearchContext = createContext<MovieSearchContextType>(
  defaultMovieSearchContext
);

interface MovieSearchContextProviderProps {
  children: ReactNode;
}

export const MovieSearchContextProvider = ({ children }: MovieSearchContextProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MovieSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </MovieSearchContext.Provider>
  );
};
