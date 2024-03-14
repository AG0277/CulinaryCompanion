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
            />
          ))
        ) : (
          <h1>No Results</h1>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
