using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Favorite;
using api.Models;

namespace api.Mappers
{
    public static class FavoriteMappers
    {
        public static FavoriteDto FromFavoriteToFavoriteDto(this Favorite favorite)
        {
            return new FavoriteDto
            {
                spoonacularRecipeId = favorite.Recipe.IdSpoonacular,
                Image = favorite.Recipe.Image,
                Title = favorite.Recipe.Title
            };
        }
    }
}
