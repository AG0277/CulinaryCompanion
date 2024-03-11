import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { SearchRecipesByNeutralLanguage } from "../recipe";
import { SearchRecipe } from "../api";
import SearchBar from "../Components/SearchBar/SearchBar";
import CardList from "../Components/CardList";
import { useParams } from "react-router-dom";

type Props = {};

const SearchPage = (props: Props) => {
  const params = useParams<{ naturalLanguage: string }>();
  const [searchResults, setSearchResult] =
    useState<SearchRecipesByNeutralLanguage>();
  const [serverError, setServerError] = useState<string>("");
  useEffect(() => {
    const getRecipes = async () => {
      const result = await SearchRecipe(params.naturalLanguage!);
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.results)) {
        setSearchResult(result);
      }
    };

    getRecipes();
  }, []);
  return (
    <div>
      {serverError ? (
        <h1>{serverError}</h1>
      ) : (
        searchResults && <CardList searchResult={searchResults} />
      )}
    </div>
  );
};

export default SearchPage;
