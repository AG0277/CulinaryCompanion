using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;

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

        public Task<List<Comment>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
