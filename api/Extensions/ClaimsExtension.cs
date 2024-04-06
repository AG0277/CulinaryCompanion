using api.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Extensions
{
    public class ClaimsExtensions : IClaimsExtensions
    {
        public virtual Task<string> GetUsername(ClaimsPrincipal user)
        {
            return Task.FromResult(user?.Claims.SingleOrDefault(x =>
                x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")
            )?.Value);
        }
    }
}
