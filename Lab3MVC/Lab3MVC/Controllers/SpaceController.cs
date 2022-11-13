using Lab3MVC.Models;
using Lab3MVC.Models.Data;
using Lab3MVC.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Diagnostics;
namespace Lab3MVC.Controllers
{
    public class SpaceController : Controller
    {

        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        SpaceDAO spaceDAO;

        public SpaceController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            //TODO:instantiate studentDAO only once here

        }


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Insert([FromBody] Space space)
        {

            spaceDAO = new SpaceDAO(_configuration);

            //if (userDAO.Get(user.Email).Email == null)
            //{

            int resultToReturn = spaceDAO.Insert(space);
            return Ok(resultToReturn);
            //}
            //else
            //{
            //    return Error();
            //}
        }


        public IActionResult Get([FromBody] Parking parking)
        {
            spaceDAO = new SpaceDAO(_configuration);
            return Ok(spaceDAO.Get(parking.Id));

        }

        public IActionResult GetById(int id)
        {
            spaceDAO = new SpaceDAO(_configuration);
            Space space = spaceDAO.GetId(id);

            return Ok(space);

        }


        public IActionResult Update([FromBody] Space space, string option)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            spaceDAO = new SpaceDAO(_configuration);
            return Ok(spaceDAO.Update(space, option));

        }

        public IActionResult Delete([FromBody] Space space)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            spaceDAO = new SpaceDAO(_configuration);

            return Ok(spaceDAO.Delete(space));

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