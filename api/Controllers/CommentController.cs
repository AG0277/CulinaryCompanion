using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public CommentController(ApplicationDbContext dbContext)
        {
            db = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create()
        {
            return Ok();
        }
    }
}
