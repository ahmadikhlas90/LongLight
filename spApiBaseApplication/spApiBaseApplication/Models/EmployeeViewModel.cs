using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spApiBaseApplication.Models
{
    public class EmployeeViewModel
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Department { get; set; }
        public string Gender { get; set; }
    }
}
