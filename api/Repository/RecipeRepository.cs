using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext db;

        public RecipeRepository(ApplicationDbContext context)
        {
            db = context;
        }

        async Task<Recipe> IRecipeRepository.CreateAsync(Recipe recipe)
        {
            await db.Recipe.AddAsync(recipe);
            await db.SaveChangesAsync();
            return recipe;
        }
    }
}
