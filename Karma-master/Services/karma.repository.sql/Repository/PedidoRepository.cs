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
    public class PedidoRepository : IPedidoRepository
    {
        private const string PEDIDO_IU = "krmsch.KrmPedidoIU";
        private const string PEDIDO_SEL = "krmsch.KrmPedidoSel";
        private const string PEDIDO_DASH = "krmsch.KrmPedidoDashSrv";
        private readonly IAppSettings _appSettings;
        public PedidoRepository(IAppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        /// <summary>
        /// Método que hace conexión con la tabla de SQL PEDIDO_IU y añade un Pedido
        /// </summary>
        /// <param name="pedido"></param>
        /// <returns>Regresa el pedido añadido</returns>
        public Pedido AddPedido(Pedido pedido)
        {
            var _pedido = new Pedido();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaPedido", 0);
                parameters.Add("@pnClaProducto", pedido.ClaProducto);
                parameters.Add("@pnClaUsuario", pedido.ClaUsuario);
                parameters.Add("@pnClaUnidad", pedido.ClaUnidad);
                parameters.Add("@pnCantidad", pedido.Cantidad);
                parameters.Add("@psComentarios", pedido.Comentarios);
                parameters.Add("@psFechaEntrega", pedido.FechaEntrega.ToString("yyyy-MM-dd"));
                parameters.Add("@pnClaEstatus", pedido.ClaEstatus);
                parameters.Add("@pnPrecioTotal", pedido.PrecioTotal);
                parameters.Add("@pnBajaLogica", 0);
                parameters.Add("@pnClaUsuarioMod", 0);
                parameters.Add("@psNombrePcMod", "DLABSDEV");

                _pedido = con.Query<Pedido>(
                    PEDIDO_IU, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _pedido;
        }

        /// <summary>
        /// Método que hace conexión con la tabla de SQL PEDIDO_SEL y obtiene todos los pedidos
        /// </summary>
        /// <returns>Regresa todos los pedidos</returns>
        public IQueryable<Pedido> GetAll()
        {
            IQueryable<Pedido> _pedidos = null;

            using (System.Data.IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                _pedidos = con.Query<Pedido>(
                    PEDIDO_SEL,
                    commandType: CommandType.StoredProcedure
                    ).AsQueryable<Pedido>();
            }

            return _pedidos;
        }
        
        /// <summary>
        /// Método que hace conexión con la tabla SQL PEDIDO_DASH y obtiene la gráfica de los pedidos
        /// </summary>
        /// <param name="claUsuario"></param>
        /// <returns>Regresa la gráfica de los pedidos de los usuarios</returns>
        public IQueryable<PedidoGrafica> GetPedidosUsuarioGrafica(int claUsuario)
        {
            IQueryable<PedidoGrafica> _pedidos = null;

            using (System.Data.IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaUsuario", claUsuario);

                _pedidos = con.Query<PedidoGrafica>(
                    PEDIDO_DASH,
                    parameters,
                    commandType: CommandType.StoredProcedure
                    ).AsQueryable<PedidoGrafica>();
            }

            return _pedidos;
        }
    }
}