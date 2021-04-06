using System;
using System.Collections.Generic;
using System.Linq;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.domain.Services
{
    public class CatalogoService : ICatalogoService
    {
        readonly IDataRepository _dataRepository;

        public CatalogoService(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        /// <summary>
        /// Método que retorna el catálogo de Estatus.
        /// </summary>
        /// <returns>KarmaResponse con los Estatus.</returns>
        public KarmaResponse GetEstatus()
        {
            var estatus = _dataRepository.GetEntityData<Estatus>("krmsch.krmCatEstatus").OrderBy(x => x.NomEstatus);

            KarmaResponse result = new KarmaResponse
            {
                Data = estatus
            };

            return result;
        }

        /// <summary>
        /// Método que retorna el catálogo de Uniades.
        /// </summary>
        /// <returns>KarmaResponse con las Unidades.</returns>
        public KarmaResponse GetUnidades()
        {
            var unidades = _dataRepository.GetEntityData<Unidad>("krmsch.krmCatUnidad").OrderBy(x => x.NomUnidad);

            KarmaResponse result = new KarmaResponse
            {
                Data = unidades
            };

            return result;
        }

        public object GetInformacion()
        {
            var _informacion = _dataRepository.GetStoreProcedureData("krmsch.KrmInformacionSel");

            var data = new Dictionary<string, object>();

            for (int i = 0; i < _informacion.Count; i++)
            {
                data.Add("Result" + i.ToString(), _informacion[i]); 
            }

            return data;
        }
    }
}