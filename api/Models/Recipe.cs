using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public int IdSpoonacular { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
