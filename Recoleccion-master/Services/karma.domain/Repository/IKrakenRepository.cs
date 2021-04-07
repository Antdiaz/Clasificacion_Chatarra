using System.Collections.Generic;

namespace karma.domain.Repository
{
    public interface IKrakenRepository
    {
        List<T> GetEntityData<T>(string token, int claProducto, int idEntidad, object body);
        List<T> GetStoredProcedureData<T>(string token, int claProducto, int idEntidad, object body);
    }
}