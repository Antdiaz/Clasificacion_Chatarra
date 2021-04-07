using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using karma.domain.Models.Global;
using karma.domain.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace karma.domain.Services
{
    public class TokenService : ITokenService
    {
        private readonly IAppSettings _appSettings;

        public TokenService(IAppSettings appSettings)
        {
            _appSettings= appSettings;
        }
        public KarmaResponse ValidateToken(string token)
        {
            try
            {
                var secretKey = _appSettings.Section["Jwt:SecretKey"];

                SecurityToken securityToken;
                var tokenHandler = new JwtSecurityTokenHandler();
                TokenValidationParameters validationParameters = new TokenValidationParameters()
                {
                    ValidateLifetime = true,
                    LifetimeValidator = this.LifetimeValidator,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidIssuer = "Sample",
                    ValidAudience = "Sample",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };

                // Extract
                ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);
                var _nombreUsuario = claimsPrincipal.Claims.Where(c => c.Type == "NombreUsuario").Select(c => c.Value).FirstOrDefault();
                var _claUsuario = claimsPrincipal.Claims.Where(c => c.Type == "ClaUsuario").Select(c => c.Value).FirstOrDefault();
                var _claEmpresa = claimsPrincipal.Claims.Where(c => c.Type == "ClaEmpresa").Select(c => c.Value).FirstOrDefault();
                var _nombrePc = claimsPrincipal.Claims.Where(c => c.Type == "NombrePc").Select(c => c.Value).FirstOrDefault();
                
                if (_nombreUsuario == null || _claUsuario == null || _claEmpresa == null || _nombrePc == null)
                    throw new Exception("Error al obtener datos de Token.");

                var clientToken = new ClientToken
                {
                    NombreUsuario = _nombreUsuario,
                    ClaUsuario = Convert.ToInt32(_claUsuario),
                    ClaEmpresa = Convert.ToInt32(_claEmpresa),
                    NombrePc = _nombrePc
                };

                KarmaResponse response = new KarmaResponse
                {
                    Data = clientToken
                };

                return response;
            }
            catch (SecurityTokenException ex)
            {
                throw new Exception("Error al autorizar: " + ex.Message);
            }
        }

        public bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null)
            {
                if (DateTime.UtcNow < expires) return true;
            }
            return false;
        }
    }
}