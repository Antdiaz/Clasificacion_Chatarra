namespace karma.domain.Models.Entity
{
    public class DatoAdicional
    {
        public int ClaTipoTicket { get; set; }
        public string NomTipoTicket { get; set; }
        public string Descripcion { get; set; }
        public int ClaDatoAdicional { get; set; }
        public string NomDatoAdicional { get; set; }
        public string TagDatoAdicional { get; set; }
        public bool Requerido { get; set; }
        public string NomTipoDato { get; set; }
        public string Url { get; set; }
        public string DisplayValue { get; set; }
        public string DisplayExpr { get; set; }
        public string TagDependiente { get; set; }
        public bool EsDependiente { get; set; }
    }
}