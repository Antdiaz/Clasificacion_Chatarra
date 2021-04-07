using Newtonsoft.Json;

namespace karma.domain.Models.Global
{
    public class ClientToken
    {
        [JsonProperty(propertyName: "NombreUsuario")]
        public string NombreUsuario { get; set; }

        [JsonProperty(propertyName: "ClaUsuario")]
        public int ClaUsuario { get; set; }

        [JsonProperty(propertyName: "ClaEmpresa")]
        public int ClaEmpresa { get; set; }

        [JsonProperty(propertyName: "NombrePc")]
        public string NombrePc { get; set; }
    }
}