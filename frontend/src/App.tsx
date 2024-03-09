import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList";
import SearchBar from "./Components/SearchBar";
import { SearchRecipes } from "./recipe";
import { SearchRecipe } from "./api";

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResult] = useState<SearchRecipes>();
  const [serverError, setServerError] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  const onClick = async (e: SyntheticEvent) => {
    const result = await SearchRecipe(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.results)) {
      setSearchResult(result);
    }
    console.log(searchResults);
  };
  return (
    <>
      <SearchBar
        onClick={onClick}
        search={search}
        handleChange={handleChange}
      />
      {searchResults && <CardList searchResult={searchResults} />}
    </>
  );
}

export default App;
