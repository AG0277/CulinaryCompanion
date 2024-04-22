using api.Data;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace api.Tests
{
    public class SeedTestDb
    {
        private readonly ApplicationDbContext db;
        public SeedTestDb(ApplicationDbContext Db)
        {
            db = Db;
        }

        public async Task SeedDataAsync()
        {
            await SeedRecipesAsync();
            await SeedFavoritesAsync();
            await SeedCommentsAsync();
        }

        private async Task SeedRecipesAsync()
        {

            var recipes = new List<Recipe>
            {
                new Recipe { Title = "Spaghetti Carbonara", Image = "spaghetti-carbonara.jpg", IdSpoonacular = 1 },
                new Recipe { Title = "Chicken Alfredo Pasta", Image = "chicken-alfredo-pasta.jpg", IdSpoonacular = 2 },
                new Recipe { Title = "Vegetable Stir Fry", Image = "vegetable-stir-fry.jpg", IdSpoonacular = 3 },
                new Recipe { Title = "Grilled Salmon", Image = "grilled-salmon.jpg", IdSpoonacular = 4 },
                new Recipe { Title = "Beef Tacos", Image = "beef-tacos.jpg", IdSpoonacular = 5 }
            };

            db.Recipe.AddRange(recipes);
            await db.SaveChangesAsync();


        }

        private async Task SeedFavoritesAsync()
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.UserName == "testUsername1");
            var allRecipes = await db.Recipe.ToListAsync();
            var Favorites = new List<Favorite> {   new Favorite
            {
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[0],
                RecipeId = allRecipes[0].Id
            },new Favorite
            {
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[1],
                RecipeId = allRecipes[1].Id
            },
            new Favorite
            {
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[2],
                RecipeId = allRecipes[2].Id
            }};
        

             db.Favorite.AddRange(Favorites);
            await db.SaveChangesAsync();

        }

        private async Task SeedCommentsAsync()
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.UserName == "testUsername1");
            var user2 = await db.Users.FirstOrDefaultAsync(u => u.UserName == "testUsername2");
            var allRecipes = await db.Recipe.ToListAsync();
            var Comments = new List<Comment> {   new Comment
            {
                Content = "amazing recipe!",
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[0],
                RecipeId = allRecipes[0].Id
            }, new Comment
            {
                Content = "amazing recipe!",
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[3],
                RecipeId = allRecipes[3].Id
            }, new Comment
            {
                Content = "amazing recipe!",
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[4],
                RecipeId = allRecipes[4].Id
            },
            new Comment
            {
                Content = "amazing recipe1!",
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[4],
                RecipeId = allRecipes[4].Id
            },
            new Comment
            {
                Content = "amazing recipe2!",
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[4],
                RecipeId = allRecipes[4].Id
            },
            new Comment
            {
                Content = "amazing recipe3!",
                AppUser = user,
                AppUserId = user.Id,
                Recipe = allRecipes[4],
                RecipeId = allRecipes[4].Id
            },
                        new Comment
            {
                Content = "amazing recipe! from user2",
                AppUser = user2,
                AppUserId = user2.Id,
                Recipe = allRecipes[4],
                RecipeId = allRecipes[4].Id
            },};

            db.Comment.AddRange(Comments);
            await db.SaveChangesAsync();
        }
    }
}
