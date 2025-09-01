using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using TaskApp.Functions.Data;
using TaskApp.Functions.Services;
using System;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        // Get connection string from environment variables only
        string connectionString = Environment.GetEnvironmentVariable("SqlConnectionString")
            ?? throw new InvalidOperationException("SqlConnectionString environment variable is required");

        // Register DbContext with retry on failure
        services.AddDbContext<TaskDbContext>(options =>
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 3,
                    maxRetryDelay: TimeSpan.FromSeconds(5),
                    errorNumbersToAdd: null);
                sqlOptions.CommandTimeout(30);
            }));

        // Register services
        services.AddScoped<ITaskService, TaskService>();
        services.AddScoped<IUserService, UserService>();

        services.AddApplicationInsightsTelemetryWorkerService();
    })
    .ConfigureLogging((context, builder) =>
    {
        builder.AddConsole();
    })
    .Build();

host.Run();
