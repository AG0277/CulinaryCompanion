using System.Collections.Generic;
using api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace test_api;

public class UnitTest1
{
    public class RecipeControllerTests
    {
        [Fact]
        public async Task Create_Returns_OkResult_With_Valid_Model()
        {
            // Arrange
            var mockRepo = new Mock<IRecipeRepository>();
            var controller = new RecipeController(mockRepo.Object);
            var recipeId = 123;
            var title = "Test Title";
            var image = "Test Image";

            // Act
            var result = await controller.Create(recipeId, title, image) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.NotNull(result.Value);
            // You may need to cast the value to RecipeModel if it's a different type
            // var recipeModel = Assert.IsType<RecipeModel>(result.Value);
            // Additional assertions for the returned value
        }
    }
}
