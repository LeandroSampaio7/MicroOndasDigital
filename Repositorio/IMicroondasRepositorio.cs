using MicroOndasDigital.Models;

namespace MicroOndasDigital.Repositorio
{
	public interface IMicroondasRepositorio
	{
		AlimentosModel Adicionar(AlimentosModel alimentos);
		AlimentosModel Excluir(int id);
		AlimentosModel Alterar(AlimentosModel alimentos);
		List<AlimentosModel> Listar();
	}
}
