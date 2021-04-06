using System;

namespace karma.domain.Models.Entity
{
    public class Base
    {
        public int BajaLogica { get; set; }
        public DateTime FechaBajaLogica { get; set; }
        public DateTime FechaUltimaMod { get; set; }
        public int ClaUsuarioMod { get; set; }
        public string NombrePcMod { get; set; }
    }
}