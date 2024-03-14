import React, { useEffect, useState } from "react";
import { GetRandomRecipe } from "../../SpoonacularAPI/api";
import { RandomRecipe } from "../../SpoonacularAPI/recipe";
import Slider from "react-slick";
import Card from "../../Components/Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";

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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <>
      <div className="bg-yellowIsh flex flex-row justify-center items-start">
        <div className="w-[1300px]">
          <h1 className="my-10">Welcome to Culinary Companion</h1>
          <h5 className="w-fit font-bold border-b-4 border-orangeIsh">
            Discover our latest creations
          </h5>
          <Slider {...settings}>
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
      </div>
      <div className="bg-yellowIsh w-full pt-80"></div>
    </>
  );
};

export default HomePage;
