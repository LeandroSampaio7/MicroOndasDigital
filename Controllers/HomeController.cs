using MicroOndasDigital.Models;
using MicroOndasDigital.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace MicroOndasDigital.Controllers
{
	public class HomeController : Controller
	{

		private readonly IMicroondasRepositorio _microondasRepositorio;
		public HomeController(IMicroondasRepositorio microondasRepositorio)
		{
			_microondasRepositorio = microondasRepositorio;

		}

		//private readonly ILogger<HomeController> _logger;

		//public HomeController(ILogger<HomeController> logger)
		//{
		//	_logger = logger;
		//}

		public IActionResult Index()
		{
			return View();
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

		public IActionResult Adicionar(AlimentosModel alimentos)
		{

			_microondasRepositorio.Adicionar(alimentos);
			return new JsonResult(alimentos);
		}

		public IActionResult Excluir(int id)
		{
			_microondasRepositorio.Excluir(id);
			var result = new
			{
				Success = true,
				Message = "Excluido com sucesso",
				Codigo = "0"
			};
			return Json(result);
		}

		public IActionResult Alterar(AlimentosModel alimentos)
		{
			_microondasRepositorio.Alterar(alimentos);
			return RedirectToAction("Index");
		}

		public IActionResult Listar()
		{
			List<AlimentosModel> alimentos = _microondasRepositorio.Listar();
			return new JsonResult(alimentos);
		}



	}
}