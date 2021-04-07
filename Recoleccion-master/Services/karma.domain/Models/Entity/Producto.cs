namespace karma.domain.Models.Entity
{
    public class Producto : Base
    {
        public int ClaProducto { get; set; }
        public string NomProducto { get; set; }
        public decimal Precio { get; set; }
        public int ClaUnidad { get; set; }
        public string NomUnidad { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
    }
}