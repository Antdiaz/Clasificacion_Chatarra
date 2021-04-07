using karma.domain.Models.Entity;
using karma.domain.Models.Global;

namespace karma.domain.Services.Interfaces
{
    public interface IProductoService
    {
        KarmaResponse GetProductos();
        KarmaResponse GetProducto(int claProducto);
        KarmaResponse AddProducto(Producto producto);
        KarmaResponse UpdateProducto(Producto producto);
    }
}