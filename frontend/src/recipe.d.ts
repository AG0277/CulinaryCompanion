export interface SearchRecipesByNeutralLanguage {
  offset: number;
  number: number;
  results: RecipeInfo[];
  totalResults: number;
}

export interface RecipeInfo {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface SearchFullRecipeById {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: string[]; // This can be adjusted based on the actual structure
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  winePairing: WinePairing;
}

export interface ExtendedIngredient {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: {
    metric: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
    us: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
  };
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export interface getNutrientByRecipeId {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}
