using TaskApp.Functions.Models.DTOs;

namespace TaskApp.Functions.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetTasksAsync(Guid userId);
        Task<TaskDto?> GetTaskByIdAsync(int taskId, Guid userId);
        Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto, Guid userId);
        Task<TaskDto?> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto, Guid userId);
        Task<bool> DeleteTaskAsync(int taskId, Guid userId);
        Task<bool> CompleteTaskAsync(int taskId, Guid userId);
    }

    public interface IUserService
    {
        Task<Guid> EnsureUserExistsAsync(string email, string displayName);
        Task<bool> UserExistsAsync(Guid userId);
    }
}
