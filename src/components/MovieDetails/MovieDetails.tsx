import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ModalContext } from "../../contexts/ModalContext";
import {
  MovieDetailContext,
  MovieDetailsActionTypes,
  MovieDetailsDispatch,
} from "../../contexts/MovieDetailsContext";
import { WikiQueryResult, OmdbQueryResult } from "../../utils/types";
import {
  generateImdbUrl,
  generateOmdbQuery,
  generateWikiQuery,
  generateWikiUrl,
} from "../../utils/generateUrl";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { MovieSearchContext } from "../../contexts/MovieSearchContext";

const MovieDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const { setSearchTerm } = useContext(MovieSearchContext);
  const movieDetails = useContext(MovieDetailContext);
  const dispatch = useContext(MovieDetailsDispatch);

  useEffect(() => {
    if (movieDetails.name) {
      const getMovieData = async () => {
        try {
          const wikiResponse = await axios.get<WikiQueryResult>(
            generateWikiQuery(movieDetails.name)
          );

          const omdbResponse = await axios.get<OmdbQueryResult>(
            generateOmdbQuery(
              movieDetails.name,
              new Date(movieDetails.releaseDate).getFullYear()
            )
          );

          const ImdbId = omdbResponse.data.imdbID;
          const imdbLink = generateImdbUrl(ImdbId);

          const wikiPageInfo =
            wikiResponse.data.query.search.find(
              (page) => page.title === `${movieDetails.name} (film)`
            ) ||
            wikiResponse.data.query.search.find(
              (page) => page.title === `${movieDetails.name}`
            );

          const summary = wikiPageInfo?.snippet;
          const wikiLink = generateWikiUrl(wikiPageInfo?.pageid || 0);

          dispatch({
            type: MovieDetailsActionTypes.SET_EXTENDED_DETAILS,
            movie: {
              summary,
              wikiLink,
              imdbLink,
            },
          });
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setIsLoading(false);
        }
      };
      getMovieData();
    }
  }, [movieDetails.name]);

  const handleClose = () => setIsOpen(false);
  const handleRelatedClick = () => {
    setIsOpen(false);
    setSearchTerm(`related:${movieDetails.name}`);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {movieDetails.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <span
                dangerouslySetInnerHTML={{ __html: movieDetails.summary }}
              ></span>
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                padding: 3,
              }}
            >
              <Button
                variant="contained"
                href={movieDetails.wikiLink}
                target="_blank"
              >
                Wiki
              </Button>
              <Button
                variant="contained"
                href={movieDetails.imdbLink}
                target="_blank"
              >
                IMDB
              </Button>
              <Button variant="contained" onClick={handleRelatedClick}>
                Related Movies
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MovieDetails;
