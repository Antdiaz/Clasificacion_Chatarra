using System.Collections.Generic;
using System.Linq;

namespace karma.domain.Repository
{
    public interface IDataRepository
    {
        IQueryable<T> GetStoreProcedureData<T>(string storeProcedure, Dictionary<string, object> parameters = null);
        IQueryable<T> GetEntityData<T>(string entity, Dictionary<string, object> parameters = null);
        IQueryable<T> GetQueryData<T>(string query, Dictionary<string, object> parameters = null);
        List<dynamic> GetStoreProcedureData(string storeProcedure, Dictionary<string, object> parameters = null);
        T AddStoreProcedureData<T>(string storeProcedure, Dictionary<string, object> parameters = null);
        T UpdateStoreProcedureData<T>(string storeProcedure, Dictionary<string, object> parameters = null);
    }
}