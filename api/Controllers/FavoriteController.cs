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
using Microsoft.IdentityModel.Tokens;

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
        private readonly IClaimsExtensions claimsExtensions;

        public FavoriteController(
            IFavoriteRepository FavoriteRepository,
            IRecipeRepository RecipeRepository,
            ISpoonacularAPIService SpoonacularAPIService,
            UserManager<AppUser> UserManager, IClaimsExtensions ClaimsExtensions
        )
        {
            userManager = UserManager;
            favoriteRepository = FavoriteRepository;
            recipeRepository = RecipeRepository;
            spoonacularAPIService = SpoonacularAPIService;
            claimsExtensions = ClaimsExtensions;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var username = await claimsExtensions.GetUsername(User);
            var user = await userManager.FindByNameAsync(username);
            var favorite = await favoriteRepository.GetAllAsync(user);
            if (favorite.IsNullOrEmpty())
                return NotFound();
            var favoriteDto = favorite.Select(FavoriteMappers.FromFavoriteToFavoriteDto);
            return Ok(favoriteDto);
        }

        [HttpPost]
        [Route("{spoonacularrecipeid}")]
        [Authorize]
        public async Task<IActionResult> Create(int spoonacularrecipeid)
        {

            var recipe = await recipeRepository.GetAsyncBySpoonacularId(spoonacularrecipeid);
            if (recipe == null)
            {
                recipe = await spoonacularAPIService.GetRecipeBySpoonacularId(spoonacularrecipeid);
                if (recipe == null)
                {
                    return NotFound();
                }
            }
            var username = await claimsExtensions.GetUsername(User);
            var user = await userManager.FindByNameAsync(username);

            var favorite = new Favorite { AppUserId = user.Id, RecipeId = recipe.Id };
            try
            {
                var fav = await favoriteRepository.CreateAsync(favorite);
                return CreatedAtAction(
                    nameof(GetById),
                    new { spoonacularrecipeid = fav.Recipe.IdSpoonacular },
                    fav.FromFavoriteToFavoriteDto()
                );
            }
            catch (Exception e)
            {
                return StatusCode(500 ,e.Message);
            }
        }

        [HttpDelete("{spoonacularrecipeid}")]
        [Authorize]
        public async Task<IActionResult> Delete(int spoonacularrecipeid)
        {

            var favorite = await favoriteRepository.GetByIdAsync(spoonacularrecipeid);
            if (favorite == null)
                return NotFound();

            var favoriteDelete =  await favoriteRepository.DeleteAsync(favorite);
            return Ok(favoriteDelete.FromFavoriteToFavoriteDto());
        }

        [HttpGet("{spoonacularrecipeid}")]
        public async Task<IActionResult> GetById(int spoonacularrecipeid)
        {
            var favorite = await favoriteRepository.GetByIdAsync(spoonacularrecipeid);
            if (favorite == null)
                return NotFound();

            return Ok(favorite.FromFavoriteToFavoriteDto());
        }
    }
}
