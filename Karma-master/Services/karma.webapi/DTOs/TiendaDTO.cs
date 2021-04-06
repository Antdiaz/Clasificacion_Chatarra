using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace karma.webapi.DTOs
{
    public class TiendaDTO
    {

        /// <summary>
        /// nomTienda requerido para hacer una petición de Tienda
        /// </summary>
        /// <value>string</value>
        [Required(ErrorMessage = "Por favor especifique el nombre de la tienda.")]
        [JsonProperty(propertyName: "nomTienda")]
        public string NomTienda { get; set; }

        /// <summary>
        /// descripcion requerido para hacer una petición de Tienda
        /// </summary>
        /// <value>string</value>
        [Required(ErrorMessage = "Por favor especifique la descripción.")]
        [JsonProperty(propertyName: "descripcion")]
        public string Descripcion { get; set; }

        /// <summary>
        /// Campo utilizado en caso de que se requiera dar de baja una Tienda
        /// </summary>
        /// <value>int</value>
        [JsonProperty(propertyName: "bajaLogica")]
        public int BajaLogica { get; set; }
    }
}