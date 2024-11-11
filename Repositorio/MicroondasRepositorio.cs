using MenuDigital.Data;
using MicroOndasDigital.Models;

namespace MicroOndasDigital.Repositorio
{
	public class MicroondasRepositorio : IMicroondasRepositorio
	{

		private readonly BancoContext _bancoContext;
		public MicroondasRepositorio(BancoContext bancoContext)
		{
			_bancoContext = bancoContext;
		}


		public AlimentosModel Adicionar(AlimentosModel alimentos)
		{
			_bancoContext.Add(alimentos);
			_bancoContext.SaveChanges();
			return alimentos;
		}

		public AlimentosModel Buscar(int id)
		{
			#pragma warning disable CS8603
			return _bancoContext.PROGRAMAS_PRE_DEFINIDOS.FirstOrDefault(x => x.ID == id);

		}

		public AlimentosModel Excluir(int id)
		{
			AlimentosModel alimentosDB = Buscar(id);
			if (alimentosDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do produto");

			_bancoContext.Remove(alimentosDB);
			_bancoContext.SaveChanges();
			return alimentosDB;
		}

		public AlimentosModel Alterar(AlimentosModel alimentos)
		{
			AlimentosModel alimentosDB = Buscar(alimentos.ID);
			if (alimentosDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do produto");

			alimentosDB.PROGRAMA = alimentos.PROGRAMA;
			alimentosDB.ALIMENTO = alimentos.ALIMENTO;
			alimentosDB.TEMPO = alimentos.TEMPO;
			alimentosDB.POTENCIA = alimentos.POTENCIA;
			alimentosDB.DESCRICAO = alimentos.DESCRICAO;

			_bancoContext.Update(alimentosDB);
			_bancoContext.SaveChanges();

			return alimentosDB;
		}

		public List<AlimentosModel> Listar()
		{
			return _bancoContext.PROGRAMAS_PRE_DEFINIDOS.ToList();
		}
	}
}
