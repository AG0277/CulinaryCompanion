import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import SliderComponent from "./SliderComponent/SliderComponent";
import RecommendedRecipes from "./RecommendedRecipes";
import BackGroundImage from "../../Images/HomepageBackground1.webp";
import { useEffect, useRef } from "react";

type Props = {};

const HomePage = (props: Props) => {
  const elementRef = useRef<HTMLHeadingElement>(null);

  const handleClick = () => {
    if (elementRef.current) {
      const scrollOffset = elementRef.current?.offsetTop - 600;
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <img
        src={BackGroundImage}
        alt=""
        className=" w-screen h-auto hover:cursor-pointer"
        onClick={handleClick}
      />
      <div className="bg-yellowIsh">
        <div className="bg-yellowIsh flex mx-20 justify-center items-start">
          <div className="xl:w-[1376px] lg:w-[700px] sm:w-[400px] ">
            <h1 className="my-10 text-5xl" ref={elementRef}>
              Welcome to Culinary Companion
            </h1>
            <h3 className="w-fit font-bold border-b-4 border-orangeIsh mt-20 mb-1">
              Discover our latest creations
            </h3>

            <RecommendedRecipes />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
