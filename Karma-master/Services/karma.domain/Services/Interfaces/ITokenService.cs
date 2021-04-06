using karma.domain.Models.Global;

namespace karma.domain.Services.Interfaces
{
    public interface ITokenService
    {
        KarmaResponse ValidateToken(string token);
    }
}