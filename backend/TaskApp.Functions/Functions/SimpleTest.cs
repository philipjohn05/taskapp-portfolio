using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;

namespace TaskApp.Functions.Functions
{
    public static class SimpleTest
    {
        [Function("SimpleTest")]
        public static HttpResponseData Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req)
        {
            var response = req.CreateResponse(HttpStatusCode.OK);
            response.WriteString("Hello from Azure Functions!");
            return response;
        }
    }
}
