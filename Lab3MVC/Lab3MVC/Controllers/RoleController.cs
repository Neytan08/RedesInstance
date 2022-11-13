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
    public class RoleController : Controller
    {

        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        
        RoleDAO roleDAO;

        public RoleController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        // GET: MajorController
        public ActionResult Index()
        { 
            return View();
        }

        public IActionResult Insert([FromBody] Role role)
        {

            roleDAO = new RoleDAO(_configuration);

            int resultToReturn = roleDAO.Insert(role);
            return Ok(resultToReturn);

        }


        public IActionResult Get()
        {
            roleDAO = new RoleDAO(_configuration);
            return Ok(roleDAO.Get());

        }

        public IActionResult GetByName([FromBody] Role role)
        {
            roleDAO = new RoleDAO(_configuration);
            Role role_Res = roleDAO.Get(role.Name);

            return Ok(role_Res);

        }

        public IActionResult Update([FromBody] Role role)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            roleDAO = new RoleDAO(_configuration);
            return Ok(roleDAO.Update(role));

        }

        public IActionResult Delete([FromBody] Role role)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            roleDAO = new RoleDAO(_configuration);

            return Ok(roleDAO.Delete(role));

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
