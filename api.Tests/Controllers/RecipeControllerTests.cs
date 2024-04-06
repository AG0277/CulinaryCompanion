using api.Controllers;
using api.Interfaces;
using api.Models;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Tests.Controllers
{
    public class RecipeControllerTests
    {
        private readonly IRecipeRepository recipeRepository;
        public RecipeControllerTests()
        {
            recipeRepository = A.Fake<IRecipeRepository>();
        }

        [Theory]
        [InlineData(0, "string","string.jpg")]
        [InlineData(101.2, "pizza", "pizza.png")]
        public async void RecipeController_Create_RecipeModel(int recipeId, string title , string image )
        {
            //Arrange

            var recipefake = A.Fake<Recipe>();
            A.CallTo(() => recipeRepository.CreateAsync(recipefake)).Returns(recipefake);
            var controller = new RecipeController(recipeRepository);


            //Act
            var result = await controller.Create(recipeId, title, image);
            //Asseret
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult.Value.Should().BeEquivalentTo(recipefake);

        }

        [Theory]
        [InlineData(-1, "bolognese", "bolognese.png")]

        public async void RecipeController_Create_InvalidModelState(int recipeId, string title, string image)
        {
            //Arrange
            var recipe = new Recipe
            {
                IdSpoonacular = recipeId,
                Title = title,
                Image = image
            };
            A.CallTo(() => recipeRepository.CreateAsync(recipe)).Returns(recipe);
            var controller = new RecipeController(recipeRepository);


            //Act
            var result = await controller.Create(recipeId, title, image);

            //Asseret
            result.Should().BeOfType<BadRequestObjectResult>();
            result.Should().NotBeNull();

        }
    }
}
