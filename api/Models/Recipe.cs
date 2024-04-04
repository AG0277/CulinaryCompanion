using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int IdSpoonacular { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Image { get; set; } = string.Empty;
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
