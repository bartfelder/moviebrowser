import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" component="h1" padding={2}>
            MovieBrowser
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ alignSelf: "center" }}>
          <SearchBar />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
