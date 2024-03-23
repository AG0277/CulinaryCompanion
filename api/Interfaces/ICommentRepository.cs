using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment?> GetByIdAsync(int id);
        Task<List<Comment>?> GetBySpoonacularIdAsync(int id);
        Task<Comment> CreateAsync(Comment comment);
        Task<Comment> UpdateAsync(UpdateCommentDto updateCommentRequestDto, int id);
        Task<Comment?> DeleteAsync(int id);
    }
}
