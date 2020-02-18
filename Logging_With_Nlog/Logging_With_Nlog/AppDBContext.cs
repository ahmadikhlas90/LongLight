using Microsoft.EntityFrameworkCore;
using WebLogging.Entities;

namespace WebLogging
{
    public class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Register> registers { get; set; }
    }
}