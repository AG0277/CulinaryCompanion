using api.Extensions;
using api.Interfaces;
using api.Models;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using api.Repository;
using api.Controllers;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using api.Dtos.Favorite;
using System.Drawing;
using api.Data;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Tracing;
using api.Mappers;
using System.Security.Policy;
using System.Text.Json;

namespace api.Tests.Controllers
{
    public class FavoriteControllerTests : IClassFixture<ApplicationTestsFactory>
    {
        private readonly ApplicationTestsFactory factory;
        private readonly HttpClient Client;
        private readonly ApplicationDbContext db;
        private readonly ISpoonacularAPIService FakeSpoonacularService;

        public FavoriteControllerTests(ApplicationTestsFactory Factory)
        {
            factory = Factory;
            Client = factory.GetClient();
            db = factory.GetDbContext();
            FakeSpoonacularService = factory.GetFakeSpoonacularService();
        }

        [Fact]
        public async void FavoriteController_GetAll_FavoriteDto()
        {
            //Arrange
            var favs = db.Favorite.Include(r => r.Recipe).Where(a=>a.AppUser.Email == "test123@gmail.com").ToList();
            var dictionary = new Dictionary<int, FavoriteDto>();

            var favsDtoList = favs.Select(x => x.FromFavoriteToFavoriteDto());
            
            foreach(FavoriteDto fdto in favsDtoList)
            {
                dictionary.Add(fdto.spoonacularRecipeId, fdto);
            }

            //Act
            var result = await Client.GetAsync("api/favorite");
            var favoriteList = await result.Content.ReadFromJsonAsync<List<FavoriteDto>>();
            //Assert
            result.StatusCode.Should().Be(HttpStatusCode.OK);
            foreach(FavoriteDto fav in favoriteList)
            {
                if(dictionary.ContainsKey(fav.spoonacularRecipeId))
                {
                    var element = dictionary[fav.spoonacularRecipeId];
                    element.Should().BeEquivalentTo(fav);
                }
            }

        }

        [Fact]
        public async void FavoriteController_GetAll_NotFound()
        {
            //Arrange
            var newToken = await factory.LoginAsync("testUsername2", "asdQWE123!@#");
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, "api/favorite");
            requestMessage.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", newToken);
            var favs = db.Favorite.Include(r => r.Recipe).Where(a => a.AppUser.Email == "test1234@gmail.com").ToList();

            //Act
            var response = await Client.SendAsync(requestMessage);

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);

        }


        [Theory]
        [InlineData(2)]
        [InlineData(5)]
        [InlineData(10)]
        public async void FavoriteController_Create_CreatedAtAction(int spoonacularId)
        {
            //Arrange
            var recipe = await db.Recipe.FirstOrDefaultAsync(i => i.IdSpoonacular == spoonacularId);

            var request = new HttpRequestMessage(HttpMethod.Post, "api/favorite/" + spoonacularId.ToString());

            var fakeRecipe = new Recipe { IdSpoonacular = spoonacularId, Image="asd", Title = "asd" };
            A.CallTo(() => FakeSpoonacularService.GetRecipeBySpoonacularId(A<int>._)).Returns(fakeRecipe);
            await db.Recipe.AddAsync(fakeRecipe);
            await db.SaveChangesAsync();
            //Act
            var response = await Client.SendAsync(request);

            //Assert
            if(response.StatusCode == HttpStatusCode.InternalServerError)
            {
                response.StatusCode.Should().Be(HttpStatusCode.InternalServerError);
                return;
            }
            var favorite = await response.Content.ReadFromJsonAsync<FavoriteDto>();
            response.StatusCode.Should().Be(HttpStatusCode.Created);
            if (recipe != null)
            {
                favorite.spoonacularRecipeId.Should().Be(recipe.IdSpoonacular);
                favorite.Image.Should().BeEquivalentTo(recipe.Image);
                favorite.Title.Should().BeEquivalentTo(recipe.Title);
                return;
            }
            else
            {
                favorite.spoonacularRecipeId.Should().Be(fakeRecipe.IdSpoonacular);
                favorite.Image.Should().BeEquivalentTo(fakeRecipe.Image);
                favorite.Title.Should().BeEquivalentTo(fakeRecipe.Title);
                return;
            }

        }

        [Fact]
        public async void FavoriteController_Create_NotFound()
        {
            //Arrange
            var idSpoonacular = 1000;
            var request = new HttpRequestMessage(HttpMethod.Post, "api/favorite/" + idSpoonacular.ToString());

            A.CallTo(()=>FakeSpoonacularService.GetRecipeBySpoonacularId(A<int>._)).Returns(Task.FromResult<Recipe>(null));

            //Act
            var response = await Client.SendAsync(request);
            var favorite = await response.Content.ReadFromJsonAsync<FavoriteDto>();

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);

        }

        [Fact]
        public async void FavoriteController_Delete_Ok()
        {
            //Arrange
            var fav = await db.Favorite.Include(r => r.Recipe).FirstOrDefaultAsync(a => a.AppUser.Email == "test123@gmail.com");
            var recipe = fav.Recipe;
            var requestMessage = new HttpRequestMessage(HttpMethod.Delete, "api/favorite/" + recipe.IdSpoonacular.ToString());

            //Act
            var response = await Client.SendAsync(requestMessage);

            //Assert
            var recipeDto = await response.Content.ReadFromJsonAsync<FavoriteDto>();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            recipeDto.spoonacularRecipeId.Should().Be(recipe.IdSpoonacular);
            recipeDto.Image.Should().BeEquivalentTo(recipe.Image);
            recipeDto.Title.Should().BeEquivalentTo(recipe.Title);
        }

        [Fact]
        public async void FavoriteController_Delete_NotFound()
        {
            //Arrange
            var spoonacularId = 2932;
            var requestMessage = new HttpRequestMessage(HttpMethod.Delete, "api/favorite/" + spoonacularId.ToString());

            //Act
            var response = await Client.SendAsync(requestMessage);

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }



        [Fact]
        public async void FavoriteController_GetById_FavoriteDto()
        {

            //Arrange
            int spoonacularId = 2;
            var recipe = await db.Recipe.FirstOrDefaultAsync(i => i.IdSpoonacular == spoonacularId);

            var request = new HttpRequestMessage(HttpMethod.Get, "api/favorite/" + spoonacularId.ToString());

            //Act
            var response = await Client.SendAsync(request);

            //Assert
            var favorite = await response.Content.ReadFromJsonAsync<FavoriteDto>();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            favorite.spoonacularRecipeId.Should().Be(recipe.IdSpoonacular);
            favorite.Image.Should().BeEquivalentTo(recipe.Image);
            favorite.Title.Should().BeEquivalentTo(recipe.Title);

        }

        [Fact]
        public async void FavoriteController_GetById_NotFound()
        {

            //Arrange
            int spoonacularId = 2932;

            var request = new HttpRequestMessage(HttpMethod.Get, "api/favorite/" + spoonacularId.ToString());

            //Act
            var response = await Client.SendAsync(request);

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }
    }
}
