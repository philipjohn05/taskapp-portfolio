-- Task Management App Database Schema
-- Run this script in your Azure SQL Database

USE TaskAppDB;
GO

-- Users table (for future expansion)
CREATE TABLE [dbo].[Users] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [Email] NVARCHAR(255) NOT NULL UNIQUE,
    [DisplayName] NVARCHAR(100) NOT NULL,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE()
);

-- Tasks table
CREATE TABLE [dbo].[Tasks] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Title] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000),
    [IsCompleted] BIT NOT NULL DEFAULT 0,
    [Priority] INT DEFAULT 2, -- 1=High, 2=Medium, 3=Low
    [DueDate] DATETIME2,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
    [CompletedAt] DATETIME2,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Tags] NVARCHAR(500),
    
    FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE
);

-- Categories table (optional, for advanced features)
CREATE TABLE [dbo].[Categories] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Name] NVARCHAR(50) NOT NULL,
    [Color] NVARCHAR(7), -- Hex color code
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
    
    FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE
);

-- Add Category reference to Tasks
ALTER TABLE [dbo].[Tasks] 
ADD [CategoryId] INT,
FOREIGN KEY ([CategoryId]) REFERENCES [Categories]([Id]);

-- Indexes for performance
CREATE INDEX IX_Tasks_UserId ON [Tasks]([UserId]);
CREATE INDEX IX_Tasks_IsCompleted ON [Tasks]([IsCompleted]);
CREATE INDEX IX_Tasks_DueDate ON [Tasks]([DueDate]);
CREATE INDEX IX_Tasks_CreatedAt ON [Tasks]([CreatedAt]);

-- Sample data for testing
INSERT INTO [Users] ([Id], [Email], [DisplayName]) VALUES 
(NEWID(), 'demo@example.com', 'Demo User');

DECLARE @DemoUserId UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM Users WHERE Email = 'demo@example.com');

INSERT INTO [Categories] ([Name], [Color], [UserId]) VALUES 
('Work', '#3B82F6', @DemoUserId),
('Personal', '#10B981', @DemoUserId),
('Shopping', '#F59E0B', @DemoUserId);

INSERT INTO [Tasks] ([Title], [Description], [Priority], [DueDate], [UserId], [CategoryId], [Tags]) VALUES 
('Complete Azure Portfolio Project', 'Build a multi-tier web application with CI/CD pipeline', 1, DATEADD(day, 7, GETUTCDATE()), @DemoUserId, 1, 'azure,portfolio,urgent'),
('Review .NET Core Documentation', 'Study Entity Framework and Azure Functions', 2, DATEADD(day, 3, GETUTCDATE()), @DemoUserId, 1, 'learning,development'),
('Buy groceries', 'Milk, bread, eggs, vegetables', 3, DATEADD(day, 1, GETUTCDATE()), @DemoUserId, 3, 'grocery,weekly'),
('Plan weekend trip', 'Research destinations and book accommodation', 2, DATEADD(day, 14, GETUTCDATE()), @DemoUserId, 2, 'travel,planning');
