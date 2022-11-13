using Lab3MVC.Models;
using Lab3MVC.Models.Data;
using Lab3MVC.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Lab3MVC.Controllers
{
    public class RateController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        RateDAO rateDAO;

        public RateController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public ActionResult Index()
        {
            return View();
        }

        public IActionResult Get()
        {
            rateDAO = new RateDAO(_configuration);
            return Ok(rateDAO.Get());

        }

        public IActionResult GetById(int id)
        {
            rateDAO = new RateDAO(_configuration);
            Rate rate = rateDAO.Get(id);

            return Ok(rate);

        }

        public IActionResult Update([FromBody] Rate rate)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            rateDAO = new RateDAO(_configuration);
            return Ok(rateDAO.Update(rate));

        }

        public IActionResult Delete([FromBody] int id)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            rateDAO = new RateDAO(_configuration);

            return Ok(rateDAO.Delete(id));

        }


        public IActionResult Insert([FromBody] Rate rate)
        {
            rateDAO = new RateDAO(_configuration);

                int resultToReturn = rateDAO.Insert(rate);
                return Ok(resultToReturn);
         
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
