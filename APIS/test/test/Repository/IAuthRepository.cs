using System.Threading.Tasks;
using test.Models;

namespace test.Repository
{
    public interface IAuthRepository 
    {
         Task<User> Register(User user,string password);
         Task<User> Login (string username,string password);
         Task<bool> userExists(string username);
         
    }
}