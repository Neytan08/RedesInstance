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
    public class ParkingController : Controller
    {

        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        ParkingDAO parkingDAO;

        public ParkingController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        // GET: MajorController
        public ActionResult Index()
        { 
            return View();
        }

        public IActionResult Insert([FromBody] Parking parking)
        {

            parkingDAO = new ParkingDAO(_configuration);

            //if (userDAO.Get(user.Email).Email == null)
            //{

           // parkingDAO.Insert(parking);
            return Ok(parkingDAO.Insert(parking));
            //}
            //else
            //{
            //    return Error();
            //}
        }


        public IActionResult Get()
        {
            parkingDAO = new ParkingDAO(_configuration);
            return Ok(parkingDAO.Get());

        }

        public IActionResult GetById([FromBody] Parking parking)
        { 
            parkingDAO = new ParkingDAO(_configuration);
            Parking parking_Res = parkingDAO.Get(parking);

            return Ok(parking_Res);

        }

        public IActionResult Update([FromBody] Parking parking)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            parkingDAO = new ParkingDAO(_configuration);
            return Ok(parkingDAO.Update(parking));

        }

        public IActionResult Delete([FromBody] Parking parking)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            parkingDAO = new ParkingDAO(_configuration);

            return Ok(parkingDAO.Delete(parking));

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
