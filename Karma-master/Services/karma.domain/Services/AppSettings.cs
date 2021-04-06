using karma.domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace karma.domain.Services
{
    public class AppSettings : IAppSettings
    {
        public IConfigurationSection Section { get; set; }
    }   
}