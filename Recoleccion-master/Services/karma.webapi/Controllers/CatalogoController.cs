using karma.domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace karma.webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CatalogoController : ControllerBase
    {
        private ICatalogoService _catalogoService;

        public CatalogoController(ICatalogoService catalogoService)
        {
            _catalogoService = catalogoService;
        }

        /// <summary>
        /// API que retorna el catálogo de Estatus.
        /// </summary>
        [HttpGet("getEstatus")]
        public IActionResult GetEstatus()
        {
            return Ok(this._catalogoService.GetEstatus());
        }

        /// <summary>
        /// API que retorna el catálogo de Unidades.
        /// </summary>
        [HttpGet("getUnidades")]
        public IActionResult GetUnidades()
        {
            return Ok(this._catalogoService.GetUnidades());
        }

        /// <summary>
        /// API que retorna la informacion del sistema.
        /// </summary>
        [HttpGet("getInformacion")]
        public IActionResult GetInformacion()
        {
            return Ok(this._catalogoService.GetInformacion());
        }
    }
}