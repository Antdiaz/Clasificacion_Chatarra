using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Services.Interfaces;
using karma.webapi.Binders;
using karma.webapi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace karma.webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private IPedidoService _pedidoService;

        public PedidoController(IPedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        /// <summary>
        /// API que agrega un Pedido nuevo, y lo retorna.
        /// </summary>
        [HttpPost("addPedido")]
        public IActionResult AddPedido(
            [ModelBinder(typeof(ClientBinder))] ClientToken cliente,
            [FromForm] PedidoDTO pedido)
        {
            List<PedidoArchivo> Archivos = new List<PedidoArchivo>();
            if (pedido.Archivos != null)
            {
                foreach (FormFile archivo in pedido.Archivos)
                {
                    MemoryStream ms = new MemoryStream();
                    archivo.CopyTo(ms);

                    PedidoArchivo pedidoArchivo = new PedidoArchivo
                    {
                        Nombre = archivo.FileName,
                        Archivo = ms.ToArray(),
                        Tipo = archivo.ContentType,
                        NombrePcMod = cliente.NombrePc,
                        ClaUsuarioMod = cliente.ClaUsuario
                    };

                    Archivos.Add(pedidoArchivo);
                }
            }
            var pedidoModel = new Pedido
            {
                ClaProducto = pedido.ClaProducto,
                ClaUsuario = pedido.ClaUsuario,
                ClaUnidad = pedido.ClaUnidad,
                Cantidad = pedido.Cantidad,
                Comentarios = pedido.Comentarios,
                FechaEntrega = pedido.FechaEntrega,
                ClaEstatus = pedido.ClaEstatus,
                PrecioTotal = pedido.PrecioTotal,
                Archivos = Archivos
            };

            return Ok(this._pedidoService.AddPedido(pedidoModel));
        }

        /// <summary>
        /// API retorna un pedido a partir del claUsuario y claPedido.
        /// </summary>
        [HttpGet("getPedidoUsuario/{claUsuario}/{claPedido}")]
        public IActionResult GetPedidoUsuario([Required] int claUsuario, [Required] int claPedido)
        {
            return Ok(this._pedidoService.GetPedidoUsuario(claUsuario, claPedido));
        }

        /// <summary>
        /// API retorna los pedidos a partir del claUsuario.
        /// </summary>
        [HttpGet("getPedidosUsuario/{claUsuario}")]
        public IActionResult GetPedidosUsuario([Required] int claUsuario)
        {
            return Ok(this._pedidoService.GetPedidosUsuario(claUsuario));
        }

        /// <summary>
        /// API retorna los pedidos a partir del claProducto.
        /// </summary>
        [HttpGet("getPedidosProducto/{claProducto}")]
        public IActionResult GetPedidosProducto([Required] int claProducto)
        {
            return Ok(this._pedidoService.GetPedidosProducto(claProducto));
        }

        /// <summary>
        /// API retorna los pedidos a partir del claUsuario para ser graficados.
        /// </summary>
        [HttpGet("getPedidosUsuarioGrafica/{claUsuario}")]
        public IActionResult GetPedidosUsuarioGrafica([Required] int claUsuario)
        {
            return Ok(this._pedidoService.GetPedidosUsuarioGrafica(claUsuario));
        }
    }
}