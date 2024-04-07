using api.Extensions;
using api.Interfaces;
using api.Models;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using SampleApp.E2E.Tests;
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

namespace api.Tests.Controllers
{
    public class FavoriteControllerTests : EndToEndTestCase
    {
        private readonly IFavoriteRepository favoriteRepository;
        private readonly IRecipeRepository recipeRepository;
        private readonly UserManager<AppUser> userManager;
        private readonly ISpoonacularAPIService spoonacularAPIService;
        private readonly IClaimsExtensions claimsExtensions;

        public FavoriteControllerTests()
        {
            favoriteRepository = A.Fake<IFavoriteRepository>();
            recipeRepository = A.Fake<IRecipeRepository>();
            userManager = A.Fake<UserManager<AppUser>>();
            spoonacularAPIService = A.Fake<ISpoonacularAPIService>();
            claimsExtensions = A.Fake<ClaimsExtensions>();
        }

        [Fact]
        public async void FavoriteController_GetAll_FavoriteDto()
        {
            //Arrange
            var user = A.Fake<AppUser>();
            var claims = new List<Claim> {
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.GivenName, user.UserName) };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var token = JwtTokenProvider.JwtSecurityTokenHandler.WriteToken(
            new JwtSecurityToken(
               JwtTokenProvider.Issuer,
               JwtTokenProvider.Issuer,
               claims,
               expires: DateTime.Now.AddMinutes(2),
               signingCredentials: JwtTokenProvider.SigningCredentials
           )
       );
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var fakeFavorite = A.Fake<Favorite>();
            var fakeFavorite2 = A.Fake<Favorite>();
            var favorites = new List<Favorite> { fakeFavorite,fakeFavorite2 };
            A.CallTo(() => favoriteRepository.GetAllAsync(user)).Returns(favorites);

            A.CallTo(() => claimsExtensions.GetUsername(claimsPrincipal)).Returns(user.UserName);
            A.CallTo(() => userManager.FindByNameAsync(user.UserName)).Returns(user);


            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager,claimsExtensions);
            //Act
            var result = await controller.GetAll();
            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            Assert.IsAssignableFrom<IEnumerable<FavoriteDto>>(okResult.Value);

        }

        [Fact]
        public async void FavoriteController_GetAll_NotFound()
        {
            //Arrange
            var user = A.Fake<AppUser>();
            var claims = new List<Claim> {
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.GivenName, user.UserName) };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var token = JwtTokenProvider.JwtSecurityTokenHandler.WriteToken(
            new JwtSecurityToken(
               JwtTokenProvider.Issuer,
               JwtTokenProvider.Issuer,
               claims,
               expires: DateTime.Now.AddMinutes(2),
               signingCredentials: JwtTokenProvider.SigningCredentials
           )
       );
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            A.CallTo(() => favoriteRepository.GetAllAsync(A<AppUser>._)).Returns((List<Favorite>)null);



            A.CallTo(() => claimsExtensions.GetUsername(claimsPrincipal)).Returns(user.UserName);
            A.CallTo(() => userManager.FindByNameAsync(user.UserName)).Returns(user);


            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);
            //Act
            var result = await controller.GetAll();
            //Assert
            result.Should().BeOfType<NotFoundResult>();

        }

        [Fact]
        public async void FavoriteController_GetById_FavoriteDto()
        {
            //Arrange
            var favoriteId = 4;
            var favorite = A.Fake<Favorite>();
            favorite.Recipe = new Recipe
            {
                Title = "Fake Recipe Title",
                Image = "Fake Recipe Image"
            };
            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);

            A.CallTo(() => favoriteRepository.GetByIdAsync(favoriteId)).Returns(favorite);
            //Act
            var result = await controller.GetById(favoriteId);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            Assert.IsAssignableFrom<FavoriteDto>(okResult.Value);

            var favoriteDto = okResult.Value as FavoriteDto;
            Assert.NotNull(favoriteDto);
            Assert.Equal(favorite.Recipe.Title, favoriteDto.Title);
            Assert.Equal(favorite.Recipe.Image, favoriteDto.Image);
        }

        [Fact]
        public async void FavoriteController_GetById_NotFound()
        {
            //Arrange
            var favoriteId = 4;
            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);

            A.CallTo(() => favoriteRepository.GetByIdAsync(A<int>._)).Returns((Favorite)null);
            //Act
            var result = await controller.GetById(favoriteId);

            //Assert
            result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async void FavoriteController_Create_FavoriteDto()
        {
            //Arrange
            var spoonacularId = 1;
            var recipeId = 6;
            var user = A.Fake<AppUser>();
            var claims = new List<Claim> {
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.GivenName, user.UserName) };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var token = JwtTokenProvider.JwtSecurityTokenHandler.WriteToken(
            new JwtSecurityToken(
               JwtTokenProvider.Issuer,
               JwtTokenProvider.Issuer,
               claims,
               expires: DateTime.Now.AddMinutes(2),
               signingCredentials: JwtTokenProvider.SigningCredentials
           )
       );
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var fakeFavorite = A.Fake<Favorite>();
            var fakeRecipe = A.Fake<Recipe>();
            fakeFavorite.Recipe = fakeRecipe;

            A.CallTo(() => recipeRepository.GetAsyncBySpoonacularId(spoonacularId)).Returns(fakeRecipe);
            A.CallTo(() => claimsExtensions.GetUsername(claimsPrincipal)).Returns(user.UserName);
            A.CallTo(() => userManager.FindByNameAsync(user.UserName)).Returns(user);
            A.CallTo(() => favoriteRepository.CreateAsync(A<Favorite>.Ignored)).Returns(fakeFavorite);



            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);
            //Act
            var result = await controller.Create(spoonacularId);

            //Assert

            result.Should().NotBeNull();
            result.Should().BeOfType<CreatedAtActionResult>();
            var okResult = result as CreatedAtActionResult;
            okResult.Should().NotBeNull();
            Assert.IsAssignableFrom<FavoriteDto>(okResult.Value);
            var resultObject = (FavoriteDto)((CreatedAtActionResult)okResult).Value;
            Assert.Equal(fakeRecipe.Image, resultObject.Image);
            Assert.Equal(fakeRecipe.Title, resultObject.Title);
            Assert.Equal(fakeRecipe.IdSpoonacular, resultObject.spoonacularRecipeId);
        }

        [Fact]
        public async void FavoriteController_Create_NotFound()
        {
            //Arrange
            var spoonacularId = 1;
            var user = A.Fake<AppUser>();
            var claims = new List<Claim> {
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.GivenName, user.UserName) };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var token = JwtTokenProvider.JwtSecurityTokenHandler.WriteToken(
            new JwtSecurityToken(
               JwtTokenProvider.Issuer,
               JwtTokenProvider.Issuer,
               claims,
               expires: DateTime.Now.AddMinutes(2),
               signingCredentials: JwtTokenProvider.SigningCredentials
           )
       );
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var fakeFavorite = A.Fake<Favorite>();
            A.CallTo(() => recipeRepository.GetAsyncBySpoonacularId(A<int>._)).Returns((Recipe)(null));
            A.CallTo(()=> spoonacularAPIService.GetRecipeBySpoonacularId(A<int>._)).Returns((Recipe)null);



            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);
            //Act
            var result = await controller.Create(spoonacularId);

            //Assert

            result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async void FavoriteController_Delete_FavoriteDto()
        {
            //Arrange
            var spoonacularRecipeId = 2;
            var user = A.Fake<AppUser>();
            var claims = new List<Claim> {
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.GivenName, user.UserName) };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var token = JwtTokenProvider.JwtSecurityTokenHandler.WriteToken(
            new JwtSecurityToken(
               JwtTokenProvider.Issuer,
               JwtTokenProvider.Issuer,
               claims,
               expires: DateTime.Now.AddMinutes(2),
               signingCredentials: JwtTokenProvider.SigningCredentials
           )
           );
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var favorite = A.Fake<Favorite>();
            favorite.AppUser = user;
            var recipe = A.Fake<Recipe>();
            favorite.Recipe = recipe;
            A.CallTo(() => favoriteRepository.GetByIdAsync(spoonacularRecipeId)).Returns(favorite);

            A.CallTo(() => claimsExtensions.GetUsername(claimsPrincipal)).Returns(user.UserName);
            A.CallTo(() => userManager.FindByNameAsync(user.UserName)).Returns(user);
            A.CallTo(() => favoriteRepository.DeleteAsync(favorite)).Returns(favorite);


            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);
            //Act
            var result = await controller.Delete(spoonacularRecipeId);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            Assert.IsAssignableFrom<FavoriteDto>(okResult.Value);

        }

        [Fact]
        public async void FavoriteController_Delete_NotFound()
        {
            //Arrange
            var spoonacularRecipeId = 2;
            var user = A.Fake<AppUser>();
            var claims = new List<Claim> {
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.GivenName, user.UserName) };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var token = JwtTokenProvider.JwtSecurityTokenHandler.WriteToken(
            new JwtSecurityToken(
               JwtTokenProvider.Issuer,
               JwtTokenProvider.Issuer,
               claims,
               expires: DateTime.Now.AddMinutes(2),
               signingCredentials: JwtTokenProvider.SigningCredentials
           )
           );
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            A.CallTo(() => favoriteRepository.GetByIdAsync(spoonacularRecipeId)).Returns((Favorite)null);

            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);
            //Act
            var result = await controller.Delete(spoonacularRecipeId);
            //Assert
            result.Should().BeOfType<NotFoundResult>();

        }

        [Fact]
        public async void FavoriteController_Delete_Unauthorized()
        {
            //Arrange
            var spoonacularRecipeId = 2;
            var user = A.Fake<AppUser>();
            var user1 = A.Fake<AppUser>();
            user1.UserName = "user1";
            var claims = new List<Claim> {
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.GivenName, user.UserName) };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var token = JwtTokenProvider.JwtSecurityTokenHandler.WriteToken(
            new JwtSecurityToken(
               JwtTokenProvider.Issuer,
               JwtTokenProvider.Issuer,
               claims,
               expires: DateTime.Now.AddMinutes(2),
               signingCredentials: JwtTokenProvider.SigningCredentials
           )
           );
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var favorite = A.Fake<Favorite>();
            favorite.AppUser = user;
            
            A.CallTo(() => favoriteRepository.GetByIdAsync(spoonacularRecipeId)).Returns(favorite);

            A.CallTo(() => claimsExtensions.GetUsername(claimsPrincipal)).Returns(user1.UserName);
            A.CallTo(() => userManager.FindByNameAsync(user.UserName)).Returns(user1);
            
            

            var controller = new FavoriteController(favoriteRepository, recipeRepository, spoonacularAPIService, userManager, claimsExtensions);
            //Act
            var result = await controller.Delete(spoonacularRecipeId);
            //Assert
            result.Should().BeOfType<UnauthorizedResult>();

        }
    }
}
