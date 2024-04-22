using api.Data;
using api.Dtos.Comment;
using api.Mappers;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
