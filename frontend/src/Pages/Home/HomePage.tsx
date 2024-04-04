import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import RecommendedRecipes from "./RecommendedRecipes";
import BackGroundImage from "../../Images/HomepageBackground1.webp";
import ChefCooking from "../../Images/chefCooking.webp";
import { useRef } from "react";

type Props = {};

const HomePage = (props: Props) => {
  const elementRef = useRef<HTMLHeadingElement>(null);

  const handleClick = () => {
    if (elementRef.current) {
      const scrollOffset = elementRef.current?.offsetTop - 200;
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div
        className=" relative flex justify-center items-end max-h-[86vh] pb-[-5] hover:cursor-pointer "
        onClick={handleClick}
      >
        <div className="">
          <img
            src={BackGroundImage}
            alt=""
            className="w-screen hover:cursor-pointer "
          />
        </div>

        <div className="round absolute  mb-20 ">
          <div id="cta">
            <span className="arrow primera next "></span>
            <span className="arrow segunda next "></span>
          </div>
        </div>
      </div>

      <div className="bg-yellowIsh overflow-x-hidden">
        <div className="bg-yellowIsh flex mx-20 mb-20 justify-center items-start">
          <div className="xl:w-[1376px] lg:w-[700px] sm:w-[400px] ">
            <h1
              className="sm:text-4xl lg:text-5xl my-10 text-5xl font-display"
              ref={elementRef}
            >
              Welcome to Culinary Companion
            </h1>
            <h3 className="w-fit font-bold border-b-4 border-orangeIsh mt-20 mb-1">
              Discover our latest creations
            </h3>
            {/* <SliderComponent /> */}
            <RecommendedRecipes />

            <div className="flex flex-wrap justify-evenly ">
              <p className="font-display w-[600px] text-lg mb-10">
                My name is John Smith, I have been professional cook for 15
                years at the finest restaurants in Europe and Asia. As a
                seasoned chef with a deep passion for culinary creativity, I
                decided to launch a website dedicated to sharing my love for
                cooking with the world. Through this platform, I aim to inspire
                fellow food enthusiasts to explore the art of gastronomy and
                experiment with flavors in their own kitchens. My recipes,
                crafted with care and attention to detail, reflect my commitment
                to using fresh, high-quality ingredients and infusing
                traditional dishes with innovative twists. I hope to foster a
                love for cooking and empower others to discover the joy of
                creating delicious meals from scratch.
              </p>
              <img
                src={ChefCooking}
                alt=""
                className="w-full h-full max-w-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
