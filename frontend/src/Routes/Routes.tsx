import { createBrowserRouter } from "react-router-dom";
import RecipePage from "../Pages/RecipePage";
import App from "../App";

import SearchPage from "../Pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
