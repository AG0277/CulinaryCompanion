using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class GetCommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public string CreatedOn { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string CreatedBy { get; set; } = string.Empty;
        public int? RecipeId { get; set; }
    }
}
