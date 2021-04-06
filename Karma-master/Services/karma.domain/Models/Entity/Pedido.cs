using System;
using System.Collections.Generic;

namespace karma.domain.Models.Entity
{
    public class Pedido : Base
    {
        public int ClaPedido { get; set; }
        public int ClaProducto { get; set; }
        public int ClaUsuario { get; set; }
        public int ClaUnidad { get; set; }
        public string NomUnidad { get; set; }
        public int Cantidad { get; set; }
        public string Comentarios { get; set; }
        public DateTime FechaEntrega { get; set; }
        public int ClaEstatus { get; set; }
        public string NomEstatus { get; set; }
        public decimal PrecioTotal { get; set; }
        public List<PedidoArchivo> Archivos { get; set; }
    }
}