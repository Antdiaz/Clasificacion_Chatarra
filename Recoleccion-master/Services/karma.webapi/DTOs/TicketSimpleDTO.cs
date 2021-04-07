using Newtonsoft.Json;

namespace karma.webapi.DTOs
{
    public class TicketSimpleDTO
    {
        [JsonProperty(propertyName: "claTipoTicket")]
        public int ClaTipoTicket { get; set; }

        [JsonProperty(propertyName: "nomTicket")]
        public string NomTicket { get; set; }

        [JsonProperty(propertyName: "claTicket")]
        public int ClaTicket { get; set; }

        [JsonProperty(propertyName: "campoUno")]
        public string CampoUno { get; set; }

        [JsonProperty(propertyName: "campoDos")]
        public string CampoDos { get; set; }
        
        [JsonProperty(propertyName: "campoTres")]
        public string CampoTres { get; set; }

        [JsonProperty(propertyName: "campoCuatro")]
        public string CampoCuatro { get; set; }

        [JsonProperty(propertyName: "campoCinco")]
        public string CampoCinco { get; set; }

        [JsonProperty(propertyName: "campoSeis")]
        public string CampoSeis { get; set; }

        [JsonProperty(propertyName: "campoSiete")]
        public string CampoSiete { get; set; }

        [JsonProperty(propertyName: "campoOcho")]
        public string CampoOcho { get; set; }

        [JsonProperty(propertyName: "campoNueve")]
        public string CampoNueve { get; set; }

        [JsonProperty(propertyName: "campoDiez")]
        public string CampoDiez { get; set; }

        [JsonProperty(propertyName: "campoOnce")]
        public string CampoOnce { get; set; }
    }
}