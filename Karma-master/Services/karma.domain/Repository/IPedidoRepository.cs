using System.Linq;
using karma.domain.Models.Entity;

namespace karma.domain.Repository
{
    public interface IPedidoRepository
    {
        Pedido AddPedido(Pedido pedido);
        IQueryable<Pedido> GetAll();
        IQueryable<PedidoGrafica> GetPedidosUsuarioGrafica(int claUsuario);
    }
}