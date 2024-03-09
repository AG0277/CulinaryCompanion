export interface SearchRecipes {
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
