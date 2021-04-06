using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace karma.webapi.DTOs
{
    public class TicketDetDTO
    {
        [Required(ErrorMessage = "Por favor especifique el ClaDatoAdicional.")]
        [JsonProperty(propertyName: "claDatoAdicional")]
        public int ClaDatoAdicional { get; set; }

        [Required(ErrorMessage = "Por favor especifique el ValDatoAdicional.")]
        [JsonProperty(propertyName: "valDatoAdicional")]
        public string ValDatoAdicional { get; set; }
    }
}