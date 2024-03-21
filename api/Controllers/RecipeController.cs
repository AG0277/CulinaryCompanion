using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IRecipeRepository recipeRepository;

        public RecipeController(ApplicationDbContext dbContext, IRecipeRepository RecipeRepository)
        {
            db = dbContext;
            recipeRepository = RecipeRepository;
        }

        [HttpPost]
        [Route("recipeId:int")]
        public async Task<IActionResult> Create(int recipeId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipe = new Recipe { IdSpoonacular = recipeId };
            var recipeModel = await recipeRepository.CreateAsync(recipe);
            return Ok(recipeModel);
        }
    }
}
