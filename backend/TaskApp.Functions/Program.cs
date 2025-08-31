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
        // Get connection string from environment
        string connectionString = Environment.GetEnvironmentVariable("SqlConnectionString") 
            ?? "Server=sql-taskapp-72728.database.windows.net;Database=TaskAppDB;Trusted_Connection=true;MultipleActiveResultSets=true";

        // Register DbContext
        services.AddDbContext<TaskDbContext>(options =>
            options.UseSqlServer(connectionString));
            

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
