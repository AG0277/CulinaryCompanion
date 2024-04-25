using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repository;
using Azure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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
        private readonly IClaimsExtensions claimsExtensions;
        public CommentController(
            ICommentRepository CommentRepository,
            UserManager<AppUser> UserManager,
            IRecipeRepository RecipeRepository,
            ISpoonacularAPIService SpoonacularAPIService, IClaimsExtensions ClaimsExtensions
        )
        {
            commentRepository = CommentRepository;
            userManager = UserManager;
            recipeRepository = RecipeRepository;
            spoonacularAPIService = SpoonacularAPIService;
            claimsExtensions = ClaimsExtensions;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {

            var comment = await commentRepository.GetByIdAsync(id);
            if (comment == null)
                return NotFound();

            return Ok(comment.FromCommentToCommentDto());
        }

        [HttpGet]
        public async Task<IActionResult> GetBySpoonacularId([FromQuery] int recipeid)
        {
            var commentList = await commentRepository.GetBySpoonacularIdAsync(recipeid);
            if (commentList.IsNullOrEmpty())
                return NotFound();
            var getCommentDto = commentList.Select(s => s.FromCommentToGetCommentDto());

            return Ok(getCommentDto);
        }

        [HttpPost("{spoonacularRecipeId:int}")]
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
                if (recipeId == null)
                    return NotFound();
            }
            comment.RecipeId = recipeId.Id;
            var username = await claimsExtensions.GetUsername(User);
            var user = await userManager.FindByNameAsync(username);
            comment.AppUserId = user.Id;
            await commentRepository.CreateAsync(comment);
            return CreatedAtAction(
                nameof(GetById),
                new { id = comment.Id },
                comment.FromCommentToGetCommentDto()
            );
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(
            [FromBody] UpdateCommentDto updateCommentRequestDto,
            [FromRoute] int id
        )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var comment = await commentRepository.GetByIdAsync(id);
            if (comment == null)
                return NotFound();

            var updatedComment = await commentRepository.UpdateAsync(updateCommentRequestDto, id);
            if (updatedComment == null)
                return NotFound();
            return Ok(updatedComment.FromCommentToGetCommentDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var commentToDelete = await commentRepository.GetByIdAsync(id);
            if (commentToDelete == null)
                return NotFound();
            var username = await claimsExtensions.GetUsername(User);
            var user = await userManager.FindByNameAsync(username);
            var admin = await userManager.IsInRoleAsync(user, "admin");
            if (!admin)
            {
                if (commentToDelete.AppUser.Id != user.Id)
                    return Unauthorized();
            }

            var comment = await commentRepository.DeleteAsync(id);
            var commentDto = comment.FromCommentToCommentDto();
            return Ok(commentDto);
        }
    }
}
