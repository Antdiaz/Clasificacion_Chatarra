using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using karma.domain.Models.Entity;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.repository.sql.Repository
{
    //Implementar interface en repository karma.domain
    public class TiendaRepository : IEntityRepository<Tienda>
    {
        private const string TIENDA_IU = "krmsch.KrmTiendaIU";
        private const string TIENDA_SEL = "krmsch.KrmTiendaSel";
        private readonly IAppSettings _appSettings;
        public TiendaRepository(IAppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        /// <summary>
        /// Método que hace conexión con la tabla de SQL TIENDA_IU y añade una tienda
        /// </summary>
        /// <param name="tienda"></param>
        /// <returns>Regresa la tienda añadida</returns>
        public Tienda Add(Tienda tienda)
        {
            var _tienda = new Tienda();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaTienda", 0);
                parameters.Add("@psNomTienda", tienda.NomTienda);
                parameters.Add("@psDescripcion", tienda.Descripcion);
                parameters.Add("@pnBajaLogica", 0);
                parameters.Add("@pnClaUsuarioMod", 0);
                parameters.Add("@psNombrePcMod", "DLABSDEV");

                _tienda = con.Query<Tienda>(
                    TIENDA_IU, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _tienda;
        }
        /// <summary>
        /// Método que hace conexión con la tabla de SQL TIENDA_IU y actualiza una tienda
        /// </summary>
        /// <param name="tienda"></param>
        /// <returns>Actualiza la tienda especificada</returns>
        public Tienda Update(Tienda tienda)
        {
            var _tienda = new Tienda();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaTienda", tienda.ClaTienda);
                parameters.Add("@psNomTienda", tienda.NomTienda);
                parameters.Add("@psDescripcion", tienda.Descripcion);
                parameters.Add("@pnBajaLogica", tienda.BajaLogica);
                parameters.Add("@pnClaUsuarioMod", 0);
                parameters.Add("@psNombrePcMod", "DLABSDEV");

                _tienda = con.Query<Tienda>(
                    TIENDA_IU, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _tienda;
        }
        /// <summary>
        /// Método que hace conexión con la tabla de SQL TIENDA_SEL y obtiene la tienda
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Regresa la tienda especificada</returns>
        public Tienda Get(int id)
        {
            var _tienda = new Tienda();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaTienda", id);

                _tienda = con.Query<Tienda>(
                    TIENDA_SEL, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _tienda;
        }
        
        /// <summary>
        /// Método que hace conexión con la tabla de SQL TIENDA_SEL y obtiene todas las tiendas
        /// </summary>
        /// <returns>Regresa todas las tiendas</returns>
        public IQueryable<Tienda> GetAll()
        {
            IQueryable<Tienda> _tiendas = null;

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaTienda", 0);

                _tiendas = con.Query<Tienda>(
                    TIENDA_SEL, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).AsQueryable<Tienda>();
            }

            return _tiendas;
        }

    }
}