using api.Controllers;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using api.Services;
using Azure.Identity;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Tests.Controllers
{

    public class AccountControllerTests
    {
        private readonly UserManager<AppUser> userManager;
        private readonly ITokenService tokenService;
        private readonly SignInManager<AppUser> signInManager;
        public AccountControllerTests(
        )
        {
            userManager = A.Fake<UserManager<AppUser>>();/*(x => x.WithArgumentsForConstructor(() => new UserManager<AppUser>(userStore, null, null, null, null, null, null, null, null)));*/


            tokenService = A.Fake<ITokenService>();
            signInManager = A.Fake<SignInManager<AppUser>>();
        }

        [Fact]
        public async void AccountController_Register_NewUserDto()
        {
            //Arrange
            var registerDto = new RegisterDto
            {
                Username = "asdqweasdqwe",
                Email = "test@gmail.com",
                Password = "asdQWE123!@#",
               
            };

            var appUser = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };
            var jwtToken = "Jwt_Token";
            var expectedResult = new NewUserDto { Username = appUser.UserName, Email = appUser.Email, Token = jwtToken };
            A.CallTo(()=>userManager.AddToRoleAsync(A<AppUser>._, A<string>._)).Returns(Task.FromResult(IdentityResult.Success));
            A.CallTo(() => userManager.CreateAsync(A<AppUser>._, A<string>._)).Returns(Task.FromResult(IdentityResult.Success));
            A.CallTo(() => tokenService.CreateToken(A<AppUser>._)).Returns(jwtToken);

            var controller = new AccountController(userManager, tokenService, signInManager);
            
            //Act
            var result = await controller.Register(registerDto);

            //Assert
            result.Should().NotBeNull();    
            result.Should().BeOfType<OkObjectResult>();
            var registerResult = (OkObjectResult)result;
            registerResult.Value.Should().NotBeNull();
            registerResult.Value.Should().BeOfType<NewUserDto>();
            registerResult.Value.Should().BeEquivalentTo(expectedResult);

        }



        [Theory]
        [InlineData("username1", null, "password1")]
        [InlineData(null, "email2", "password2")]
        [InlineData("username1", "email2@example.com", null)]
        public async void AccountController_Register_InvalidModelBadRequest(string username = null, string email = null, string password = null)
        {
            //Arrange
            var registerDto = new RegisterDto
            {
                Username = username,
                Email = email,
                Password = password,

            };

            var appUser = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };
            var jwtToken = "Jwt_Token";
            var expectedResult = new NewUserDto { Username = appUser.UserName, Email = appUser.Email, Token = jwtToken };
            A.CallTo(() => userManager.AddToRoleAsync(A<AppUser>._, A<string>._)).Returns(Task.FromResult(IdentityResult.Failed()));
            A.CallTo(() => userManager.CreateAsync(A<AppUser>._, A<string>._)).Returns(Task.FromResult(IdentityResult.Failed()));
            A.CallTo(() => tokenService.CreateToken(A<AppUser>._)).Returns(jwtToken);

            var controller = new AccountController(userManager, tokenService, signInManager);

            //Act
            var result = await controller.Register(registerDto);

            //Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);

        }

    }
}
