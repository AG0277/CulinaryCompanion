export interface MealCategory {
  title: string;
  foods: FoodItem[];
}
export interface FoodItem {
  recipeName: string;
  image: string;
  id: number;
}
export const homeRecipeData = [
  {
    title: "Breakfast",
    foods: [
      {
        recipeName: "Berry Banana Breakfast Smoothie",
        image: "https://spoonacular.com/recipeImages/715497-556x370.jpg",
        id: 715497,
      },
      {
        recipeName: "Mushroom Goat Cheese Baked Eggs",
        image: "https://spoonacular.com/recipeImages/782619-556x370.png",
        id: 782619,
      },
      {
        recipeName: "Cocoa Protein Pancakes",
        image: "https://spoonacular.com/recipeImages/157259-556x370.jpg",
        id: 157259,
      },
      {
        recipeName: "Mushroom Crepes with Vegetarian Sauce",
        image: "https://spoonacular.com/recipeImages/652651-556x370.jpg",
        id: 652651,
      },
    ],
  },
  {
    title: "Beef",
    foods: [
      {
        recipeName: "Ground Beef Street Tacos",
        image: "https://spoonacular.com/recipeImages/1505411-556x370.jpg",
        id: 1505411,
      },
      {
        recipeName: "Curry Beef Over Rice Noodles",
        image: "https://spoonacular.com/recipeImages/641111-556x370.jpg",
        id: 641111,
      },
      {
        recipeName: "Baked Sirloin Steak",
        image: "https://spoonacular.com/recipeImages/633790-556x370.jpg",
        id: 633790,
      },
      {
        recipeName: "Crock-Pot Beef Ragu with Penne and Ricotta",
        image: "https://spoonacular.com/recipeImages/1096087-556x370.jpg",
        id: 1096087,
      },
    ],
  },
];
