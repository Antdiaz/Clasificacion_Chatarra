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
    public class ProductoRepository : IEntityRepository<Producto>
    {
        private const string PRODUCTO_IU = "krmsch.KrmProductoIU";
        private const string PRODUCTO_SEL = "krmsch.KrmProductoSel";
        private readonly IAppSettings _appSettings;
        public ProductoRepository(IAppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        /// <summary>
        /// Método que hace conexión con la tabla SQL PRODUCTO_IU y añade un producto
        /// </summary>
        /// <param name="producto"></param>
        /// <returns>Regresa el producto añadido</returns>
        public Producto Add(Producto producto)
        {
            var _producto = new Producto();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", 0);
                parameters.Add("@psNomProducto", producto.NomProducto);
                parameters.Add("@psDescripcion", producto.Descripcion);
                parameters.Add("@pnPrecio", producto.Precio);
                parameters.Add("@pnClaUnidad", producto.ClaUnidad);
                parameters.Add("@pnBajaLogica", 0);
                parameters.Add("@pnClaUsuarioMod", 0);
                parameters.Add("@psNombrePcMod", "DLABSDEV");

                _producto = con.Query<Producto>(
                    PRODUCTO_IU, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _producto;
        }
        /// <summary>
        /// Método que hace conexión con la tabla de SQL PRODUCTO_IU y actualiza un producto 
        /// </summary>
        /// <param name="producto"></param>
        /// <returns>Regresa el producto actualizado</returns>
        public Producto Update(Producto producto)
        {
            var _producto = new Producto();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", producto.ClaProducto);
                parameters.Add("@psNomProducto", producto.NomProducto);
                parameters.Add("@psDescripcion", producto.Descripcion);
                parameters.Add("@pnPrecio", producto.Precio);
                parameters.Add("@pnClaUnidad", producto.ClaUnidad);
                parameters.Add("@pnBajaLogica", producto.BajaLogica);
                parameters.Add("@pnClaUsuarioMod", 0);
                parameters.Add("@psNombrePcMod", "DLABSDEV");

                _producto = con.Query<Producto>(
                    PRODUCTO_IU, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _producto;
        }
        /// <summary>
        /// Método que hace conexión con la tabla de SQL PRODUCTO_SEL y obtiene el producto
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Regresa el producto especificado</returns>
        public Producto Get(int id)
        {
            var _producto = new Producto();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", id);

                _producto = con.Query<Producto>(
                    PRODUCTO_SEL, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _producto;
        }

        /// <summary>
        /// Método que hace conexión con la tabla de SQL PRODUCTO_SEL y obtiene todos los productos
        /// </summary>
        /// <returns>Regresa todos los productos existentes</returns>
         public IQueryable<Producto> GetAll()
        {
            IQueryable<Producto> _productos = null;

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", 0);

                _productos = con.Query<Producto>(
                    PRODUCTO_SEL, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).AsQueryable<Producto>();
            }

            return _productos;
        }

    }
}