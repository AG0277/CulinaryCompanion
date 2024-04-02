import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GetRandomRecipe, SearchRecipe } from "../../SpoonacularAPI/api";
import { SearchRecipesByNeutralLanguage } from "../../SpoonacularAPI/recipe";
import Card from "../../Components/Card/Card";
import { useLocation, useNavigate } from "react-router";

type Props = {};

const SearchRecipesPage = (props: Props) => {
  const params = useParams<{ queryTags: string }>();
  const [searchResults, setSearchResult] =
    useState<SearchRecipesByNeutralLanguage>();
  const [serverError, setServerError] = useState<string>("");
  const numberOfRecipesToCall = 12;
  const location = useLocation();
  const firstQueryParam = useRef<string>("");
  const secondQueryParam = useRef<string>("");
  const navigate = useNavigate();

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
      const queryParams = new URLSearchParams(location.search);
      const cuisineParam = queryParams.get("cuisine");
      const dietParam = queryParams.get("diet");
      const meatParam = queryParams.get("meatType");
      const mealTypeParam = queryParams.get("mealType");

      if (cuisineParam) {
        secondQueryParam.current = `&cuisine=${cuisineParam}`;
        firstQueryParam.current = "";
      } else if (dietParam) {
        secondQueryParam.current = `&diet=${dietParam}`;
        firstQueryParam.current = "";
      } else if (meatParam) {
        firstQueryParam.current = `${meatParam}`;
        secondQueryParam.current = "";
      } else if (mealTypeParam) {
        secondQueryParam.current = `&type=${dietParam}`;
        firstQueryParam.current = "";
      } else if (params.queryTags == "Favorites") {
        navigate("/favorites");
      }

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

      {serverError ? (
        <h1>{serverError}</h1>
      ) : searchResults && searchResults.results.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center w-[1100px] ">
            {searchResults.results.map((searchResult) => (
              <Card
                key={searchResult.id}
                image={searchResult.image}
                recipeName={searchResult.title}
                id={searchResult.id}
                css="m-5"
              />
            ))}
          </div>
          <button
            className="bg bg-buttonColor my-20 w-80 h-24 rounded-2xl"
            onClick={loadMoreRecipes}
          >
            Load more recipes
          </button>
        </>
      ) : (
        <h1>No Results</h1>
      )}
    </div>
  );
};

export default SearchRecipesPage;
