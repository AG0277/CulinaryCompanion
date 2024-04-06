using System.Security.Claims;

namespace api.Interfaces
{
    public interface IClaimsExtensions
    {
        Task<string> GetUsername(ClaimsPrincipal user);
    }
}
