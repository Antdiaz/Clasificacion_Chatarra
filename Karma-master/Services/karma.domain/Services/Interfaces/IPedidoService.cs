using karma.domain.Models.Entity;
using karma.domain.Models.Global;

namespace karma.domain.Services.Interfaces
{
    public interface IPedidoService
    {
        KarmaResponse GetPedidosUsuario(int claUsuario);
        KarmaResponse GetPedidosProducto(int claProducto);
        KarmaResponse GetPedidoUsuario(int claUsuario, int claPedido);
        KarmaResponse GetPedidosUsuarioGrafica(int claUsuario);
        KarmaResponse AddPedido(Pedido pedido);
    }
}