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
using api.Interfaces;
using FakeItEasy;
using api.Models;


namespace api.Tests;

public class ApplicationTestsFactory : IAsyncDisposable
{
    protected readonly WebApplicationFactory<Program> Application;
    protected readonly HttpClient Client;
    protected ISpoonacularAPIService FakeSpoonacularService { get; private set; }

    public ApplicationTestsFactory()
    {
        string dbName = $"testDb_{Guid.NewGuid()}";
        FakeSpoonacularService = A.Fake<ISpoonacularAPIService>();
        Application = new WebApplicationFactory<Program>();
        Application = Application.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {

                services.RemoveAll(typeof(ApplicationDbContext));
                services.AddDbContext<ApplicationDbContext>(options => { options.UseInMemoryDatabase(dbName); });
                services.RemoveAll(typeof(ISpoonacularAPIService));
                services.AddSingleton<ISpoonacularAPIService>(FakeSpoonacularService);

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
        Client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", await RegisterAndLogInAsync());
    }

    private async Task<string> RegisterAndLogInAsync()
    {
        var registerDto1 = new RegisterDto
        {
            Email = "test123@gmail.com",
            Username = "testUsername1",
            Password = "asdQWE123!@#",
        };
        var registerDto2 = new RegisterDto
        {
            Email = "test1234@gmail.com",
            Username = "testUsername2",
            Password = "asdQWE123!@#",
        };
        var response = await Client.PostAsJsonAsync("api/account/register", registerDto1);
        await Client.PostAsJsonAsync("api/account/register",registerDto2 );
        var registrationResponse = await response.Content.ReadFromJsonAsync<NewUserDto>();

        var loginResponse = await LoginAsync(registrationResponse.Username, registerDto1.Password);
        return loginResponse;
    }
    public async Task<string> LoginAsync(string username ,string password)
    {
        var response = await Client.PostAsJsonAsync("api/account/login", new LoginDto
        {
            Username = username,
            Password = password
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

    public ISpoonacularAPIService GetFakeSpoonacularService()
    {
        return FakeSpoonacularService;
    }

    public async ValueTask DisposeAsync()
    {
        GC.SuppressFinalize(this);
        await Application.DisposeAsync();
        Client.Dispose();
    }
}