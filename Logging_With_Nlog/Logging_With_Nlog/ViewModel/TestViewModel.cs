using DataAnnotation.Logger;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Logging_With_Nlog.ViewModel
{
    public class TestViewModel
    {
        //[fileValidation(filename:".mp4",ErrorMessage ="Your file Selection Not Be Valid")]
        //[MaxFileSize(2 * 1024)]
        //[filevalidation(new string[] { ".mp4" })]
        [CheckValidity((new string[] { ".mp4"}),(2*1024))]

        public IFormFile File { set; get; }
    }
}
