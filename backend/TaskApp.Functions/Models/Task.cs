using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskApp.Functions.Models
{
    [Table("Tasks")]
    public class TaskEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public bool IsCompleted { get; set; } = false;

        public int Priority { get; set; } = 2; // 1=High, 2=Medium, 3=Low

        public DateTime? DueDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? CompletedAt { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [MaxLength(500)]
        public string? Tags { get; set; }

        public int? CategoryId { get; set; }
    }
}
