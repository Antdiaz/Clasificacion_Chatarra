using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace karma.webapi.DTOs
{
    public class PedidoDTO
    {   
        /// <summary>
        /// claProducto requerido para hacer una petición de Pedido
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique el ClaProducto.")]
        [JsonProperty(propertyName: "claProducto")]
        public int ClaProducto { get; set; }

        /// <summary>
        /// claUsuario requerido para hacer una petición de Pedido
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique el ClaUsuario.")]
        [JsonProperty(propertyName: "claUsuario")]
        public int ClaUsuario { get; set; }

        /// <summary>
        /// claUnidad requerido para hacer una petición de pedido
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique el ClaUnidad.")]
        [JsonProperty(propertyName: "claUnidad")]
        public int ClaUnidad { get; set; }

        /// <summary>
        /// cantidad requerido para hacer una petición de pedido
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique la Cantidad.")]
        [JsonProperty(propertyName: "cantidad")]
        public int Cantidad { get; set; }
        
        /// <summary>
        /// Campo para agregar comentarios en el caso necesario
        /// </summary>
        /// <value>string</value>
        [JsonProperty(propertyName: "comentarios")]
        public string Comentarios { get; set; }

        /// <summary>
        /// fechaEntrega requerido para hacer una petición de pedido
        /// </summary>
        /// <value>DateTime</value>
        [Required(ErrorMessage = "Por favor especifique la Fecha de Entrega.")]
        [JsonProperty(propertyName: "fechaEntrega")]
        public DateTime FechaEntrega { get; set; }

        /// <summary>
        /// claEstatus requerido para hacer una petición de pedido
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique el ClaEstatus.")]
        [JsonProperty(propertyName: "claEstatus")]
        public int ClaEstatus { get; set; }

        /// <summary>
        /// precioTotal requerido para hacer una petición de pedido
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique la Precio Total.")]
        [JsonProperty(propertyName: "precioTotal")]
        public int PrecioTotal { get; set; }
        
        /// <summary>
        /// archivos archivos a adjuntar al pedido
        /// </summary>
        /// <value>List<IFormFile></value>
        [JsonProperty(propertyName: "archivos")]
        public List<IFormFile> Archivos { get; set; }
    }
}