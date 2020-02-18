using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using test.DTOS;
using test.Models;
using test.Repository;

namespace test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthRepository repository;
        private readonly IConfiguration configuration;

        public AuthController(IAuthRepository repository,
        IConfiguration configuration)
        {
            this.repository = repository;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> register(UserForRegisterDto userForRegisterDto)
        {
            //public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
            // if(!ModelState.IsValid)
            //  return BadRequest(ModelState);
            //validate reqeust 
           userForRegisterDto.Username=userForRegisterDto.Username.ToLower();
          
            if(await repository.userExists(userForRegisterDto.Username))
                  return BadRequest("UserName already Exists");
                var userToCreate=new User
                {
                    Username=userForRegisterDto.Username,
                };
                 var createdUser=await repository.Register(userToCreate,userForRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> login([FromBody]UserForLoginDto userForLoginDto)
        {
            var userFromRep=await repository.Login(userForLoginDto.Username.ToLower(),userForLoginDto.Password);
            if(userFromRep==null)
                return Unauthorized();
            var Claims=new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRep.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRep.Username)
            };

            var key=new SymmetricSecurityKey(Encoding.UTF8.
               GetBytes(configuration.GetSection("AppSettings:Token").Value));

            var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor=new  SecurityTokenDescriptor
            {
                Subject=new ClaimsIdentity(Claims),
                Expires= DateTime.Now.AddDays(1),
                SigningCredentials=creds
            };

            var tokenHandler=new JwtSecurityTokenHandler();

            var token =tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new 
            {
                token=tokenHandler.WriteToken(token)
            });
        }
    }
}