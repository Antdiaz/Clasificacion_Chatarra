using System.ComponentModel.DataAnnotations;
using karma.domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace karma.webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        /// <summary>
        /// API que retorna Usuarios obtenidos desde Kraken a los cuales
        /// se les hizo join con información interna.
        /// </summary>
        [HttpGet("getUsuariosRol")]
        public IActionResult GetUsuariosRol([FromHeader(Name = "x-access-token")][Required]string token)
        {
            return Ok(this._usuarioService.GetUsuariosRol(token));
        }
    }
}