using CrudLib.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.RepositoriesInterfaces
{
    
    public interface IProductRepo : IRepository<Product>
    {
        List<Product> GetProducts();
    }




    public interface IRepository<T> where T : class
    {
        List<T> GetAll();
        T GetById(int id);
        T Delete(int idToSearch);
        void Update(int idToSearch, T entity);
        void Add(T entity);
        void save();
        void Remove(int id);
    }


}
