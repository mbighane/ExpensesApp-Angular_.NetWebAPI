using ExpensesAPI.Data;
using ExpensesAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;

namespace ExpensesAPI.Controllers
{
    [System.Web.Http.Cors.EnableCors("*", "*", "*")]
    [RoutePrefix("auth")]
    public class AuthenticationController : ApiController
    {
        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody]User user)
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                return BadRequest("Enter your username and password");

            try
            {
                using (var context = new AppDbContext())
                {
                    var exists = context.Users.Any(n => n.UserName == user.UserName && n.Password == user.Password);
                    if (exists) return Ok(CreateToken(user));

                    return BadRequest("Wrong credentials");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("register")]
        [HttpPost]
        public IHttpActionResult Register([FromBody]User user)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var exists = dbContext.Users.Any(n => n.UserName == user.UserName);
                    if (exists)
                        return BadRequest("User already exists");
                    dbContext.Users.Add(user);
                    dbContext.SaveChanges();
                    return Ok(CreateToken(user));

                }

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        private JwtPackage CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, user.UserName)
            });


            const string secretKey = "your security key goes here";
            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(secretKey));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);


            var token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(null,null,
                claims,null,null,null, signingCredentials
                );

            var tokenString = tokenHandler.WriteToken(token);
            return new JwtPackage()
            {
                UserName = user.UserName,
                Token = tokenString
            };
        }


    }

    public class JwtPackage
    {
        public string Token { get; set; }
        public string UserName { get; set; }
    }
}
