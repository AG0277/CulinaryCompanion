import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Card from "../../../Components/Card/Card";
import { GetRandomRecipe } from "../../../SpoonacularAPI/api";
import { RandomRecipe } from "../../../SpoonacularAPI/recipe";
import "./SliderComponent.css";

type Props = {};

const SliderComponent = (props: Props) => {
  const [serverError, setServerError] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RandomRecipe>();
  const slider = useRef<Slider>(null);

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
    arrows: false,
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
    <div className="relative">
      <div className="absolute right-0 top-1/2 z-50">
        <div className="arrow" onClick={() => slider?.current?.slickNext()}>
          <div className="arrow-top"></div>
          <div className="arrow-bottom"></div>
        </div>
      </div>
      <div>
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
      <div className="absolute left-0 top-1/2 z-50  ">
        <div
          className="arrow "
          style={{
            transform: "scaleX(-1)",
            marginTop: "-2rem",
          }}
          onClick={() => slider?.current?.slickPrev()}
        >
          <div className="arrow-top"></div>
          <div className="arrow-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
