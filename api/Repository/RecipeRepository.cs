using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext db;

        public RecipeRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public async Task<Recipe> GetAsyncBySpoonacularId(int spoonacularRecipeId)
        {
            return await db.Recipe.FirstOrDefaultAsync(x => x.IdSpoonacular == spoonacularRecipeId);
        }

        async Task<Recipe> IRecipeRepository.CreateAsync(Recipe recipe)
        {
            await db.Recipe.AddAsync(recipe);
            await db.SaveChangesAsync();
            return recipe;
        }
    }
}
