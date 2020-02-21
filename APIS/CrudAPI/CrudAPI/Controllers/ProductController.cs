using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CrudAPI.ModelHelper;
using CrudAPI.Models;
using CrudLib.DataConnection;
using CrudLib.Entites;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repositories.RepositoriesInterfaces;

namespace CrudAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepo repo;
        private readonly AppDBContext db;
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly ILogger _logger;

        public ProductController(IProductRepo repo, AppDBContext db,
            IHostingEnvironment hostingEnvironment, ILogger<ProductController> logger)
        {
            this.repo = repo;
            this.db = db;
            this.hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }


        [HttpGet("{id}")]
        public IActionResult GetBy(int id)
        {
            try
            {
                //_logger.LogInformation("Log message in the Index() method");
                ProductModel model = repo.GetById(id).ToModel();
                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Log error GetBy Function" + ex);
                return StatusCode(500, ex);
            }
        }
        //GET   product
        //GET   product?id=1
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                List<ProductModel> models = repo.GetProducts().ToModelList();
                return Ok(models);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
      

        //create
        [HttpPost]
        public IActionResult Create([FromForm]ProductModel model)
        {
            try
            {
                var Product = new Product
                {
                    Name = model.Name,
                    Details = model.Details,
                    Price = model.Price,
                    Type = model.Type,
                };
                repo.Add(Product);
                repo.save();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        //put <- Update
        [HttpPut("{id}")]
        public IActionResult Edit(int id, ProductModel model)
        {
            try
            {
                var d = repo.GetById(id);
                if (model.Name != null && model.Details != null && model.Price != 0
                    && model.Type != null)
                {
                    d.Name = model.Name;
                    d.Details = model.Details;
                    d.Price = model.Price;
                    d.Type = model.Type;
                }
                repo.Update(id, d);
                repo.save();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        //delete the 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                repo.Remove(id);
                repo.save();
                return StatusCode(200);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}