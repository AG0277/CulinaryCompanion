namespace api.Dtos.Recipe
{
    public class CreateRecipeDto
    {
        public int spoonacularRecipeId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
