using System;
using System.Threading.Tasks;
using karma.domain.Models.Global;
using karma.domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace karma.webapi.Binders
{
    public class ClientBinder: IModelBinder
    {
        public async Task BindModelAsync(ModelBindingContext bindingContext)
        {
            ClientToken clientToken = new ClientToken();

            var accessToken = bindingContext.HttpContext.Request.Headers["x-access-token"];
            ITokenService _tokenService = (ITokenService)bindingContext.HttpContext.RequestServices.GetService(typeof(ITokenService));

            var result = _tokenService.ValidateToken(accessToken);

            clientToken = (ClientToken)result.Data;

            bindingContext.Result = ModelBindingResult.Success(clientToken);

            await Task.FromResult(Task.CompletedTask);
        }   
    }
}