using System.ComponentModel.DataAnnotations;
using karma.domain.Models.Entity;
using karma.domain.Services.Interfaces;
using karma.webapi.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace karma.webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private IProductoService _productoService;

        public ProductoController(IProductoService productoService)
        {
            _productoService = productoService;
        }
        /// <summary>
        /// API que retorna todos los productos
        /// </summary>
        [HttpGet("getProductos")]
        public IActionResult GetProductos()
        {
            return Ok(this._productoService.GetProductos());
        }
        /// <summary>
        /// API que retorna un producto a partir del claProducto
        /// </summary>
        /// <param name="claProducto"></param>
        [HttpGet("getProducto/{claProducto}")]
        public IActionResult GetProducto([Required]int claProducto)
        {
            return Ok(this._productoService.GetProducto(claProducto));
        }
        /// <summary>
        /// API que agrega un Producto nuevo
        /// </summary>
        /// <param name="producto"></param>
        [HttpPost("addProducto")]
        public IActionResult AddProducto([FromBody] ProductoDTO producto)
        {
            var productoModel = new Producto {
                NomProducto = producto.NomProducto,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                ClaUnidad = producto.ClaUnidad
            };
            return Ok(this._productoService.AddProducto(productoModel));
        }

        /// <summary>
        /// API que actualiza un Producto
        /// </summary>
        /// <param name="claProducto"></param>
        /// <param name="nomProducto"></param>
        /// <param name="producto"></param>
        [HttpPut("updateProducto/{claProducto}")]
        public IActionResult UpdateProducto([Required]int claProducto, [Required]string nomProducto, [FromBody] ProductoDTO producto)
        {
            var productoModel = new Producto {
                ClaProducto = claProducto,
                NomProducto = nomProducto,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                ClaUnidad = producto.ClaUnidad,
                BajaLogica = producto.BajaLogica
            };
            return Ok(this._productoService.UpdateProducto(productoModel));
        }
    }
}