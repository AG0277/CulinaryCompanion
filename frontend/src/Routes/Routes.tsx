import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../Pages/SearchPage";
import RecipePage from "../Pages/RecipePage";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <SearchPage />,
      },
      {
        path: "recipe/:recipeId",
        element: <RecipePage />,
      },
    ],
  },
]);
