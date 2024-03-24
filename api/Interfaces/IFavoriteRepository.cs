using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<Favorite> GetByIdAsync(int recipeid);
        Task<Favorite> CreateAsync(Favorite favorite);
        Task<Favorite> DeleteAsync(Favorite favorite);
        Task<List<Favorite>> GetAllAsync(AppUser appUser);
    }
}
