import { useContext } from "react";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { ModalContext } from "../../contexts/ModalContext";
import type { MovieData } from "../../utils/types";
import { MovieDetailsDispatch } from "../../contexts/MovieDetailsContext";
import { MovieDetailsActionTypes } from "../../contexts/contextTypes";

const MovieListItem = ({ id, name, releaseDate, genres, score }: MovieData) => {
  const { setIsOpen } = useContext(ModalContext);
  const dispatch = useContext(MovieDetailsDispatch);

  const handleClick = () => {
    dispatch({
      type: MovieDetailsActionTypes.SET_BASE_DETAILS,
      movie: {
        id,
        name,
        releaseDate,
        genres,
        score,
      },
    });
    setIsOpen(true);
  };

  return (
    <ListItem disablePadding key={id}>
      <ListItemButton onClick={handleClick}>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="body1">{`${name} [${new Date(
              releaseDate
            ).getFullYear()}]`}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">{`${genres
              .map((a) => a.name)
              .join(", ")}`}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body1">{`${score.toFixed(2)}`}</Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default MovieListItem;
