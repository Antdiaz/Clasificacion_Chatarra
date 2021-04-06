using Microsoft.AspNetCore.Builder;

namespace karma.webapi.Middleware
{
    public static class GlobalExceptionMiddleware
    {
        public static void UseGloablExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}