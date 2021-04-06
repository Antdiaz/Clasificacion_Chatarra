using karma.domain.Models.Entity;
using karma.domain.Models.Global;

namespace karma.domain.Services.Interfaces
{
    public interface ITiendaService
    {
        KarmaResponse GetTiendas();
        KarmaResponse GetTienda(int claTienda);
        KarmaResponse AddTienda(Tienda tienda);
        KarmaResponse UpdateTienda(Tienda tienda);
    }
}