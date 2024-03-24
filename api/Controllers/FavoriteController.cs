using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
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
            var favoriteDto = favorite.Select(s => s.FromFavoriteToFavoriteDto());
            return Ok(favoriteDto);
        }

        [HttpPost]
        [Route("{spoonacularrecipeid}")]
        [Authorize]
        public async Task<IActionResult> Create(int spoonacularrecipeid)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipe = await recipeRepository.GetAsyncBySpoonacularId(spoonacularrecipeid);
            if (recipe == null)
            {
                recipe = await spoonacularAPIService.GetRecipeBySpoonacularId(spoonacularrecipeid);
                if (recipe == null)
                {
                    return NotFound();
                }
            }
            var username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);

            var favorite = new Favorite { AppUserId = user.Id, RecipeId = recipe.Id };
            favoriteRepository.CreateAsync(favorite);

            return CreatedAtAction(
                nameof(GetById),
                new { spoonacularrecipeid = favorite.Recipe.IdSpoonacular },
                favorite.FromFavoriteToFavoriteDto()
            );
        }

        [HttpDelete("{spoonacularrecipeid}")]
        [Authorize]
        public async Task<IActionResult> Delete(int spoonacularrecipeid)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var favoriteToDelete = await favoriteRepository.GetByIdAsync(spoonacularrecipeid);
            if (favoriteToDelete == null)
                return NotFound();
            var username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);

            var admin = await userManager.IsInRoleAsync(user, "admin");
            if (!admin)
            {
                if (favoriteToDelete.AppUser.Id != user.Id)
                    return Unauthorized();
            }
            var favorite = await favoriteRepository.GetByIdAsync(spoonacularrecipeid);
            await favoriteRepository.DeleteAsync(favorite);
            return Ok(favorite.FromFavoriteToFavoriteDto());
        }

        [HttpGet("{spoonacularrecipeid}")]
        [Authorize]
        public async Task<IActionResult> GetById(int spoonacularrecipeid)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var favorite = await favoriteRepository.GetByIdAsync(spoonacularrecipeid);
            if (favorite == null)
                return NotFound();

            return Ok(favorite.FromFavoriteToFavoriteDto());
        }
    }
}
