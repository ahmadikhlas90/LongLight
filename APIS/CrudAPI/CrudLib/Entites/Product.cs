using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudLib.Entites
{
   public  class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string  Details { get; set; }
        public int  Price { get; set; }
        public string Type { get; set; }
        //public string Photo { get; set; }
    }
}
