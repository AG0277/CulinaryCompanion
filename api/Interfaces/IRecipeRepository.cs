using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IRecipeRepository
    {
        Task<Recipe> GetAsyncBySpoonacularId(int spoonacularRecipeId);
        Task<Recipe> CreateAsync(Recipe recipe);
    }
}
