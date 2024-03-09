import React from "react";
import Card from "./Card";
import { SearchRecipesByNeutralLanguage } from "../recipe";
import { SearchRecipe } from "../api";

interface Props {
  searchResult: SearchRecipesByNeutralLanguage;
}

const CardList = ({ searchResult }: Props) => {
  return (
    <div className="flex flex-row flex-wrap justify-center align-middle">
      {searchResult.results.length > 0 ? (
        searchResult.results.map((result) => (
          <Card
            key={result.id}
            image={result.image}
            recipeName={result.title}
            id={result.id}
          />
        ))
      ) : (
        <h1>No Results</h1>
      )}
    </div>
  );
};

export default CardList;
