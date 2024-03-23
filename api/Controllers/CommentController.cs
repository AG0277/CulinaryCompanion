using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Models;
using api.Repository;
using Azure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository commentRepository;
        private readonly UserManager<AppUser> userManager;
        private readonly IRecipeRepository recipeRepository;
        private readonly ISpoonacularAPIService spoonacularAPIService;

        public CommentController(
            ICommentRepository CommentRepository,
            UserManager<AppUser> UserManager,
            IRecipeRepository RecipeRepository,
            ISpoonacularAPIService SpoonacularAPIService
        )
        {
            commentRepository = CommentRepository;
            userManager = UserManager;
            recipeRepository = RecipeRepository;
            spoonacularAPIService = SpoonacularAPIService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }

        [HttpPost]
        [Route("spoonacularRecipeId:int")]
        [Authorize]
        public async Task<IActionResult> Create(
            int spoonacularRecipeId,
            CreateCommentDto createCommentDto
        )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = new Comment
            {
                Content = createCommentDto.Content,
                CreatedOn = DateTime.Now,
            };
            var recipeId = await recipeRepository.GetAsyncBySpoonacularId(spoonacularRecipeId);
            if (recipeId == null)
            {
                recipeId = await spoonacularAPIService.GetRecipeBySpoonacularId(
                    spoonacularRecipeId
                );
                if (spoonacularAPIService == null)
                {
                    return BadRequest($"No recipe id {spoonacularRecipeId} found");
                }
            }
            comment.RecipeId = recipeId.Id;
            var username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);
            comment.AppUserId = user.Id;
            await commentRepository.CreateAsync(comment);
            return Ok(comment);
        }
    }
}
