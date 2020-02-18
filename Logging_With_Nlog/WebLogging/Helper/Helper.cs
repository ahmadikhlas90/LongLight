using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLogging.Entities;
using WebLogging.Models;

namespace WebLogging.Helper
{
    public static class Helper
    {
        public static Register ToEntity(this RegisterViewModel model)
        {
            return new Register { Id = model.Id,Email=model.Email,Password=model.Password, Address=model.Address,file=model.file.ToString() };
        }
        public static RegisterViewModel ToModel(this Register entity)
        {
            return new RegisterViewModel { Id=entity.Id,Email=entity.Email,Password=entity.Password,sfile=entity.file };
        }
        public static List<RegisterViewModel> ToModelList(this List<Register> entitiesList)
        {
            List<RegisterViewModel> modelsList = new List<RegisterViewModel>();
            foreach (var entity in entitiesList)
            {
                modelsList.Add(entity.ToModel());
            }
            modelsList.TrimExcess();
            return modelsList;
        }
    }
}
