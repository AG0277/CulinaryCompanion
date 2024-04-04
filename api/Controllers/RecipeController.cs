using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        private readonly IRecipeRepository recipeRepository;

        public RecipeController(IRecipeRepository RecipeRepository)
        {
            recipeRepository = RecipeRepository;
        }

        [HttpPost]
        [Route("recipeId:int")]
        public async Task<IActionResult> Create(int recipeId, string title,  string image )
        {

            var recipe = new Recipe
            {
                IdSpoonacular = recipeId,
                Title = title,
                Image = image
            };
            var context = new ValidationContext(recipe, serviceProvider: null, items: null);
            var validationResults = new List<ValidationResult>();

            bool isValid = Validator.TryValidateObject(recipe, context, validationResults, true);
            if (!isValid)
            {
                foreach (var validationResult in validationResults)
                {
                    ModelState.AddModelError(validationResult.MemberNames.FirstOrDefault() ?? string.Empty, validationResult.ErrorMessage);
                }
                return BadRequest(ModelState);
            }

            var recipeModel = await recipeRepository.CreateAsync(recipe);
            return Ok(recipeModel);
        }
    }
}
