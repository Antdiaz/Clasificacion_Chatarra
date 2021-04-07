using System;
using System.Linq;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.domain.Services
{
    public class UsuarioService : IUsuarioService
    {
        readonly IKrakenRepository _krakenRepository;
        readonly IDataRepository _dataRepository;
        public UsuarioService(IKrakenRepository krakenRepository, IDataRepository dataRepository)
        {
            _krakenRepository = krakenRepository;
            _dataRepository = dataRepository;
        }

        /// <summary>
        /// Método que obtiene los roles del usuario
        /// </summary>
        /// <param name="token"></param>
        /// <returns>KarmaResponse con los roles</returns>
        public KarmaResponse GetUsuariosRol(string token)
        {
            var body = new {
                columnas = "ClaUsuario, NomUsuario",
                condicion = "NomUsuario LIKE '%dario %' ORDER BY NomUsuario ASC",
                tipoEstructura = 5
            };

            int claProducto = 8;
            int idEntidad = 7;

            var usuariosKraken = _krakenRepository.GetEntityData<Usuario>(token, claProducto, idEntidad, body);

            var usuariosRol = _dataRepository.GetEntityData<Usuario>("krmsch.krmCatUsuarioRol");

            var _usuarios =
                from a in usuariosKraken
                join b in usuariosRol on a.ClaUsuario equals b.ClaUsuario
                select new Usuario { 
                    ClaUsuario = a.ClaUsuario,
                    NomUsuario = a.NomUsuario,
                    Rol = b.Rol 
                };

            KarmaResponse result = new KarmaResponse
            {
                Data = _usuarios
            };

            return result;
        }
    }
}