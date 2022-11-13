using Lab3MVC.Models.Data;
using Lab3MVC.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using Lab3MVC.Models;
using System.Diagnostics;

namespace Lab3MVC.Controllers
{
    public class UserController : Controller
    {

        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        UserDAO userDAO;

        public UserController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Get()
        {
            userDAO = new UserDAO(_configuration);
            return Ok(userDAO.Get());

        }

        public IActionResult GetAdmin()
        {
            userDAO = new UserDAO(_configuration);
            return Ok(userDAO.GetAdmin());

        }

        public IActionResult GetDependent()
        {
            userDAO = new UserDAO(_configuration);
            return Ok(userDAO.GetDependent());

        }

        public IActionResult GetByEmail(string email)
        {
        
            userDAO = new UserDAO(_configuration);
            User user = userDAO.Get(email);

            return Ok(user);

        }

        public IActionResult Role([FromBody] string email)
        { 
            userDAO = new UserDAO(_configuration);
            User user = userDAO.Get(email);

            return Ok(user.Role.Id);

        }

        public IActionResult Sesion([FromBody] string email)
        {
            userDAO = new UserDAO(_configuration);
            User user = userDAO.Get(email);

            return Ok(user.Id);
        }

        public IActionResult Update([FromBody] User user)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            userDAO = new UserDAO(_configuration);
            return Ok(userDAO.Update(user));

        }

        public IActionResult Delete([FromBody] User user)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            userDAO = new UserDAO(_configuration);

            return Ok(userDAO.Delete(user));

        }


        public IActionResult Insert([FromBody] User user)
        {

            userDAO = new UserDAO(_configuration);

            if (userDAO.Get(user.Email).Email == null)
            {

                int resultToReturn = userDAO.Insert(user);
                return Ok(resultToReturn);
        }
            else
            {
                return Error();
    }
}
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        //////////////////////////////////Log in////////////////////////////////////////
        public ActionResult LogInClient([FromBody] User userLog)
        {
            

            userDAO = new UserDAO(_configuration);
            if (userDAO.Get(userLog.Email) != null)
            {
                if (ValidateClient(userDAO.Get(userLog.Email), userLog))
                {
                    //HttpContext.Session.SetString("SessionUser", JsonConvert.SerializeObject(userLog));
                    return Ok(1);
                }
            }

            return Ok(0);
        }

        public Boolean ValidateClient(User user,User userLog)
        {
            if (user.Email != null)
            {
                if (user.Email.Equals(userLog.Email) && user.Password.Equals(userLog.Password))
                {

                    return true;
                }
            }
            return false;
            
        }

        


    }
}