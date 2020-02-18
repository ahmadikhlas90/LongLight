using CrudLib.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Web.Services3.Diagnostics;
using System;
using System.Collections.Generic;
using System.Text;

namespace CrudLib.DataConnection
{
   public  class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<EventLog> EventLogs { get; set; }
    }
}
