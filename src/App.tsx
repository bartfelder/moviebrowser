import Header from "./components/Header/Header";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MovieList from "./components/MovieList/MovieList";
import { ModalProvider } from "./contexts/ModalContext";
import { MovieDetailProvider } from "./contexts/MovieDetailsContext";
import { MovieSearchContextProvider } from "./contexts/MovieSearchContext";

const App = () => {
  return (
    <MovieDetailProvider>
      <MovieSearchContextProvider>
        <ModalProvider>
          <Header />
          <MovieList />
          <MovieDetails />
        </ModalProvider>
      </MovieSearchContextProvider>
    </MovieDetailProvider>
  );
};

export default App;
