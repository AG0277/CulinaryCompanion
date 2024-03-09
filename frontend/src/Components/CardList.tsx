import React from "react";
import Card from "./Card";
import { SearchRecipes } from "../recipe";
import { SearchRecipe } from "../api";

interface Props {
  searchResult: SearchRecipes;
}

const CardList = ({ searchResult }: Props) => {
  return (
    <div>
      {searchResult.results.length > 0 ? (
        searchResult.results.map((result) => (
          <Card image={result.image} recipeName={result.title} id={result.id} />
        ))
      ) : (
        <h1>No Results</h1>
      )}
    </div>
  );
};

export default CardList;
