using Microsoft.EntityFrameworkCore;
using TaskApp.Functions.Data;
using TaskApp.Functions.Models;
using TaskApp.Functions.Models.DTOs;

namespace TaskApp.Functions.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskDbContext _context;

        public TaskService(TaskDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskDto>> GetTasksAsync(Guid userId)
        {
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    CompletedAt = t.CompletedAt,
                    UserId = t.UserId,
                    Tags = t.Tags,
                    CategoryId = t.CategoryId
                })
                .ToListAsync();

            return tasks;
        }

        public async Task<TaskDto?> GetTaskByIdAsync(int taskId, Guid userId)
        {
            var task = await _context.Tasks
                .Where(t => t.Id == taskId && t.UserId == userId)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    CompletedAt = t.CompletedAt,
                    UserId = t.UserId,
                    Tags = t.Tags,
                    CategoryId = t.CategoryId
                })
                .FirstOrDefaultAsync();

            return task;
        }

        public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto, Guid userId)
        {
            var taskEntity = new TaskEntity
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                Priority = createTaskDto.Priority,
                DueDate = createTaskDto.DueDate,
                Tags = createTaskDto.Tags,
                CategoryId = createTaskDto.CategoryId,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(taskEntity);
            await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = taskEntity.Id,
                Title = taskEntity.Title,
                Description = taskEntity.Description,
                IsCompleted = taskEntity.IsCompleted,
                Priority = taskEntity.Priority,
                DueDate = taskEntity.DueDate,
                CreatedAt = taskEntity.CreatedAt,
                CompletedAt = taskEntity.CompletedAt,
                UserId = taskEntity.UserId,
                Tags = taskEntity.Tags,
                CategoryId = taskEntity.CategoryId
            };
        }

        public async Task<TaskDto?> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto, Guid userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

            if (task == null)
                return null;

            // Update properties if provided
            if (!string.IsNullOrEmpty(updateTaskDto.Title))
                task.Title = updateTaskDto.Title;
            
            if (updateTaskDto.Description != null)
                task.Description = updateTaskDto.Description;
            
            if (updateTaskDto.IsCompleted.HasValue)
            {
                task.IsCompleted = updateTaskDto.IsCompleted.Value;
                task.CompletedAt = updateTaskDto.IsCompleted.Value ? DateTime.UtcNow : null;
            }
            
            if (updateTaskDto.Priority.HasValue)
                task.Priority = updateTaskDto.Priority.Value;
            
            if (updateTaskDto.DueDate.HasValue)
                task.DueDate = updateTaskDto.DueDate.Value;
            
            if (updateTaskDto.Tags != null)
                task.Tags = updateTaskDto.Tags;
            
            if (updateTaskDto.CategoryId.HasValue)
                task.CategoryId = updateTaskDto.CategoryId.Value;

            await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                Priority = task.Priority,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                CompletedAt = task.CompletedAt,
                UserId = task.UserId,
                Tags = task.Tags,
                CategoryId = task.CategoryId
            };
        }

        public async Task<bool> DeleteTaskAsync(int taskId, Guid userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CompleteTaskAsync(int taskId, Guid userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

            if (task == null)
                return false;

            task.IsCompleted = true;
            task.CompletedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
