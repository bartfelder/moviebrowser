import { ReactNode } from "react";
import { MovieDetails } from "../utils/types";

export interface ModalContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MovieDetailsAction {
  type: MovieDetailsActionTypes;
  movie: Partial<MovieDetails>;
}

export enum MovieDetailsActionTypes {
  SET_BASE_DETAILS,
  SET_EXTENDED_DETAILS,
}

export interface MovieSearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProviderProps {
  children: ReactNode;
}
