import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import SliderComponent from "./SliderComponent";
import RecommendedRecipes from "./RecommendedRecipes";
import { FavoritesProvider } from "../../Hooks/useFavorite";
import Comments from "../../Components/Comment/Comments";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <div className="bg-yellowIsh flex  justify-center items-start">
        <div className="w-[1300px]">
          <h1 className="my-10">Welcome to Culinary Companion</h1>
          <h5 className="w-fit font-bold border-b-4 border-orangeIsh">
            Discover our latest creations
          </h5>
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
