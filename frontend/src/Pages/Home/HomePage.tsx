import React, { useEffect, useState } from "react";
import { GetRandomRecipe } from "../../SpoonacularAPI/api";
import { RandomRecipe } from "../../SpoonacularAPI/recipe";
import Slider from "react-slick";
import Card from "../../Components/Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

const HomePage = (props: Props) => {
  const [serverError, setServerError] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RandomRecipe>();

  useEffect(() => {
    const getRandomRecipe = async () => {
      const result = await GetRandomRecipe();
      console.log(result);
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.recipes)) {
        setSearchResults(result);
      }
    };
    getRandomRecipe();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className="w-[1300px]">
      <Slider {...settings} className="">
        {serverError ? (
          <h1>{serverError}</h1>
        ) : searchResults && searchResults.recipes.length > 0 ? (
          searchResults.recipes.map((searchResult) => (
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
      </Slider>
    </div>
  );
};

export default HomePage;
