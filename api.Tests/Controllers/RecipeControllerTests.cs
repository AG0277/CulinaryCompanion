using api.Controllers;
using api.Data;
using api.Dtos.Recipe;
using api.Interfaces;
using api.Models;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace api.Tests.Controllers
{
    public class RecipeControllerTests : IClassFixture<ApplicationTestsFactory>
    {
        private readonly ApplicationTestsFactory factory;
        private readonly HttpClient Client;
        private readonly ApplicationDbContext db;

        public RecipeControllerTests(ApplicationTestsFactory Factory)
        {
            factory = Factory;
            Client = factory.GetClient();
            db = factory.GetDbContext();

        }

        [Fact]
        public async void RecipeController_GetAll_NotFound()
        {
            //Arrange
            var recipe = new CreateRecipeDto
            {
                spoonacularRecipeId = 1
                ,
                Image = "asdsa",
                Title = "aqq",
            };
            //Act
            var result = await Client.PostAsJsonAsync("api/recipe",recipe);
            //Assert
            result.StatusCode.Should().Be(HttpStatusCode.OK);

        }
    }
}
