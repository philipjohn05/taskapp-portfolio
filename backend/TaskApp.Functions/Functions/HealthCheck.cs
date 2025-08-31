using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;

namespace TaskApp.Functions.Functions
{
    public class HealthCheck
    {
        private readonly ILogger _logger;

        public HealthCheck(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<HealthCheck>();
        }

        [Function("HealthCheckV2")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req)
        {
            _logger.LogInformation("Health check requested.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");

            response.WriteString("{\"status\":\"healthy\",\"timestamp\":\"" + DateTime.UtcNow.ToString("o") + "\"}");

            return response;
        }
    }
}
