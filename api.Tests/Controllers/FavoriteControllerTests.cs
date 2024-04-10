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

namespace api.Tests.Controllers
{
    public class FavoriteControllerTests : IClassFixture<ApplicationTestsFactory>
    {
        private readonly ApplicationTestsFactory factory;
        private readonly HttpClient Client;
        private readonly ApplicationDbContext db;

        public FavoriteControllerTests(ApplicationTestsFactory Factory)
        {
            factory = Factory;
            Client = factory.GetClient();
            db = factory.GetDbContext();

        }

        [Fact]
        public async void FavoriteController_GetAll_FavoriteDto()
        {
            //Arrange

            //Act
            var result = await Client.GetAsync("api/favorite");
            //Assert
            result.StatusCode.Should().Be(HttpStatusCode.OK);

        }

        [Fact]
        public async void FavoriteController_GetAll_NotFound()
        {
            //Arrange
            //Act
            var result = await Client.GetAsync("api/favorite");
            //Assert
            result.StatusCode.Should().Be(HttpStatusCode.OK);

        }
    }
}
