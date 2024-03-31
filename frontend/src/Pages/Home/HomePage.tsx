import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import SliderComponent from "./SliderComponent/SliderComponent";
import RecommendedRecipes from "./RecommendedRecipes";
import Comments from "../../Components/Comment/Comments";
import BackGroundImage from "../../Images/HomepageBackground1.webp"

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
              <img src={BackGroundImage} alt="" className=" w-screen h-auto"/>
      <div className="bg-yellowIsh flex  justify-center items-start">
        <div className="w-[1300px]">
          <h1 className="my-10 text-5xl">Welcome to Culinary Companion</h1>
          <h3 className="w-fit font-bold border-b-4 border-orangeIsh mb-1">
            Discover our latest creations
          </h3>
          <SliderComponent />
          <RecommendedRecipes />
          <Comments recipeId={1096087} />
        </div>
      </div>
      <div className="bg-yellowIsh w-full pt-80"></div>
    </>
  );
};

export default HomePage;
