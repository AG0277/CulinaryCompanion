using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMappers
    {
        public static CommentDto FromCommentToCommentDto(this Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                CreatedOn = comment.CreatedOn,
                CreatedBy = comment.AppUser.UserName,
                RecipeId = comment.RecipeId
            };
        }

        public static GetCommentDto FromCommentToGetCommentDto(this Comment comment)
        {
            return new GetCommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                CreatedOn = comment.CreatedOn.ToString("yyyy-MM-dd"),
                CreatedBy = comment.AppUser.UserName,
                RecipeId = comment.RecipeId
            };
        }
    }
}
