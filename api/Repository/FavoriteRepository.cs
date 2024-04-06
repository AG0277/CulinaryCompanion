using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.JsonPatch.Internal;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly ApplicationDbContext db;

        public FavoriteRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public async Task<Favorite> CreateAsync(Favorite favorite)
        {
            await db.Favorite.AddAsync(favorite);
            await db.SaveChangesAsync();
            return favorite;
        }

        public async Task<Favorite> DeleteAsync(Favorite favorite)
        {
            db.Remove(favorite);
            await db.SaveChangesAsync();
            return favorite;
        }

        public async Task<List<Favorite>> GetAllAsync(AppUser appUser)
        {
            return await db
                .Favorite.Include(r => r.Recipe)
                .Where(x => x.AppUserId == appUser.Id)
                .ToListAsync();
        }

        public async Task<Favorite> GetByIdAsync(int recipeid)
        {
            return await db
                .Favorite.Include(a => a.Recipe)
                .FirstOrDefaultAsync(x => x.Recipe.IdSpoonacular == recipeid);

        }
    }
}
