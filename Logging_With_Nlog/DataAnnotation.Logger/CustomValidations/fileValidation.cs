using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DataAnnotation.Logger
{
    public class filevalidation : ValidationAttribute
    {
        private readonly string[] _Extensions;
        public filevalidation(string[] Extensions)
        {
            _Extensions = Extensions;
        }

        protected override ValidationResult IsValid(
        object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            var extension = Path.GetExtension(file.FileName);
            if (!(file == null))
            {
                if (!_Extensions.Contains(extension.ToLower()))
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }

            return ValidationResult.Success;
        }

        public string GetErrorMessage()
        {
            return $"This file extension is not allowed!";
        }
    }






    public class MaxFileSizeAttribute : ValidationAttribute
    {
        private readonly int _maxFileSize;
        public MaxFileSizeAttribute(int maxFileSize)
        {
            _maxFileSize = maxFileSize;
        }

        protected override ValidationResult IsValid(
        object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            //var extension = Path.GetExtension(file.FileName);
            //var allowedExtensions = new[] { ".jpg", ".png" };`enter code here`
            if (file != null)
            {
                if (file.Length > _maxFileSize)
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }

            return ValidationResult.Success;
        }
        public string GetErrorMessage()
        {
            return $"Maximum allowed file size is { _maxFileSize} bytes.";
        }
    }
    //public class fileValidation : ValidationAttribute
    //{
    //    private readonly string filename;

    //    public fileValidation(string filename)
    //    { 
    //        this.filename = filename;
    //    }
    //    public override bool IsValid(object value)
    //    {
    //       string []  strings=value.ToString().Split('.');
    //       return strings[1].ToUpper() == filename.ToUpper();
    //    }
    //};

    public class CheckValidity : ValidationAttribute
    {
        private readonly string[] extensions;
        private readonly int maxFileSize;

        public CheckValidity(string[] Extensions, int maxFileSize)
        {
            extensions = Extensions;
            this.maxFileSize = maxFileSize;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            var extension = Path.GetExtension(file.FileName);
            if (!(file == null))
            {
                if (!extensions.Contains(extension.ToLower()))
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }

            var filesize = value as IFormFile;
            if (filesize != null)
            {
                if (filesize.Length > maxFileSize)
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }

            return ValidationResult.Success;
        }
        public string GetErrorMessage()
        {
                return $"Some thing Wrong Kindly Check Extention and File Size";
        }
    }
}
