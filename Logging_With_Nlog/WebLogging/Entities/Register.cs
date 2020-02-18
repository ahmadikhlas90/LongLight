using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLogging.Entities
{
    public class Register
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string  Password { get; set; }
        public string  Address { get; set; }
        public string  file { get; set; }
    }
}
