using Microsoft.Extensions.Configuration;

namespace karma.domain.Services.Interfaces
{
    public interface IAppSettings
    {
        IConfigurationSection Section { get; set; }
    }
}