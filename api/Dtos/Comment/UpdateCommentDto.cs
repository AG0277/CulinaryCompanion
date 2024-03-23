using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class UpdateCommentDto
    {
        [Required]
        [MaxLength(280, ErrorMessage = "Content cannot be over 1000 characters")]
        public string Content { get; set; } = string.Empty;
    }
}
