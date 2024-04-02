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
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: false,
    accessibility: true,

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="relative w-auto mb-20">
      <div className="absolute right-[-50px] top-1/3 z-30">
        <div className="arrow" onClick={() => slider?.current?.slickNext()}>
          <div className="arrow-top"></div>
          <div className="arrow-bottom"></div>
        </div>
      </div>
      <div className="block">
        <Slider ref={slider} {...settings}>
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
      <div className="absolute left-[-75px] top-1/3 z-30  ">
        <div
          className="arrow "
          style={{
            transform: "scaleX(-1)",
            marginTop: "-2.1rem",
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
