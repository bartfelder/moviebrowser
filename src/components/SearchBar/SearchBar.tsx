import { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchWrapper from "./SearchWrapper";
import SearchInput from "./SearchInput";
import { MovieSearchContext } from "../../contexts/MovieSearchContext";
import Box from "@mui/material/Box";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(MovieSearchContext);
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setCurrentSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleOnChange = (event: { target: { value: string } }) =>
    setCurrentSearchTerm(event.target.value);

  const handleOnClick = () => setSearchTerm(currentSearchTerm);

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === "Enter") handleOnClick();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SearchWrapper>
        <SearchInput
          value={currentSearchTerm}
          onChange={handleOnChange}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onKeyDown={handleEnterKey}
        />
      </SearchWrapper>
      <IconButton onClick={handleOnClick}>
        <SearchIcon color="primary" fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
