using LinqToDB;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.VisualStudio.TestPlatform.ObjectModel.DataCollection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Microsoft.EntityFrameworkCore;
using api.Data;
using System.Net.Http.Json;
using api.Dtos.Account;
using Microsoft.Extensions.Options;


namespace api.Tests;

public class ApplicationTestsFactory : IAsyncDisposable
{
    protected readonly WebApplicationFactory<Program> Application;
    protected readonly HttpClient Client;
    

    public ApplicationTestsFactory()
    {
        string dbName = $"testDb_{Guid.NewGuid()}";
        Application = new WebApplicationFactory<Program>();
        Application = Application.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {

                services.RemoveAll(typeof(ApplicationDbContext));
                services.AddDbContext<ApplicationDbContext>(options => { options.UseInMemoryDatabase(dbName); });

                using (var scope = services.BuildServiceProvider().CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    dbContext.Database.EnsureDeleted();
                    dbContext.Database.EnsureCreated();
                }


            });
        });
        Client = Application.CreateClient();
        AuthenticateAsync().GetAwaiter().GetResult();
        var db = GetDbContext();
        var x = new SeedTestDb(db);
        x.SeedDataAsync().GetAwaiter().GetResult();

    }
    public async Task AuthenticateAsync()
    {
        Client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", await RegisterAsync());
    }

    private async Task<string> RegisterAsync()
    {
        var response = await Client.PostAsJsonAsync("api/account/register", new RegisterDto
        {
            Email = "test123@gmail.com",
            Username = "testUsername",
            Password = "asdQWE123!@#",
        });
        var registrationResponse = await response.Content.ReadFromJsonAsync<NewUserDto>();
        return registrationResponse.Token.ToString();
    }
    private async Task<string> LoginAsync()
    {
        var response = await Client.PostAsJsonAsync("api/account/login", new LoginDto
        {
            Username = "testUsername",
            Password = "asdQWE123!@#",
        });
        var registrationResponse = await response.Content.ReadFromJsonAsync<NewUserDto>();
        return registrationResponse.Token.ToString();
    }
    public HttpClient GetClient()
    {
        return Client;
    }

    public ApplicationDbContext GetDbContext()
    {
        var scope = Application.Services.CreateScope();
        return scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    }

    public async ValueTask DisposeAsync()
    {
        GC.SuppressFinalize(this);
        await Application.DisposeAsync();
        Client.Dispose();
    }
}