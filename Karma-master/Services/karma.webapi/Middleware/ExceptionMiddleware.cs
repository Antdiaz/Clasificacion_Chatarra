using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using karma.domain.Models.Global;
using System.Net;

namespace karma.webapi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleGlobalExceptionAsync(httpContext, ex);
            }
        }

        private static Task HandleGlobalExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            //logica para guardar errores

            var response = new ErrorDetails {
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Error. " + exception.Message
            };
            
            return context.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
        }
    }
}