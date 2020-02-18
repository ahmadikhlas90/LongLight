using System.ComponentModel.DataAnnotations;

namespace test.DTOS
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username{get;set;}
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must enter pasword b/w 4 to 8 charcters")]
        public string Password { get; set; }
       
    }
}