using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
