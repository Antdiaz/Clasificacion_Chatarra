using System;
using karma.domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace karma.webapi.Filters
{
    public class AuthorizeFilterAttribute : Attribute, IResourceFilter
    {
        public void OnResourceExecuted(ResourceExecutedContext context)
        {
            //throw new NotImplementedException();
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            var accessToken = context.HttpContext.Request.Headers["x-access-token"];
            ITokenService _tokenService = (ITokenService)context.HttpContext.RequestServices.GetService(typeof(ITokenService));

            var result = _tokenService.ValidateToken( accessToken);
            if (result.Data == null)
            {
                context.Result = new JsonResult(result);
            }
        }
    }
}