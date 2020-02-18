using DataAnnotation.Logger;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLogging.Models
{
    public class RegisterViewModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        //[MaxFileSize(2 * 1024*1024)]
        //[filevalidation(new string[] { ".mp4" })]
        [CheckValidity((new string[] { ".jpg" }), (2 * 1024*1024))]
        public IFormFile file { get; set; }
        public string sfile { get; set; }
    }
}
