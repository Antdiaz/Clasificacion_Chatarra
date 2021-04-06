using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using karma.domain.Models.Global;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;
using Newtonsoft.Json;

namespace karma.repository.kraken.Repository
{

    //Implementar interface en repository karma.domain
    public class KrakenRepository : IKrakenRepository
    {
        private readonly IAppSettings _appSettings;

        public KrakenRepository(IAppSettings appSettings)
        {
            _appSettings = appSettings;
        }
        public List<T> GetEntityData<T>(string token, int claProducto, int idEntidad, object body)
        {
            return this.Post<T>("GetEntityData", token, claProducto, idEntidad, body).Result;
        }

        public List<T> GetStoredProcedureData<T>(string token, int claProducto, int idEntidad, object body)
        {
            return this.Post<T>("GetStoredProcedureData", token, claProducto, idEntidad, body).Result;
        }

        public async Task<List<T>> Post<T>(string apiName, string token, int claProducto, int idEntidad, object body)
        {
            var request = JsonConvert.SerializeObject(body);

            var content = new StringContent(
                request, Encoding.UTF8,
                "application/json");

            var client = new HttpClient();

            client.DefaultRequestHeaders.Add("x-access-token", token);
            client.DefaultRequestHeaders.Add("x-api-key", _appSettings.Section["Kraken:ApiKey"]);
                
            client.BaseAddress = new Uri(_appSettings.Section["kraken:Url"]);

            var url = string.Format("{0}/{1}/{2}", apiName, claProducto, idEntidad);

            var response = await client.PostAsync(url, content);

            var result = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<List<T>>(result);
            }
            else
            {
                throw new Exception(result);
            }
        }
    }
}