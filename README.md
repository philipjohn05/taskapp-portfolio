# TaskApp Portfolio - Full-Stack Azure Task Management System

A professional, cloud-native task management application demonstrating enterprise-level development practices with Azure services, modern web technologies, and automated CI/CD pipelines.

## Live Demo
- **Application**: https://ambitious-ground-00a372300.2.azurestaticapps.net
- **API Health**: https://func-taskapp-35783.azurewebsites.net/api/health
- **Repository**: https://github.com/philipjohn05/taskapp-portfolio

## Architecture Overview

### Technology Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: .NET 8 + Azure Functions v4
- **Database**: Azure SQL Database
- **Hosting**: Azure Static Web Apps + Azure Functions
- **CI/CD**: GitHub Actions
- **Authentication**: Azure Active Directory (planned)

### Azure Services Used
- **Azure Functions**: Serverless compute for REST API
- **Azure SQL Database**: Managed relational database
- **Azure Static Web Apps**: Frontend hosting with global CDN
- **Application Insights**: Monitoring and telemetry
- **GitHub Actions**: Automated build and deployment

## Features

### Task Management
- Create, read, update, delete tasks
- Task completion tracking with timestamps
- Priority levels (High, Medium, Low)
- Due date management
- Tag-based organization
- Real-time task statistics

### Technical Features
- RESTful API design
- TypeScript for type safety
- Responsive design for all devices
- Professional error handling
- Real-time data synchronization
- Production-ready security practices

## Development Practices

### Security
- Credentials managed via GitHub Secrets
- Environment-specific configurations
- CORS properly configured
- Input validation and sanitization

### DevOps
- Automated frontend deployment to Azure Static Web Apps
- Automated backend deployment to Azure Functions
- Separate CI/CD pipelines for frontend and backend changes
- Production-ready build optimizations

### Code Quality
- TypeScript for compile-time type checking
- Component-based architecture
- Service layer separation
- Proper error handling and user feedback
- Clean, maintainable code structure

## Project Structure
'''bash
taskapp-portfolio/
├── frontend/                    # React TypeScript application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── services/           # API integration layer
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   └── dist/                  # Production build output
├── backend/                    # .NET Azure Functions API
│   └── TaskApp.Functions/
│       ├── Functions/         # HTTP trigger functions
│       ├── Models/            # Data models and DTOs
│       ├── Data/              # Entity Framework context
│       └── Services/          # Business logic layer
├── database/                   # SQL scripts and migrations
├── .github/workflows/         # CI/CD pipeline definitions
└── docs/                      # Documentation and screenshots
'''

## Local Development

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- Azure Functions Core Tools
- Azure CLI

### Backend Setup
```bash
cd backend/TaskApp.Functions
cp local.settings.json.template local.settings.json
# Update connection string in local.settings.json
func start

Frontend Setup

cd frontend
npm install
npm run dev


Database Setup

Azure SQL Database is used for both development and production
Connection string configured via environment variables
Entity Framework migrations for schema management

Deployment
Automated Deployment

Frontend: Automatically deployed via GitHub Actions to Azure Static Web Apps
Backend: Automatically deployed via GitHub Actions to Azure Functions
Triggered by pushes to main branch

Manual Deployment

# Backend
cd backend/TaskApp.Functions
func azure functionapp publish func-taskapp-72728

# Frontend
cd frontend
npm run build
# Upload dist/ folder to Azure Static Web Apps

Cost Analysis
Monthly Cost: ~$5-7 AUD

Azure SQL Database (Basic): $5/month
Azure Functions (Consumption): $1-2/month
Azure Static Web Apps: Free
Application Insights: Free (5GB/month)

Performance & Scalability

Frontend: Global CDN distribution via Azure Static Web Apps
Backend: Serverless auto-scaling with Azure Functions
Database: Managed Azure SQL with automatic backups
Monitoring: Real-time performance tracking with Application Insights

Skills Demonstrated
Cloud Architecture

Serverless computing patterns
Microservices architecture
Cloud-native application design
Multi-region deployment strategies

Full-Stack Development

Modern React development with hooks and TypeScript
RESTful API design and implementation
Database schema design and optimization
Responsive web design principles

DevOps & Automation

Infrastructure as Code principles
Automated CI/CD pipelines
Environment-specific deployments
Secure credential management

Software Engineering

Clean architecture patterns
Dependency injection
Error handling and resilience
Code organization and maintainability

Contact
Built by Philip John - pjfaraon@gmail.com - https://www.linkedin.com/in/pjfaraon/
This project demonstrates practical experience with modern cloud development, full-stack engineering, and enterprise-level software practices.
