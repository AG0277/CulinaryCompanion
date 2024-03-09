import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import RecipePage from "../Pages/RecipePage";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "recipe/:recipeId",
        element: <RecipePage />,
      },
    ],
  },
]);
