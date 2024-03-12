import { createBrowserRouter } from "react-router-dom";
import RecipePage from "../Pages/Recipe/RecipePage";
import App from "../App";

import SearchPage from "../Components/Navbar/Search/Search";
import HomePage from "../Pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "search/:naturalLanguage",
        element: <SearchPage />,
      },
      {
        path: "recipe/:recipeId",
        element: <RecipePage />,
      },
    ],
  },
]);
