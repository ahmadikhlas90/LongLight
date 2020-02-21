using Microsoft.EntityFrameworkCore;
using spApiBaseApplication.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spApiBaseApplication.DBConnection
{
    public class DBConnect:DbContext
    {
          public DBConnect(DbContextOptions<DBConnect> options):base(options)
        {

        }
        public DbSet<Employee> tblEmployee { get; set; }
    }
}
