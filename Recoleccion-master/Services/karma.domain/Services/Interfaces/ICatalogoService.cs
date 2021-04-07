using karma.domain.Models.Global;

namespace karma.domain.Services.Interfaces
{
    public interface ICatalogoService
    {
        KarmaResponse GetEstatus();
        KarmaResponse GetUnidades();
        object GetInformacion();
    }
}