using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace api.Services
{
    public class SpoonacularAPIService : ISpoonacularAPIService
    {
        private readonly HttpClient httpClient;
        private readonly IConfiguration configuration;
        private readonly IRecipeRepository recipeRepository;

        public SpoonacularAPIService(
            HttpClient HttpClient,
            IConfiguration Configuration,
            IRecipeRepository RecipeRepository
        )
        {
            httpClient = HttpClient;
            configuration = Configuration;
            recipeRepository = RecipeRepository;
        }

        public async Task<Recipe> GetRecipeBySpoonacularId(int id)
        {
            try
            {
                var test =
                    $"https://api.spoonacular.com/recipes/{id}/information?apiKey={configuration["SpoonacularKEY"]}";
                var result = await httpClient.GetAsync(test);
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var task = JsonConvert.DeserializeObject(content);
                    // TO DO check if it works
                    if (task == null)
                        return null;
                    var recipe = new Recipe { IdSpoonacular = id };
                    await recipeRepository.CreateAsync(recipe);
                    return recipe;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.Write(e);
                return null;
            }
        }
    }
}
