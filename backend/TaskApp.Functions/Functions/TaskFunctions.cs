using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;
using TaskApp.Functions.Services;
using TaskApp.Functions.Models.DTOs;

namespace TaskApp.Functions.Functions
{
    public class TaskFunctions
    {
        private readonly ILogger<TaskFunctions> _logger;
        private readonly ITaskService _taskService;
        private readonly IUserService _userService;

        public TaskFunctions(ILogger<TaskFunctions> logger, ITaskService taskService, IUserService userService)
        {
            _logger = logger;
            _taskService = taskService;
            _userService = userService;
        }

        [Function("GetTasks")]
        public async Task<HttpResponseData> GetTasks(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "tasks")] HttpRequestData req)
        {
            try
            {
                _logger.LogInformation("Getting tasks for user.");
                
                // For now, we'll use a demo user. Later we'll add proper authentication
                var demoUserId = await _userService.EnsureUserExistsAsync("demo@example.com", "Demo User");
                
                var tasks = await _taskService.GetTasksAsync(demoUserId);
                
                var response = req.CreateResponse(HttpStatusCode.OK);
                response.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<IEnumerable<TaskDto>>.SuccessResult(tasks, "Tasks retrieved successfully");
                await response.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting tasks");
                
                var errorResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                errorResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<IEnumerable<TaskDto>>.ErrorResult(ex.Message, "Error retrieving tasks");
                await errorResponse.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return errorResponse;
            }
        }

        [Function("CreateTask")]
        public async Task<HttpResponseData> CreateTask(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "tasks")] HttpRequestData req)
        {
            try
            {
                _logger.LogInformation("Creating new task.");
                
                var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var createTaskDto = JsonSerializer.Deserialize<CreateTaskDto>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (createTaskDto == null || string.IsNullOrEmpty(createTaskDto.Title))
                {
                    var badRequestResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                    badRequestResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                    
                    var errorResult = ApiResponse<TaskDto>.ErrorResult("Invalid task data", "Title is required");
                    await badRequestResponse.WriteStringAsync(JsonSerializer.Serialize(errorResult));
                    
                    return badRequestResponse;
                }

                var demoUserId = await _userService.EnsureUserExistsAsync("demo@example.com", "Demo User");
                var task = await _taskService.CreateTaskAsync(createTaskDto, demoUserId);
                
                var response = req.CreateResponse(HttpStatusCode.Created);
                response.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<TaskDto>.SuccessResult(task, "Task created successfully");
                await response.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                
                var errorResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                errorResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<TaskDto>.ErrorResult(ex.Message, "Error creating task");
                await errorResponse.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return errorResponse;
            }
        }

        [Function("UpdateTask")]
        public async Task<HttpResponseData> UpdateTask(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "tasks/{taskId}")] HttpRequestData req,
            int taskId)
        {
            try
            {
                _logger.LogInformation("Updating task {TaskId}.", taskId);
                
                var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var updateTaskDto = JsonSerializer.Deserialize<UpdateTaskDto>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (updateTaskDto == null)
                {
                    var badRequestResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                    badRequestResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                    
                    var errorResult = ApiResponse<TaskDto>.ErrorResult("Invalid task data", "Task data is required");
                    await badRequestResponse.WriteStringAsync(JsonSerializer.Serialize(errorResult));
                    
                    return badRequestResponse;
                }

                var demoUserId = await _userService.EnsureUserExistsAsync("demo@example.com", "Demo User");
                var task = await _taskService.UpdateTaskAsync(taskId, updateTaskDto, demoUserId);

                if (task == null)
                {
                    var notFoundResponse = req.CreateResponse(HttpStatusCode.NotFound);
                    notFoundResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                    
                    var notFoundResult = ApiResponse<TaskDto>.ErrorResult("Task not found", "Task not found");
                    await notFoundResponse.WriteStringAsync(JsonSerializer.Serialize(notFoundResult));
                    
                    return notFoundResponse;
                }
                
                var response = req.CreateResponse(HttpStatusCode.OK);
                response.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<TaskDto>.SuccessResult(task, "Task updated successfully");
                await response.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating task {TaskId}", taskId);
                
                var errorResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                errorResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<TaskDto>.ErrorResult(ex.Message, "Error updating task");
                await errorResponse.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return errorResponse;
            }
        }

        [Function("DeleteTask")]
        public async Task<HttpResponseData> DeleteTask(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "tasks/{taskId}")] HttpRequestData req,
            int taskId)
        {
            try
            {
                _logger.LogInformation("Deleting task {TaskId}.", taskId);
                
                var demoUserId = await _userService.EnsureUserExistsAsync("demo@example.com", "Demo User");
                var deleted = await _taskService.DeleteTaskAsync(taskId, demoUserId);

                if (!deleted)
                {
                    var notFoundResponse = req.CreateResponse(HttpStatusCode.NotFound);
                    notFoundResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                    
                    var notFoundResult = ApiResponse<bool>.ErrorResult("Task not found", "Task not found");
                    await notFoundResponse.WriteStringAsync(JsonSerializer.Serialize(notFoundResult));
                    
                    return notFoundResponse;
                }
                
                var response = req.CreateResponse(HttpStatusCode.OK);
                response.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<bool>.SuccessResult(true, "Task deleted successfully");
                await response.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting task {TaskId}", taskId);
                
                var errorResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                errorResponse.Headers.Add("Content-Type", "application/json; charset=utf-8");
                
                var result = ApiResponse<bool>.ErrorResult(ex.Message, "Error deleting task");
                await errorResponse.WriteStringAsync(JsonSerializer.Serialize(result));
                
                return errorResponse;
            }
        }
    }
}
