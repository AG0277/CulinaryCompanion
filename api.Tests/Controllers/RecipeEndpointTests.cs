using api.Dtos.Recipe;
using api.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace api.Tests.Controllers
{
    public class RecipeEndpointTests: ApplicationTestsFactory
    {
        private readonly WebApplicationFactory<Program> factory;

        public RecipeEndpointTests(WebApplicationFactory<Program> factory)
        {
            this.factory = factory;
        }

        [Fact]
        public async void RecipeController_GetBySpoonacularId()
        {
            var client = factory.CreateClient();
            var payload = new CreateRecipeDto
            {
                spoonacularRecipeId = 123,
                Title = "Sample Title",
                Image = "Sample Image URL"
            };
            var response =  await client.PostAsJsonAsync("api/recipe",payload);
           var content = await  response.Content.ReadAsStringAsync();
            var recipe = await response.Content.ReadFromJsonAsync<Recipe>();
            Assert.Equal(response.StatusCode, System.Net.HttpStatusCode.OK);

            /* Assert.NotNull(recipe)*/
            ;
        }
    }
}
