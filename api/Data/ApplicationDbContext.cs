using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions) { }

        public DbSet<Comment> Comment { get; set; }
        public DbSet<Favorite> Favorite { get; set; }
        public DbSet<Recipe> Recipe { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Favorite>(x => x.HasKey(p => new { p.AppUserId, p.RecipeId }));

            builder
                .Entity<Favorite>()
                .HasOne(a => a.AppUser)
                .WithMany(x => x.Favorites)
                .HasForeignKey(f => f.AppUserId);
            builder
                .Entity<Favorite>()
                .HasOne(r => r.Recipe)
                .WithMany(a => a.Favorites)
                .HasForeignKey(r => r.RecipeId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
