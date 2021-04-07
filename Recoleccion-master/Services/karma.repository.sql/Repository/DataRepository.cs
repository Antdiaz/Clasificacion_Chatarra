using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.repository.sql.Repository
{
    public class DataRepository : IDataRepository
    {
        private readonly IAppSettings _appSettings;

        public DataRepository(IAppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        public T AddStoreProcedureData<T>(string storeProcedure, Dictionary<string, object> parameters = null)
        {
            T _result = (T)Activator.CreateInstance(typeof(T));
            DynamicParameters sqlParams = new DynamicParameters();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                if (parameters != null)
                {
                    sqlParams = new DynamicParameters(parameters);
                }

                _result = con.Query<T>(
                    storeProcedure,
                    sqlParams,
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault<T>();
            }

            return _result;
        }

        public T UpdateStoreProcedureData<T>(string storeProcedure, Dictionary<string, object> parameters = null)
        {
            T _result = (T)Activator.CreateInstance(typeof(T));
            DynamicParameters sqlParams = new DynamicParameters();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                if (parameters != null)
                {
                    sqlParams = new DynamicParameters(parameters);
                }

                _result = con.Query<T>(
                    storeProcedure,
                    sqlParams,
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault<T>();
            }

            return _result;
        }

        public IQueryable<T> GetEntityData<T>(string entity, Dictionary<string, object> parameters = null)
        {
            IQueryable<T> _result = null;

            DynamicParameters sqlParams = new DynamicParameters();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }
                
                if (parameters != null)
                {
                    sqlParams = new DynamicParameters(parameters);
                }

                _result = con.Query<T>(
                    "SELECT * FROM " + entity,
                    sqlParams,
                    commandType: CommandType.Text
                    ).AsQueryable<T>();
            }

            return _result;
        }

        public IQueryable<T> GetQueryData<T>(string query, Dictionary<string, object> parameters = null)
        {
            IQueryable<T> _result = null;

            DynamicParameters sqlParams = new DynamicParameters();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }
                
                if (parameters != null)
                {
                    sqlParams = new DynamicParameters(parameters);
                }

                _result = con.Query<T>(
                    query,
                    sqlParams,
                    commandType: CommandType.Text
                    ).AsQueryable<T>();
            }

            return _result;
        }

        public IQueryable<T> GetStoreProcedureData<T>(string storeProcedure, Dictionary<string, object> parameters = null)
        {
            IQueryable<T> _result = null;

            DynamicParameters sqlParams = new DynamicParameters();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }
                
                if (parameters != null)
                {
                    sqlParams = new DynamicParameters(parameters);
                }

                _result = con.Query<T>(
                    storeProcedure,
                    sqlParams,
                    commandType: CommandType.StoredProcedure
                    ).AsQueryable<T>();
            }

            return _result;
        }

        public List<dynamic> GetStoreProcedureData(string storeProcedure, Dictionary<string, object> parameters = null)
        {
            var _result = new List<dynamic>();

            DynamicParameters sqlParams = new DynamicParameters();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }
                
                if (parameters != null)
                {
                    sqlParams = new DynamicParameters(parameters);
                }

                var result = con.QueryMultiple(
                    storeProcedure,
                    parameters, 
                    null, null, 
                    CommandType.StoredProcedure);

                while (!result.IsConsumed)
                {
                    dynamic rs = result.Read();
                    _result.Add(rs);
                }
            }

            return _result;
        }
    }
}