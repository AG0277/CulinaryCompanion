import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GetRandomRecipe, SearchRecipe } from "../../SpoonacularAPI/api";
import { SearchRecipesByNeutralLanguage } from "../../SpoonacularAPI/recipe";
import Card from "../../Components/Card/Card";
import { useLocation } from "react-router";

type Props = {};

const SearchRecipesPage = (props: Props) => {
  const params = useParams<{ queryTags: string }>();
  const [searchResults, setSearchResult] =
    useState<SearchRecipesByNeutralLanguage>();
  const [serverError, setServerError] = useState<string>("");
  const numberOfRecipesToCall = 21;
  const location = useLocation();
  const firstQueryParam = useRef<string>("");
  const secondQueryParam = useRef<string>("");

  const getParams = async () => {
    const queryParams = new URLSearchParams(location.search);
    const cuisineParam = queryParams.get("cuisine");
    const dietParam = queryParams.get("diet");
    const meatParam = queryParams.get("meatType");

    if (cuisineParam) {
      secondQueryParam.current = `&cuisine=${cuisineParam}`;
      firstQueryParam.current = "";
    } else if (dietParam) {
      secondQueryParam.current = `&diet=${dietParam}`;
      firstQueryParam.current = "";
    } else if (meatParam) {
      firstQueryParam.current = `${meatParam}`;
      secondQueryParam.current = "";
    }
  };
  const loadMoreRecipes = async () => {
    const recipesToSkip = searchResults?.offset
      ? searchResults?.offset + numberOfRecipesToCall
      : numberOfRecipesToCall;
    const result = await SearchRecipe(
      firstQueryParam.current,
      numberOfRecipesToCall,
      recipesToSkip,
      secondQueryParam.current
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
      getParams();
      const result = await SearchRecipe(
        firstQueryParam.current,
        21,
        0,
        secondQueryParam.current
      );
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.results)) {
        setSearchResult(result);
      }
    };

    getRecipes();
  }, [params]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>
        {params.queryTags &&
          params.queryTags?.charAt(0).toLocaleUpperCase() +
            params.queryTags?.slice(1)}{" "}
        recipes
      </h1>
      <div className="flex flex-wrap justify-center w-[1100px] ">
        {serverError ? (
          <h1>{serverError}</h1>
        ) : searchResults && searchResults.results.length > 0 ? (
          <>
            {searchResults.results.map((searchResult) => (
              <Card
                key={searchResult.id}
                image={searchResult.image}
                recipeName={searchResult.title}
                id={searchResult.id}
              />
            ))}
          </>
        ) : (
          <h1>No Results</h1>
        )}
      </div>
      <button
        className="bg bg-greenIsh my-20 w-80 h-24 rounded-2xl"
        onClick={loadMoreRecipes}
      >
        Load more recipes
      </button>
    </div>
  );
};

export default SearchRecipesPage;
