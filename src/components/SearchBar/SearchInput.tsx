import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default SearchInput;
