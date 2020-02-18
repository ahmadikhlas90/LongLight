using CrudAPI.Models;
using CrudLib.Entites;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAPI.ModelHelper
{
    public static class Helper
    {
        public static Product ToEntity(this ProductModel model)
        {
            return new Product { Id = model.Id, Details = model.Details, Name = model.Name,Price=model.Price, Type=model.Type};
        }
        public static ProductModel ToModel(this Product entity)
        {
            return new ProductModel { Id = entity.Id, Details = entity.Details, Name = entity.Name,Price=entity.Price,Type=entity.Type};
        }


        public static List<ProductModel> ToModelList(this List<Product> entitiesList)
        {
            List<ProductModel> modelsList = new List<ProductModel>();
            foreach (var entity in entitiesList)
            {
                modelsList.Add(entity.ToModel());
            }
            modelsList.TrimExcess();
            return modelsList;
        }


    }
}
