using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/favorite")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository favoriteRepository;
        private readonly IRecipeRepository recipeRepository;
        private readonly UserManager<AppUser> userManager;
        private readonly ISpoonacularAPIService spoonacularAPIService;

        public FavoriteController(
            IFavoriteRepository FavoriteRepository,
            IRecipeRepository RecipeRepository,
            ISpoonacularAPIService SpoonacularAPIService,
            UserManager<AppUser> UserManager
        )
        {
            userManager = UserManager;
            favoriteRepository = FavoriteRepository;
            recipeRepository = RecipeRepository;
            spoonacularAPIService = SpoonacularAPIService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);
            var favorite = await favoriteRepository.GetAllAsync(user);
            return Ok(favorite);
        }

        [HttpPost]
        [Route("{recipeid}")]
        [Authorize]
        public async Task<IActionResult> Create(int recipeid)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipe = await recipeRepository.GetAsyncBySpoonacularId(recipeid);
            if (recipe == null)
            {
                recipe = await spoonacularAPIService.GetRecipeBySpoonacularId(recipeid);
                if (recipe == null)
                {
                    return NotFound();
                }
            }
            var username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);

            var favorite = new Favorite { AppUserId = user.Id, RecipeId = recipe.Id };
            favoriteRepository.CreateAsync(favorite);

            return Ok(favorite);
        }

        [HttpDelete("{recipeid}")]
        [Authorize]
        public async Task<IActionResult> Delete(int recipeid)
        {
            return Ok();
        }

        [HttpGet("{recipeid}")]
        [Authorize]
        public async Task<IActionResult> GetById(int recipeid)
        {
            return Ok();
        }
    }
}
