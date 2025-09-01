using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace TaskApp.Functions.Functions
{
    public class HealthCheckFunction
    {
        private readonly ILogger<HealthCheckFunction> _logger;

        public HealthCheckFunction(ILogger<HealthCheckFunction> logger)
        {
            _logger = logger;
        }

        [Function("HealthCheck")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "health")] HttpRequestData req)
        {
            _logger.LogInformation("Health check requested.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");

            var result = new
            {
                status = "healthy",
                timestamp = DateTime.UtcNow.ToString("o"),
                version = "1.0.0",
                environment = "development"
            };

            await response.WriteStringAsync(JsonSerializer.Serialize(result));
            return response;
        }
    }
}
// Updated on Mon  1 Sep 2025 11:48:06 AEST
// Updated Mon  1 Sep 2025 11:57:43 AEST
