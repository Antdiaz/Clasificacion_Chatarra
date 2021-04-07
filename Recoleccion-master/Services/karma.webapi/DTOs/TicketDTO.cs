using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace karma.webapi.DTOs
{
    public class TicketDTO
    {
        [JsonProperty(propertyName: "claTipoTicket")]
        public int ClaTipoTicket { get; set; }

        [Required(ErrorMessage = "Por favor especifique el NomTicket.")]
        [JsonProperty(propertyName: "nomTicket")]
        public string NomTicket { get; set; }

        [Required(ErrorMessage = "Por favor especifique el TicketDet.")]
        [JsonProperty(propertyName: "ticketDet")]
        public List<TicketDetDTO> TicketDet { get; set; }
    }
}