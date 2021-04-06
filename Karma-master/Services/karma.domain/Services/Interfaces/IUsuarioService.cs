using karma.domain.Models.Global;

namespace karma.domain.Services.Interfaces
{
    public interface IUsuarioService
    {
        KarmaResponse GetUsuariosRol(string token);
    }
}