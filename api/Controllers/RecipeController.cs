using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recipe;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
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


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var recipe = new Recipe
            {
                Image = "asdas",
                Title = "asdas",
                IdSpoonacular = 2,
                Id = 1
        };
            return Ok(recipe);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateRecipeDto recipeDto )
        {

            var recipe = new Recipe
            {
                IdSpoonacular =recipeDto.spoonacularRecipeId,
                Title = recipeDto.Title,
                Image = recipeDto.Image
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
            return Ok(recipe);
        }
    }
}
