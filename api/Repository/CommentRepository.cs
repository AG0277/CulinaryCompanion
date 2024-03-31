using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comment;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext db;

        public CommentRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            await db.Comment.AddAsync(comment);
            await db.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var comment = await db
                .Comment.Include(x => x.AppUser)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (comment == null)
                return null;
            db.Remove(comment);
            await db.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await db.Comment.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<List<Comment>?> GetBySpoonacularIdAsync(int id)
        {
            return await db
                .Comment.Include(a => a.AppUser)
                .Where(r => r.Recipe.IdSpoonacular == id)
                .OrderByDescending(d => d.CreatedOn)
                .ToListAsync();
        }

        public async Task<Comment> UpdateAsync(UpdateCommentDto updateCommentRequestDto, int id)
        {
            var comment = await db
                .Comment.Include(a => a.AppUser)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
                return null;
            comment.Content = updateCommentRequestDto.Content;
            await db.SaveChangesAsync();
            return comment;
        }
    }
}
