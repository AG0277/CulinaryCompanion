using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Models;
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

        public CommentController(
            ICommentRepository CommentRepository,
            UserManager<AppUser> UserManager
        )
        {
            commentRepository = CommentRepository;
            userManager = UserManager;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }

        [HttpPost]
        [Route("recipeId:int")]
        [Authorize]
        public async Task<IActionResult> Create(int recipeId, CreateCommentDto createCommentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = new Comment
            {
                Content = createCommentDto.Content,
                CreatedOn = DateTime.Now,
                RecipeId = recipeId
            };

            var username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);
            comment.AppUserId = user.Id;
            await commentRepository.CreateAsync(comment);
            return Ok(comment);
        }
    }
}
