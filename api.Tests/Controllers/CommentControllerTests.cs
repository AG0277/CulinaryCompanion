using api.Data;
using api.Dtos.Comment;
using api.Mappers;
using api.Models;
using FakeItEasy;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace api.Tests.Controllers
{
    public class CommentControllerTests : IClassFixture<ApplicationTestsFactory>
    {
        private readonly ApplicationTestsFactory factory;
        private readonly HttpClient Client;
        private readonly ApplicationDbContext db;

        public CommentControllerTests(ApplicationTestsFactory Factory)
        {
            factory = Factory;
            Client = factory.GetClient();
            db = factory.GetDbContext();
        }

        [Fact]
        public async void CommentController_GetBySpoonacularId_Ok()
        {
            //Arrange
            var spoonacularRecipeId = 5;
            var dictionary = new Dictionary<int, GetCommentDto>();
            var comments = db.Comment.Include(u=>u.AppUser).Where(x => x.Recipe.IdSpoonacular == spoonacularRecipeId);
            foreach(var comment in comments)
            {
                dictionary.Add(comment.Id , comment.FromCommentToGetCommentDto());
            }

            var requestMessage = new HttpRequestMessage(HttpMethod.Get,"api/comment?recipeid=" + spoonacularRecipeId);

            //Act
            var response = await Client.SendAsync(requestMessage);
            var commentDeserialized = await response.Content.ReadFromJsonAsync<List<GetCommentDto>>();

            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            commentDeserialized.Should().BeOfType<List<GetCommentDto>>();
            foreach(var comment in commentDeserialized)
            {
                if(dictionary.ContainsKey(comment.Id))
                {
                    dictionary[comment.Id].Should().BeEquivalentTo(comment);

                }
            }
        }

        [Fact]
        public async void CommentController_GetBySpoonacularId_NotFound()
        {
            //Arrange
            var spoonacularRecipeId = 2932;
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, "api/comment?recipeid=" + spoonacularRecipeId);

            //Act
            var response = await Client.SendAsync(requestMessage);

            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }

        [Fact]
        public async void CommentController_GetById_Ok()
        {
            //Arrange
            var commentId = 5;
            var comment = await db.Comment.Include(u => u.AppUser).FirstOrDefaultAsync(x => x.Id == commentId);
            var commentDto = comment.FromCommentToCommentDto();
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, "api/comment/" + commentId);

            //Act
            var response = await Client.SendAsync(requestMessage);
            var commentDeserialized = await response.Content.ReadFromJsonAsync<CommentDto>();

            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            commentDeserialized.Should().BeOfType<CommentDto>();
            commentDeserialized.Should().BeEquivalentTo(commentDto);

        }

        [Fact]
        public async void CommentController_GetById_NotFound()
        {
            //Arrange
            var commentId = 2932;
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, "api/comment/" + commentId);

            //Act
            var response = await Client.SendAsync(requestMessage);

            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);

        }

        [Fact]
        public async void CommentController_Delete_Ok()
        {
            //Arrange
            var commentId = 5;
            var comment = await db.Comment.Include(u => u.AppUser).FirstOrDefaultAsync(x => x.Id == commentId);
            var commentDto = comment.FromCommentToCommentDto();
            var requestMessage = new HttpRequestMessage(HttpMethod.Delete, "api/comment/" + commentId);

            //Act
            var response = await Client.SendAsync(requestMessage);
            var commentDeserialized = await response.Content.ReadFromJsonAsync<CommentDto>();

            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            commentDeserialized.Should().BeOfType<CommentDto>();
            commentDeserialized.Should().BeEquivalentTo(commentDto);

        }

        [Fact]
        public async void CommentController_Delete_NotFound()
        {
            //Arrange
            var commentId = 2932;
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, "api/comment/" + commentId);

            //Act
            var response = await Client.SendAsync(requestMessage);

            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);

        }


        [Fact]
        public async void CommentController_Delete_Unauthorized()
        {
            //Arrange

            var commentUser2 =  await db.Comment.FirstOrDefaultAsync(x => x.AppUser.UserName== "testUsername2");
            var requestMessage = new HttpRequestMessage(HttpMethod.Delete, "api/comment/" + commentUser2.Id);

            //Act
            var response = await Client.SendAsync(requestMessage);
            var commentDeserialized = await response.Content.ReadFromJsonAsync<CommentDto>();

            //Assert
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);

        }

        [Fact]
        public async void CommentController_Create_CreatedAtAction()
        {
            //Arrange
            var spoonacularRecipeId = 2;
            var createCommentDto = new CreateCommentDto
            {
                Content = "I love this recipe"
            };
            var json = JsonConvert.SerializeObject(createCommentDto);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            
            //Act
            var response = await Client.PostAsync("api/comment/"+ spoonacularRecipeId.ToString(),httpContent);
            var createdAtAction = await response.Content.ReadFromJsonAsync<CommentDto>();

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.Created);
            createdAtAction.Content.Should().Be(createCommentDto.Content);
            createdAtAction.CreatedBy.Should().Be("testUsername1");
        }


        [Fact]
        public async void CommentController_Create_BadRequest()
        {
            //Arrange
            var spoonacularRecipeId = 2;
            var createCommentDto = new CreateCommentDto
            {
                Content = "over100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100charsover100chars"
            };
            var json = JsonConvert.SerializeObject(createCommentDto);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            //Act
            var response = await Client.PostAsync("api/comment/" + spoonacularRecipeId.ToString(), httpContent);

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async void CommentController_Create_NotFound()
        {
            //Arrange
            var spoonacularRecipeId = 2932;
            var createCommentDto = new CreateCommentDto
            {
                Content = "My grandma loves this recipe!"
            };
            var json = JsonConvert.SerializeObject(createCommentDto);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            A.CallTo(() => factory.GetFakeSpoonacularService().GetRecipeBySpoonacularId(A<int>._)).Returns(Task.FromResult<Recipe> (null));

            //Act
            var response = await Client.PostAsync("api/comment/" + spoonacularRecipeId.ToString(), httpContent);

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async void CommentController_Update_Ok()
        {
            //Arrange
            var commentId = 2;
            var updateCommentDto = new UpdateCommentDto { Content = "updated comment " };


            //Act
            var response = await Client.PutAsJsonAsync("api/comment/" + commentId, updateCommentDto);
            var commentDto = await response.Content.ReadFromJsonAsync<CommentDto>();

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            commentDto.Content.Should().Be(updateCommentDto.Content);
        }

        [Fact]
        public async void CommentController_Update_BadRequest()
        {
            //Arrange
            var commentId = 2;
            var updateCommentDto = new UpdateCommentDto { Content = "over1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000charsover1000chars" };


            //Act
            var response = await Client.PutAsJsonAsync("api/comment/" + commentId, updateCommentDto);

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async void CommentController_Update_NotFound()
        {
            //Arrange
            var commentId = 2932;
            var updateCommentDto = new UpdateCommentDto { Content = "updated comment " };


            //Act
            var response = await Client.PutAsJsonAsync("api/comment/" + commentId, updateCommentDto);

            //Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }
    }
}
