using System;

namespace karma.domain.Models.Entity
{
    public class PedidoArchivo
    {
        public int ClaPedidoArc { get; set; }
        public int ClaPedido { get; set; }
        public string Nombre { get; set; }
        public byte[] Archivo { get; set; }
        public string Tipo { get; set; }
        public int BajaLogica { get; set; }
        public DateTime FechaBajaLogica { get; set; }
        public DateTime FechaUltimaMod { get; set; }
        public int ClaUsuarioMod { get; set; }
        public string NombrePcMod { get; set; }
    }
}