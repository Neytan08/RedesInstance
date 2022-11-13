using Lab3MVC.Models;
using Lab3MVC.Models.Data;
using Lab3MVC.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Lab3MVC.Models;
using System.Diagnostics;
namespace Lab3MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        StudentDAO studentDAO;
        UserDAO userDAO;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            //TODO:instantiate studentDAO only once here

        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Get()
        {
            studentDAO = new StudentDAO(_configuration);
            return Ok(studentDAO.Get());

        }


        public IActionResult GetByEmail(string email)
        {
            studentDAO = new StudentDAO(_configuration);
            Student student = studentDAO.Get(email);

            return Ok(student);

        }

        public IActionResult GetByEmailUser(string email)
        {
            userDAO = new UserDAO(_configuration);
            User user = userDAO.Get(email);

            return Ok(user);

        }


        public IActionResult Update([FromBody] Student student)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            studentDAO = new StudentDAO(_configuration);
            return Ok(studentDAO.Update(student));

        }


        public IActionResult Insert([FromBody] Student student)
        {

            studentDAO = new StudentDAO(_configuration);

            if (studentDAO.Get(student.Email).Email == null)
            {

                int resultToReturn = studentDAO.Insert(student);
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
    }
}