using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace karma.webapi.DTOs
{
    public class ProductoDTO
    {
        /// <summary>
        /// nomProducto requerido para hacer una petición de Producto
        /// </summary>
        /// <value>string</value>
        [Required(ErrorMessage = "Por favor especifique el nombre del producto.")]
        [JsonProperty(propertyName: "nomProducto")]
        public string NomProducto { get; set; }

        /// <summary>
        /// descripcion requerido para hacer una petición de Producto
        /// </summary>
        /// <value>string</value>
        [Required(ErrorMessage = "Por favor especifique la descripción.")]
        [JsonProperty(propertyName: "descripcion")]
        public string Descripcion { get; set; }

        /// <summary>
        /// precio requerido para hacer una petición de Producto
        /// </summary>
        /// <value>decimal</value>
        [Required(ErrorMessage = "Por favor especifique el precio.")]
        [JsonProperty(propertyName: "precio")]
        public decimal Precio { get; set; }

        /// <summary>
        /// claUnidad requerido para hacer una petición de Producto
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique el claUnidad.")]
        [JsonProperty(propertyName: "claUnidad")]
        public int ClaUnidad { get; set; }
        
        /// <summary>
        /// Campo utilizado en dado caso de hacer una baja en un producto
        /// </summary>
        /// <value>int</value>
        [JsonProperty(propertyName: "bajaLogica")]
        public int BajaLogica { get; set; }
    }
}