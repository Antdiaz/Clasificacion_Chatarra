using System;
using System.Linq;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.domain.Services
{
    public class TiendaService : ITiendaService
    {
        readonly IEntityRepository<Tienda> _tiendaRepository;

        public TiendaService(IEntityRepository<Tienda> tiendaRepository)
        {
            _tiendaRepository = tiendaRepository;
        }

        /// <summary>
        /// Método que retorna las tiendas
        /// </summary>
        /// <returns>KarmaResponse con las Tiendas</returns>
        public KarmaResponse GetTiendas()
        {
            var tiendas = _tiendaRepository.GetAll().OrderBy(x => x.NomTienda);

            KarmaResponse result = new KarmaResponse
            {
                Data = tiendas
            };

            return result;
        }
        /// <summary>
        /// Método que retorna la tienda
        /// </summary>
        /// <param name="claTienda"></param>
        /// <returns>KarmaResponse con la Tienda</returns>
        public KarmaResponse GetTienda(int claTienda)
        {
            var tienda = _tiendaRepository.Get(claTienda);

            KarmaResponse result = new KarmaResponse
            {
                Data = tienda
            };

            return result;
        }

        /// <summary>
        /// Método que agrega una tienda
        /// </summary>
        /// <param name="tienda"></param>
        /// <returns>KarmaResponse con la tienda nueva</returns>
        public KarmaResponse AddTienda(Tienda tienda)
        {
            var _tienda = _tiendaRepository.Add(tienda);

            KarmaResponse result = new KarmaResponse
            {
                Data = _tienda
            };

            return result;
        }

        /// <summary>
        /// Método que actualiza una tienda
        /// </summary>
        /// <param name="tienda"></param>
        /// <returns>KarmaResponse con la tienda actualizada</returns>
        public KarmaResponse UpdateTienda(Tienda tienda)
        {
            var _tienda = _tiendaRepository.Update(tienda);

            KarmaResponse result = new KarmaResponse
            {
                Data = _tienda
            };

            return result;
        }
    }
}