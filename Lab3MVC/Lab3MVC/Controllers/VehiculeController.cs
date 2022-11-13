using Lab3MVC.Models;
using Lab3MVC.Models.Data;
using Lab3MVC.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Lab3MVC.Controllers
{
    public class VehiculeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        VehiculeDAO vehiculeDAO;



        public VehiculeController(ILogger<HomeController> logger, IConfiguration configuration)
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
            try
            {
                vehiculeDAO = new VehiculeDAO(_configuration);
                return Ok(vehiculeDAO.Get());
            }
            catch (Exception)
            {

                return Error();
            }
        }

        public IActionResult GetVehiculeUser([FromBody] Vehicule vehicule)
        {      
            try
            {
                vehiculeDAO = new VehiculeDAO(_configuration);
                return Ok(vehiculeDAO.GetVehiculeUser(vehicule));
            }
            catch (Exception)
            {

                return Error();
            }
        }


        public IActionResult GetByLicensePlate(string license_Plate)
        {
            vehiculeDAO = new VehiculeDAO(_configuration);
            Vehicule vehicule = vehiculeDAO.Get(license_Plate);

            return Ok(vehicule);

        }


        public IActionResult Update([FromBody] Vehicule vehicule)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            vehiculeDAO = new VehiculeDAO(_configuration);
            return Ok(vehiculeDAO.Update(vehicule));

        }

        public IActionResult Delete([FromBody] Vehicule vehicule)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            vehiculeDAO = new VehiculeDAO(_configuration);

            return Ok(vehiculeDAO.Delete(vehicule));

        }


        public IActionResult Insert([FromBody] Vehicule vehicule)
        {

            vehiculeDAO = new VehiculeDAO(_configuration);

            if (vehiculeDAO.Get(vehicule.License_Plate).License_Plate == null)
            {

                int resultToReturn = vehiculeDAO.Insert(vehicule);
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


