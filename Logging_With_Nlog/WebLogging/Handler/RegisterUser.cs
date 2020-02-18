using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLogging.Entities
{
    public class RegisterUser
    {
        private readonly AppDBContext context;

        public RegisterUser(AppDBContext context)
        {
            this.context = context;
        }


        public RegisterUser Add(RegisterUser registerUser) {
            context.Add(registerUser);
            context.SaveChanges();
            return registerUser;
        }


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
    public interface IRegisterRepository : IRepository<Register>
    {
        Register AddRE(Register entity);
    }
    public class RegisterRepository : Repository<Register>, IRegisterRepository
    {
        private readonly AppDBContext context;
        public RegisterRepository(AppDBContext context) : base(context)
        {
            this.context = context;
        }
        public Register AddRE(Register entity)
        {
            context.Add(entity);
            context.SaveChanges();
            return entity;
        }
    }

    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AppDBContext Context;
        public Repository(AppDBContext context) => Context = context;

        public void Add(T entity)
        {
            Context.Set<T>().Add(entity);
        }

        public T Delete(int idToSearch)
        {
            throw new NotImplementedException();
        }

        public List<T> GetAll()
        {
            return Context.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return Context.Set<T>().Find(id);
        }

        public void Remove(int id)
        {

            //var type= Context.Set<T>().ToList();
            var type = Context.Set<T>().Find(id);
            Context.Remove(type);
        }


        public void Update(int idToSearch, T entity)
        {
            var v = Context.Set<T>().Find(idToSearch);
            if (v != null)
            {
                Context.Set<T>().Attach(entity);
            }
        }

        public void save()
        {
            Context.SaveChanges();
        }

    }
}
