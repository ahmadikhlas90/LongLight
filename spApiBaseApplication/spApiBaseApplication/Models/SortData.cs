using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spApiBaseApplication.Models
{
    public class SortData
    {
        public string SearchValue { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
    }
}
