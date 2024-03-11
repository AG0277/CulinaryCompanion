// import React, { ChangeEvent, SyntheticEvent, useState } from "react";
// import { SearchRecipesByNeutralLanguage } from "../../recipe";
// import { SearchRecipe } from "../../api";
// import SearchBar from "./SearchBar";
// import CardList from "../CardList";
// import { Link } from "react-router-dom";

type Props = {};

const SearchBarResult = (props: Props) => {
  //   const [search, setSearch] = useState<string>("");
  //   const [searchResults, setSearchResult] =
  //     useState<SearchRecipesByNeutralLanguage>();
  //   const [serverError, setServerError] = useState<string>("");
  //   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     setSearch(e.target.value);
  //     console.log(e);
  //   };
  //   const onSearchSubmit = async (e: SyntheticEvent) => {
  //     e.preventDefault();
  //     const result = await SearchRecipe(search);
  //     if (typeof result === "string") {
  //       setServerError(result);
  //     } else if (Array.isArray(result.results)) {
  //       setSearchResult(result);
  //     }
  //     console.log(searchResults);
  //   };
  //   return (
  //     <div>
  //         <SearchBar
  //           onSearchSubmit={onSearchSubmit}
  //           search={search}
  //           handleSearchChange={handleSearchChange}
  //       />
  //       {searchResults&& <Link to={`/search/:${search}`}></Link>}
  //     </div>
  //   );
};

export default SearchBarResult;
