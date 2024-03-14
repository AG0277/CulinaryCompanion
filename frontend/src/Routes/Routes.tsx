import { createBrowserRouter } from "react-router-dom";
import RecipePage from "../Pages/Recipe/RecipePage";
import App from "../App";

import SearchPage from "../Pages/Search/SearchPage";
import HomePage from "../Pages/Home/HomePage";
import SearchRecipesPage from "../Pages/Search/SearchRecipesPage";

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
        path: "/:queryTags",
        element: <SearchRecipesPage />,
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
