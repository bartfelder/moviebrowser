import { styled, alpha } from "@mui/material/styles";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 'auto',
  marginRight: "1rem",
  width: '100%',
  [theme.breakpoints.down("sm")]: {
    margin: "1rem",
  },
}));

export default SearchWrapper;
