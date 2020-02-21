using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using spApiBaseApplication.DBConnection;
using spApiBaseApplication.Entities;
using spApiBaseApplication.Models;

namespace spApiBaseApplication.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DBConnect ctx;

        public EmployeeController(DBConnect ctx)
        {
            this.ctx = ctx;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {

                var books = ctx.tblEmployee
                    .FromSqlRaw("EXEC dbo.spGetAllEmployees")
                        .ToList();
                return Ok(books);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                //SqlParameter usernameParam = new SqlParameter("@product_ID", productId.ToString() ?? (object)DBNull.Value);

                var books = ctx.tblEmployee.FromSqlRaw($"EXEC [dbo].[spGetByEmployeeId]  @EmpId={id}");

                return Ok(books);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        //http://localhost:53049/Employee/Alia/name/null/1/4
        [HttpGet("{SearchValue}/{SortColumn}/{SortOrder}/{PageNo}/{PageSize}")]
        public IActionResult Sorting(string SearchValue, string SortColumn, string SortOrder,int PageNo, int PageSize)
        {
            try
            {
                //SqlParameter usernameParam = new SqlParameter("@product_ID", productId.ToString() ?? (object)DBNull.Value);

                var books = ctx.tblEmployee.FromSqlRaw($"EXEC [dbo].[spPagination]  @SearchValue={SearchValue} ,@PageNo={PageNo}, @PageSize={PageSize},  @SortColumn={SortColumn}, @SortOrder={SortOrder}");

                return Ok(books);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        [Obsolete]
        public IActionResult Create([FromForm]EmployeeViewModel model)
        {
            try
            {
                var s = ctx.Database.ExecuteSqlCommand($"EXEC dbo.spAddEmployee @Name={model.Name},@City={model.City},@Department={model.Department},@Gender={model.Gender}");
                return Ok(s);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpPut]
        [Obsolete]
        public IActionResult update([FromForm]EmployeeViewModel model)
        {
            try
            {
                //var s = ctx.Database.ExecuteSqlCommand($"EXEC [dbo].[spUpdateEmployee] @Name={model.Name},@City={model.City},@Department={model.Department},@Gender={model.Gender} {model.EmployeeId}");

               var s= ctx.Database.ExecuteSqlCommand(
                            "EXEC dbo.spUpdateEmployee @EmpId, @Name, @City, @Department,@Gender",
                            new SqlParameter("@EmpId", model.EmployeeId),
                            new SqlParameter("@Name", model.Name),
                            new SqlParameter("@City", model.City),
                            new SqlParameter("@Department", model.Department),
                            new SqlParameter("@Gender", model.Gender)
                        );
                //var s = ctx.Database.ExecuteSqlCommand($"EXEC dbo.spUpdateEmployee  Name={model.Name},City={model.City},Department={model.Department},Gender={model.Gender} EmployeeId={model.EmployeeId}");
                //var s = ctx.tblEmployee.FromSqlRaw($"EXEC dbo.spUpdateEmployee  Name={model.Name},City={model.City},Department={model.Department},Gender={model.Gender} EmployeeId={model.EmployeeId}").Single();
                //var s = ctx.tblEmployee.FromSqlRaw("dbo.spUpdateEmployee  Name, City,Department,Gender,EmployeeId",
                //               new SqlParameter("Name", model.Name),
                //               new SqlParameter("City", model.City),
                //               new SqlParameter("Department", model.Department),
                //               new SqlParameter("Gender", model.Gender),
                //               new SqlParameter("EmployeeId", model.EmployeeId));
                if (s == 1)
                {
                    return Ok(s);
                }
                else {
                    throw new Exception("Some thing Wrong"); 
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpDelete("{id}")]
        [Obsolete]
        public IActionResult Delete(int id)
        {
            try
            {
                var s = ctx.Database.ExecuteSqlCommand($"[dbo].[spDeleteEmployee] @EmpId={id}");
                return Ok(s);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }



    }
}