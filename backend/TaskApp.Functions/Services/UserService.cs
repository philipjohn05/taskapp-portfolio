using Microsoft.EntityFrameworkCore;
using TaskApp.Functions.Data;
using TaskApp.Functions.Models;

namespace TaskApp.Functions.Services
{
    public class UserService : IUserService
    {
        private readonly TaskDbContext _context;

        public UserService(TaskDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> EnsureUserExistsAsync(string email, string displayName)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (existingUser != null)
                return existingUser.Id;

            var newUser = new UserEntity
            {
                Id = Guid.NewGuid(),
                Email = email,
                DisplayName = displayName,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return newUser.Id;
        }

        public async Task<bool> UserExistsAsync(Guid userId)
        {
            return await _context.Users.AnyAsync(u => u.Id == userId);
        }
    }
}
