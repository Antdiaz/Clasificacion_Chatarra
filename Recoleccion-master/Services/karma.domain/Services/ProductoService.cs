using System;
using System.Collections.Generic;
using System.Linq;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.domain.Services
{
    public class ProductoService : IProductoService
    {
        readonly IEntityRepository<Producto> _productoRepository;
        public ProductoService(IEntityRepository<Producto> productoRepository)
        {
            _productoRepository = productoRepository;
        }

        /// <summary>
        /// Método que retorna todos los productos
        /// </summary>
        /// <returns>KarmaResponse con los Productos</returns>
        public KarmaResponse GetProductos()
        {
            var productos = _productoRepository.GetAll().OrderBy(x => x.NomProducto);

            KarmaResponse result = new KarmaResponse
            {
                Data = productos
            };

            return result;
        }

        /// <summary>
        /// Método que regresa el producto con la clave específica
        /// </summary>
        /// <param name="claProducto"></param>
        /// <returns>KarmaResponse con el producto</returns>
        public KarmaResponse GetProducto(int claProducto)
        {
            var producto = _productoRepository.Get(claProducto);

            KarmaResponse result = new KarmaResponse
            {
                Data = producto
            };

            return result;
        }

        /// <summary>
        /// Método que añade un producto
        /// </summary>
        /// <param name="producto"></param>
        /// <returns>KarmaResponse con el producto añadido</returns>
        public KarmaResponse AddProducto(Producto producto)
        {
            var _producto = _productoRepository.Add(producto);

            KarmaResponse result = new KarmaResponse
            {
                Data = _producto
            };

            return result;
        }

        /// <summary>
        /// Método que actualiza un producto
        /// </summary>
        /// <param name="producto"></param>
        /// <returns>KarmaResponse con el producto actualizado</returns>
        public KarmaResponse UpdateProducto(Producto producto)
        {
            var _producto = _productoRepository.Update(producto);

            KarmaResponse result = new KarmaResponse
            {
                Data = _producto
            };

            return result;
        }
    }
}