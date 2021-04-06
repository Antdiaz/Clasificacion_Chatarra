using Newtonsoft.Json;

namespace karma.domain.Models.Global
{
    public class KarmaResponse
    {
        [JsonProperty(propertyName: "data")]
        public object Data { get; set; }
    }
}