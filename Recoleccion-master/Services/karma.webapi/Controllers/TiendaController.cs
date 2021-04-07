using System.ComponentModel.DataAnnotations;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Services.Interfaces;
using karma.webapi.Binders;
using karma.webapi.DTOs;
using karma.webapi.Filters;
using Microsoft.AspNetCore.Mvc;

namespace karma.webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TiendaController : ControllerBase
    {
        private ITiendaService _tiendaService;

        public TiendaController(ITiendaService tiendaService)
        {
            _tiendaService = tiendaService;
        }

        /// <summary>
        /// API que retorna las Tiendas existentes.
        /// </summary>
        [HttpGet("getTiendas")]
        [AuthorizeFilterAttribute]
        public IActionResult GetTiendas(
            [Required][FromHeader(Name = "x-access-token")]string accessToken, 
            [ModelBinder(typeof(ClientBinder))]ClientToken client)
        {
            return Ok(this._tiendaService.GetTiendas());
        }

        /// <summary>
        /// API que retorna una Tienda a partir de su claTienda.
        /// </summary>
        [HttpGet("getTienda/{claTienda}")]
        [AuthorizeFilterAttribute]
        public IActionResult GetTienda(
            [Required][FromHeader(Name = "x-access-token")]string accessToken, 
            [ModelBinder(typeof(ClientBinder))]ClientToken client,
            [Required]int claTienda)
        {
            return Ok(this._tiendaService.GetTienda(claTienda));
        }

        /// <summary>
        /// API que agrega una Tienda nueva, y la retorna.
        /// </summary>
        [HttpPost("addTienda")]
        [AuthorizeFilterAttribute]
        public IActionResult AddTienda(
            [Required][FromHeader(Name = "x-access-token")]string accessToken, 
            [ModelBinder(typeof(ClientBinder))]ClientToken client,
            [FromBody] TiendaDTO tienda)
        {
            var tiendaModel = new Tienda {
                NomTienda = tienda.NomTienda,
                Descripcion = tienda.Descripcion
            };
            return Ok(this._tiendaService.AddTienda(tiendaModel));
        }

        /// <summary>
        /// API que actualiza una Tienda a partir de su claTienda, y la retorna.
        /// </summary>
        [HttpPut("updateTienda/{claTienda}")]
        [AuthorizeFilterAttribute]
        public IActionResult UpdateTienda(
            [Required][FromHeader(Name = "x-access-token")]string accessToken, 
            [ModelBinder(typeof(ClientBinder))]ClientToken client,
            [Required]int claTienda, [FromBody] TiendaDTO tienda)
        {
            var tiendaModel = new Tienda {
                ClaTienda = claTienda,
                NomTienda = tienda.NomTienda,
                Descripcion = tienda.Descripcion,
                BajaLogica = tienda.BajaLogica
            };
            return Ok(this._tiendaService.UpdateTienda(tiendaModel));
        }
    }
}