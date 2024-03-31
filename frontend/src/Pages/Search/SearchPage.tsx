import React, { useEffect, useState } from "react";
import { SearchRecipesByNeutralLanguage } from "../../SpoonacularAPI/recipe";
import { SearchRecipe } from "../../SpoonacularAPI/api";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";

type Props = {};

const SearchPage = (props: Props) => {
  const params = useParams<{ naturalLanguage: string }>();
  const [searchResults, setSearchResult] =
    useState<SearchRecipesByNeutralLanguage>();
  const [serverError, setServerError] = useState<string>("");
  const numberOfRecipesToCall = 12;

  const loadMoreRecipes = async () => {
    const recipesToSkip = searchResults?.offset
      ? searchResults?.offset + numberOfRecipesToCall
      : numberOfRecipesToCall;
    const result = await SearchRecipe(
      params.naturalLanguage,
      numberOfRecipesToCall,
      recipesToSkip
    );
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.results)) {
      if (searchResults !== undefined) {
        const newValue: SearchRecipesByNeutralLanguage = {
          number: searchResults.number + result.number,
          offset: searchResults.offset + result.offset,
          results: searchResults.results.concat(result.results),
          totalResults: result.totalResults,
        };
        setSearchResult(newValue);
      }
    }
  };

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
    <div className="flex flex-col items-center">
      <h1>
        {params.naturalLanguage &&
          params.naturalLanguage?.charAt(0).toLocaleUpperCase() +
            params.naturalLanguage?.slice(1)}{" "}
        recipes
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center align-middle w-[1100px]">
          {serverError ? (
            <h1>{serverError}</h1>
          ) : searchResults && searchResults.results.length > 0 ? (
            searchResults.results.map((searchResult) => (
              <Card
                key={searchResult.id}
                image={searchResult.image}
                recipeName={searchResult.title}
                id={searchResult.id}
                css="m-5"
              />
            ))
          ) : (
            <h1>No Results</h1>
          )}
        </div>
      </div>
      <button
        className="bg bg-buttonColor my-20 w-80 h-24 rounded-2xl"
        onClick={loadMoreRecipes}
      >
        Load more recipes
      </button>
    </div>
  );
};

export default SearchPage;
