using Newtonsoft.Json;

namespace karma.domain.Models.Global
{
    public class ErrorDetails
    {
        [JsonProperty(propertyName: "statusCode")]
        public int StatusCode { get; set; }
        [JsonProperty(propertyName: "message")]
        public string Message { get; set; }
    }
}